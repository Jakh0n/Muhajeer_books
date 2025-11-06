/**
 * Test script to verify Google OAuth credentials
 * Run this in your Next.js API route or server component to check configuration
 */

export function testGoogleOAuthConfig() {
	const results = {
		clientId: {
			exists: !!process.env.GOOGLE_CLIENT_ID,
			value: process.env.GOOGLE_CLIENT_ID
				? maskValue(process.env.GOOGLE_CLIENT_ID)
				: 'NOT SET',
			isValid: false,
			message: '',
		},
		clientSecret: {
			exists: !!process.env.GOOGLE_CLIENT_SECRET,
			value: process.env.GOOGLE_CLIENT_SECRET
				? maskValue(process.env.GOOGLE_CLIENT_SECRET)
				: 'NOT SET',
			isValid: false,
			message: '',
		},
		nextAuthSecret: {
			exists: !!process.env.NEXT_AUTH_SECRET,
			value: process.env.NEXT_AUTH_SECRET
				? maskValue(process.env.NEXT_AUTH_SECRET)
				: 'NOT SET',
			isValid: false,
			message: '',
		},
		serverUrl: {
			exists: !!process.env.NEXT_PUBLIC_SERVER_URL,
			value: process.env.NEXT_PUBLIC_SERVER_URL || 'NOT SET',
			isValid: false,
			message: '',
		},
	}

	// Validate Client ID
	if (results.clientId.exists) {
		const clientId = process.env.GOOGLE_CLIENT_ID!
		if (clientId.includes('.apps.googleusercontent.com')) {
			results.clientId.isValid = true
			results.clientId.message = '✅ Valid Google Client ID format'
		} else {
			results.clientId.isValid = false
			results.clientId.message =
				'❌ Invalid format - should end with .apps.googleusercontent.com'
		}
	} else {
		results.clientId.message =
			'❌ GOOGLE_CLIENT_ID not found in environment variables'
	}

	// Validate Client Secret
	if (results.clientSecret.exists) {
		const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
		if (clientSecret.startsWith('GOCSPX-') || clientSecret.length > 20) {
			results.clientSecret.isValid = true
			results.clientSecret.message = '✅ Valid Google Client Secret format'
		} else {
			results.clientSecret.isValid = false
			results.clientSecret.message =
				'❌ Invalid format - should start with GOCSPX- or be a long string'
		}
	} else {
		results.clientSecret.message =
			'❌ GOOGLE_CLIENT_SECRET not found in environment variables'
	}

	// Validate NextAuth Secret
	if (results.nextAuthSecret.exists) {
		const secret = process.env.NEXT_AUTH_SECRET!
		if (secret.length >= 32) {
			results.nextAuthSecret.isValid = true
			results.nextAuthSecret.message =
				'✅ Valid NextAuth secret (sufficient length)'
		} else {
			results.nextAuthSecret.isValid = false
			results.nextAuthSecret.message =
				'❌ Secret too short - should be at least 32 characters'
		}
	} else {
		results.nextAuthSecret.message =
			'❌ NEXT_AUTH_SECRET not found in environment variables'
	}

	// Validate Server URL
	if (results.serverUrl.exists) {
		const url = process.env.NEXT_PUBLIC_SERVER_URL!
		try {
			// eslint-disable-next-line no-new
			const urlObj = new URL(url)
			if (urlObj) {
				results.serverUrl.isValid = true
				results.serverUrl.message = '✅ Valid server URL format'
			}
		} catch {
			results.serverUrl.isValid = false
			results.serverUrl.message = '❌ Invalid URL format'
		}
	} else {
		results.serverUrl.message =
			'❌ NEXT_PUBLIC_SERVER_URL not found in environment variables'
	}

	return results
}

function maskValue(value: string): string {
	if (value.length <= 8) {
		return '***'
	}
	return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
}

export function printTestResults() {
	const results = testGoogleOAuthConfig()

	console.log('\n🔍 Google OAuth Configuration Test\n')
	console.log('='.repeat(50))

	console.log('\n📋 Client ID:')
	console.log(`   Value: ${results.clientId.value}`)
	console.log(`   ${results.clientId.message}`)

	console.log('\n🔐 Client Secret:')
	console.log(`   Value: ${results.clientSecret.value}`)
	console.log(`   ${results.clientSecret.message}`)

	console.log('\n🔑 NextAuth Secret:')
	console.log(`   Value: ${results.nextAuthSecret.value}`)
	console.log(`   ${results.nextAuthSecret.message}`)

	console.log('\n🌐 Server URL:')
	console.log(`   Value: ${results.serverUrl.value}`)
	console.log(`   ${results.serverUrl.message}`)

	console.log('\n' + '='.repeat(50))

	const allValid =
		results.clientId.isValid &&
		results.clientSecret.isValid &&
		results.nextAuthSecret.isValid &&
		results.serverUrl.isValid

	if (allValid) {
		console.log('\n✅ All configurations are valid!')
	} else {
		console.log('\n❌ Some configurations need attention')
		console.log('\n💡 Make sure your .env.local file contains:')
		console.log('   GOOGLE_CLIENT_ID=your_client_id')
		console.log('   GOOGLE_CLIENT_SECRET=your_client_secret')
		console.log('   NEXT_AUTH_SECRET=your_secret')
		console.log('   NEXT_PUBLIC_SERVER_URL=http://localhost:5000')
	}

	console.log('\n')

	return allValid
}
