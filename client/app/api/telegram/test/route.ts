import { NextResponse } from 'next/server'

export async function GET() {
	// Check all possible environment variable names
	const envCheck = {
		TELEGRAM_BOT_API: !!process.env.TELEGRAM_BOT_API,
		NEXT_PUBLIC_TELEGRAM_BOT_API: !!process.env.NEXT_PUBLIC_TELEGRAM_BOT_API,
		TELEGRAM_CHAT_ID: !!process.env.TELEGRAM_CHAT_ID,
		NEXT_PUBLIC_TELEGRAM_CHAT_ID: !!process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
		// Show first few characters (masked) if they exist
		botIdPreview: process.env.TELEGRAM_BOT_API
			? `${process.env.TELEGRAM_BOT_API.substring(0, 10)}...`
			: process.env.NEXT_PUBLIC_TELEGRAM_BOT_API
			? `${process.env.NEXT_PUBLIC_TELEGRAM_BOT_API.substring(0, 10)}...`
			: 'NOT SET',
		chatIdPreview: process.env.TELEGRAM_CHAT_ID
			? process.env.TELEGRAM_CHAT_ID
			: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
			? process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
			: 'NOT SET',
	}

	return NextResponse.json({
		message: 'Telegram Environment Variables Check',
		envCheck,
		allEnvVars: Object.keys(process.env)
			.filter(key => key.includes('TELEGRAM'))
			.reduce((acc, key) => {
				const value = process.env[key]
				if (value) {
					acc[key] = key.includes('BOT_API')
						? `${value.substring(0, 10)}...`
						: value
				}
				return acc
			}, {} as Record<string, string>),
	})
}
