import axios from 'axios'
import { NextResponse } from 'next/server'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

/**
 * Test if the server endpoint is accessible
 * Visit: http://localhost:3000/api/test-auth-connection
 */
export async function GET() {
	const results: any = {
		serverUrl: SERVER_URL,
		googleEndpoint: `${SERVER_URL}/api/auth/google`,
		environmentVariables: {
			GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
			NEXT_AUTH_SECRET: !!process.env.NEXT_AUTH_SECRET,
			NEXT_PUBLIC_SERVER_URL: !!process.env.NEXT_PUBLIC_SERVER_URL,
		},
		tests: [],
	}

	// Test 1: Check if server is reachable
	try {
		const response = await axios.get(SERVER_URL, { timeout: 5000 })
		results.tests.push({
			name: 'Server Reachable',
			status: 'success',
			message: `Server is running on ${SERVER_URL}`,
		})
	} catch (error: any) {
		if (error.code === 'ECONNREFUSED') {
			results.tests.push({
				name: 'Server Reachable',
				status: 'error',
				message: `Cannot connect to ${SERVER_URL}. Is your Express server running?`,
			})
		} else {
			results.tests.push({
				name: 'Server Reachable',
				status: 'warning',
				message: `Got response: ${error.response?.status || error.message}`,
			})
		}
	}

	// Test 2: Check if Google endpoint exists (should return 400 for missing data, not 404)
	try {
		const response = await axios.post(
			`${SERVER_URL}/api/auth/google`,
			{},
			{ timeout: 5000, validateStatus: () => true }
		)
		if (response.status === 404) {
			results.tests.push({
				name: 'Google Auth Endpoint',
				status: 'error',
				message:
					'Endpoint not found (404). Check if route is registered correctly.',
			})
		} else if (response.status === 400) {
			results.tests.push({
				name: 'Google Auth Endpoint',
				status: 'success',
				message:
					'Endpoint exists and is responding (expected 400 for empty data)',
			})
		} else {
			results.tests.push({
				name: 'Google Auth Endpoint',
				status: 'warning',
				message: `Endpoint returned status ${response.status}`,
			})
		}
	} catch (error: any) {
		if (error.code === 'ECONNREFUSED') {
			results.tests.push({
				name: 'Google Auth Endpoint',
				status: 'error',
				message: 'Cannot connect to server',
			})
		} else {
			results.tests.push({
				name: 'Google Auth Endpoint',
				status: 'error',
				message: error.message,
			})
		}
	}

	const allPassed = results.tests.every(
		(test: any) => test.status === 'success'
	)
	const hasErrors = results.tests.some((test: any) => test.status === 'error')

	return NextResponse.json(
		{
			success: allPassed,
			hasErrors,
			...results,
			instructions: {
				serverNotRunning: 'Start your Express server: cd server && npm start',
				missingEnv: 'Add environment variables to .env.local file',
				checkConsole:
					'Check your Next.js server console for detailed OAuth logs',
			},
		},
		{ status: hasErrors ? 400 : 200 }
	)
}
