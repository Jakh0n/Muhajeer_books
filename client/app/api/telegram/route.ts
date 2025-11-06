import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { name, phone, address, bookTitle, message } = body

		// Try server-side env vars first (more secure), fallback to NEXT_PUBLIC_ for compatibility
		// Also handle typo version (TETELGRAM) for backward compatibility
		const telegramBotId =
			process.env.TELEGRAM_BOT_API ||
			process.env.NEXT_PUBLIC_TELEGRAM_BOT_API ||
			process.env.NEXT_PUBLIC_TETELGRAM_BOT_API // Handle typo
		const telegramChatId =
			process.env.TELEGRAM_CHAT_ID ||
			process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
			process.env.NEXT_PUBLIC_TETELGRAM_CHAT_ID // Handle typo

		if (!telegramBotId || !telegramChatId) {
			const debugInfo = {
				hasBotId: !!telegramBotId,
				hasChatId: !!telegramChatId,
				botIdSource: process.env.TELEGRAM_BOT_API
					? 'TELEGRAM_BOT_API'
					: process.env.NEXT_PUBLIC_TELEGRAM_BOT_API
					? 'NEXT_PUBLIC_TELEGRAM_BOT_API'
					: 'none',
				chatIdSource: process.env.TELEGRAM_CHAT_ID
					? 'TELEGRAM_CHAT_ID'
					: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
					? 'NEXT_PUBLIC_TELEGRAM_CHAT_ID'
					: 'none',
				allTelegramEnvVars: Object.keys(process.env).filter(key =>
					key.includes('TELEGRAM')
				),
			}
			console.error('Telegram config check:', debugInfo)
			return NextResponse.json(
				{
					success: false,
					error:
						'Telegram configuration is missing. Please set TELEGRAM_BOT_API and TELEGRAM_CHAT_ID (or NEXT_PUBLIC_ versions) environment variables.',
					debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined,
				},
				{ status: 500 }
			)
		}

		const messageText = `📚 Yangi Buyurtma!

👤 Mijoz: ${name}
📱 Telefon: ${phone}
📍 Manzil: ${address}
📖 Kitob: ${bookTitle}
💬 Qo'shimcha: ${message || "Yo'q"}`

		const response = await fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: messageText,
				}),
			}
		)

		const data = await response.json()

		if (!response.ok || !data.ok) {
			console.error('Telegram API error:', data)
			return NextResponse.json(
				{
					success: false,
					error: data.description || 'Telegram API returned an error',
				},
				{ status: response.status }
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Failed to send message to Telegram:', error)
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : 'Failed to send message',
			},
			{ status: 500 }
		)
	}
}
