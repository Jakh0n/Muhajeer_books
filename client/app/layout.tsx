import SessionProvider from '@/components/providers/session.provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { ChildProps } from '@/types'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-montserrat',
})

export const metadata: Metadata = {
	metadataBase: new URL('https://muhajeerbooks.com/'),
	title: "Muhajeer Books | O'zbek, rus va ingliz tillaridagi kitoblar do'koni",
	description:
		"O'zbek, rus va ingliz tillaridagi kitoblarni online buyurtma qiling va yetkazib berishni taklif qilamiz.",
	icons: { icon: '/muhajeer_logo.jpg' },
	openGraph: {
		title:
			"Muhajeer Books | O'zbek, rus va ingliz tillaridagi kitoblar do'koni",
		description:
			"O'zbek, rus va ingliz tillaridagi kitoblarni online buyurtma qiling va yetkazib berishni taklif qilamiz.",
		type: 'website',
		url: 'https://muhajeerbooks.com',
		locale: 'kr-KR',
		images: '/muhajeer_logo.jpg',
		countryName: 'Korea',
		siteName: 'Muhajeer Books',
		emails: 'muhajeerbooks@gmail.com',
	},
	keywords: [
		'kitob dukoni Koreyada',
		'Koreyada kitob sotish',
		"Koreyada o'zbek kitoblari",
		'Muhajeer Books',
		'Muqaddima',
		"Koreyada kitob do'koni",
		'arzon kitoblar Koreyada',
		'kitob dokoni',
		'kitoblari',
		'adabiyoti',
		'romanlari',
		'yuklab',
		'elektron',
		'onlayn',
		'Koreyada yangi kitoblar',
		"Koreyada o'zbek tilidagi kitoblar",
		'Koreyada kutubxona',
		'kitoblar Koreyada online',
		"Koreyada o'quv adabiyotlari",
		'Koreyada kitob buyurtma qilish',
		"kitob do'koni Seoul",
		"Koreyada o'quv kitoblari",
		'Alisher Navoiy kitoblari',
		'Cho‘lpon asarlari',
		'Abdulla Qodiriy romanlari',
		'O‘tkir Hoshimov kitoblari',
		'Tohir Malik kitoblari',
		'한국 책방',
		'서울 책방',
		'cheap books in Korea',
		'Qur’oni Karim tarjimasi',
		'Tafsiri Hilol kitobi',
		'Hadis kitoblari o‘zbekcha',
		'Riyozus-solihiyn o‘zbekcha',
		'Uzbek books in Korea',
		'Korean bookstore online',
		'buy books in Korea',
		'Korean bookstore for foreigners',

		"Seul kitob do'koni",
		"online kitob do'koni Koreyada",
		'Koreyada kitob yetkazib berish',
	],
}

export default function RootLayout({ children }: ChildProps) {
	return (
		<SessionProvider>
			<html lang='en' suppressHydrationWarning>
				<body
					className={`${montserrat.variable} overflow-x-hidden antialiased`}
				>
					<div className='container px-2 sm:px-4 md:px-6 lg:px-8 max-w-full lg:max-w-6xl mt-24'>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							{children}
							<Analytics />
						</ThemeProvider>
					</div>
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}
