import { axiosClient, SERVER_URL } from '@/http/axios'
import { ReturnActionType } from '@/types'
import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: { userId: { label: 'User ID', type: 'text' } },
			async authorize(credentials) {
				const { data } = await axiosClient.get<ReturnActionType>(
					`/api/user/profile/${credentials?.userId}`
				)
				return JSON.parse(
					JSON.stringify({ email: data.user.email, name: data.user._id })
				)
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google') {
				console.log('🔵 Google OAuth signIn callback started')

				try {
					// Check if Google credentials are configured
					if (
						!process.env.GOOGLE_CLIENT_ID ||
						!process.env.GOOGLE_CLIENT_SECRET
					) {
						console.error('❌ Google OAuth credentials not configured')
						console.error('GOOGLE_CLIENT_ID:', !!process.env.GOOGLE_CLIENT_ID)
						console.error(
							'GOOGLE_CLIENT_SECRET:',
							!!process.env.GOOGLE_CLIENT_SECRET
						)
						return false
					}

					// Validate required data
					if (!user.email || !account.providerAccountId) {
						console.error('❌ Missing required Google OAuth data:', {
							email: user.email,
							providerAccountId: account.providerAccountId,
							hasName: !!user.name,
						})
						return false
					}

					console.log('✅ Google OAuth data validated:', {
						email: user.email,
						name: user.name,
						hasAvatar: !!user.image,
					})

					// Use axios directly for server-side calls (NextAuth callbacks run server-side)
					const serverUrl =
						SERVER_URL ||
						process.env.NEXT_PUBLIC_SERVER_URL ||
						'http://localhost:5000'
					console.log('🌐 Server URL:', serverUrl)

					// Quick check if server is reachable
					try {
						await axios.get(serverUrl, { timeout: 3000 })
						console.log('✅ Server is reachable')
					} catch (serverCheckError: any) {
						if (serverCheckError.code === 'ECONNREFUSED') {
							console.error(
								'❌ Server is not running! Please start your Express server.'
							)
							throw new Error(
								'Server is not running. Please start your Express server on port 5000.'
							)
						}
						// Server might be running but returned an error, continue anyway
						console.log('⚠️ Server check returned:', serverCheckError.message)
					}

					const serverAxios = axios.create({
						baseURL: serverUrl,
						withCredentials: true,
						timeout: 10000, // 10 second timeout
					})

					const payload = {
						email: user.email,
						fullName: user.name || (profile as any)?.name || 'User',
						googleId: account.providerAccountId,
						avatar: user.image,
					}

					console.log('📤 Sending request to server:', {
						url: `${serverUrl}/api/auth/google`,
						payload: { ...payload, googleId: '***' },
					})

					const { data } = await serverAxios.post<ReturnActionType>(
						'/api/auth/google',
						payload
					)

					console.log('📥 Server response:', {
						hasUser: !!data?.user,
						userId: data?.user?._id,
						failure: data?.failure,
						status: data?.status,
					})

					// Check if the response contains a user
					if (data?.user?._id) {
						user.id = data.user._id
						console.log('✅ Google OAuth successful, user ID:', data.user._id)
						return true
					}

					// If there's a failure message, log it
					if (data?.failure) {
						console.error('❌ Google OAuth failure from server:', data.failure)
					} else {
						console.error('❌ No user data in server response')
					}

					return false
				} catch (error: any) {
					console.error('❌ Google OAuth error:', {
						message: error?.message,
						code: error?.code,
						response: error?.response?.data,
						status: error?.response?.status,
						url: error?.config?.url,
						baseURL: error?.config?.baseURL,
					})

					// More specific error handling
					if (error?.code === 'ECONNREFUSED') {
						console.error(
							'❌ Cannot connect to server. Is your Express server running?'
						)
					} else if (error?.response?.status === 404) {
						console.error(
							'❌ Server endpoint not found. Check if /api/auth/google route exists.'
						)
					} else if (error?.response?.status === 500) {
						console.error('❌ Server error. Check server logs.')
					}

					return false
				}
			}
			return true
		},
		async jwt({ token, user, account }) {
			// On initial sign in, user object is available
			if (user) {
				// For Google OAuth, user.id is set in signIn callback
				// For credentials, user.name contains the userId
				token.userId = user.id || user.name
				console.log('🔑 JWT token set with userId:', token.userId)
			}
			return token
		},
		async session({ session, token }) {
			const userId = token.userId as string
			if (userId) {
				try {
					console.log('📋 Fetching user profile for session:', userId)
					const { data } = await axiosClient.get<ReturnActionType>(
						`/api/user/profile/${userId}`
					)
					if (data.user) {
						session.currentUser = data.user
						console.log('✅ Session user set:', data.user.email)
					} else {
						console.error('❌ No user data in profile response')
					}
				} catch (error: any) {
					console.error('❌ Session error:', {
						message: error?.message,
						status: error?.response?.status,
						url: error?.config?.url,
					})
				}
			} else {
				console.warn('⚠️ No userId in token for session')
			}
			return session
		},
	},
	session: { strategy: 'jwt' },
	jwt: { secret: process.env.NEXT_PUBLIC_JWT_SECRET },
	secret: process.env.NEXT_AUTH_SECRET,
	pages: {
		signIn: '/sign-in',
	},
	debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
}
