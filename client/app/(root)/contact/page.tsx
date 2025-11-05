'use client'

import ContactForm from '@/components/form/contact'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Phone, ShoppingCart, Star } from 'lucide-react'

export default function BuyBookPage() {
	return (
		<div className='container mx-auto bg-gradient-to-b from-white to-green-50 px-4 py-12 dark:from-slate-900 dark:to-slate-800 md:px-6'>
			<h1 className='mb-4 text-center text-4xl font-bold text-green-800 dark:text-green-400'>
				Kitob buyurtma berish
			</h1>
			<p className='mx-auto mb-10 max-w-2xl text-center text-gray-600 dark:text-gray-300'>
				Sevimli kitobingizni tanlang va bizga buyurtma bering! Biz siz bilan tez
				orada bog&apos;lanamiz.
			</p>

			<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
				{/* Left Column - Information */}
				<div className='flex flex-col justify-center'>
					<Card className='relative overflow-hidden border-0 bg-white shadow-lg dark:bg-slate-900'>
						<div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-green-400 to-green-600'></div>
						<CardContent className='pt-8'>
							<h2 className='mb-6 flex items-center text-2xl font-semibold text-green-800 dark:text-green-400'>
								<BookOpen className='mr-2 size-6' /> Kitoblar dunyosiga xush
								kelibsiz
							</h2>

							<p className='mb-8 text-gray-600 dark:text-gray-300'>
								Bizning kutubxonamizda siz eng sara kitoblarni topishingiz
								mumkin. Maʼnaviy ozuqa olish va bilimlaringizni oshirish uchun
								ajoyib imkoniyat!
							</p>

							<div className='space-y-6'>
								<div className='flex items-start space-x-4 rounded-lg bg-green-50 p-4 dark:bg-slate-800'>
									<Star className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Nega bizni tanlashingiz kerak
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											✓ Eng sifatli kitoblar kolleksiyasi
											<br />
											✓ Qulay va tezkor yetkazib berish
											<br />✓ Hamyonbop narxlar
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<ShoppingCart className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Buyurtma berish oson
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											Kitob nomini va telefon raqamingizni yozib, bizga
											yuborishingiz yetarli. Qolganini biz hal qilamiz!
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Phone className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Bizga qo&apos;ng&apos;iroq qiling
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											+998 90 123 45 67
										</p>
									</div>
								</div>

								<div className='flex items-start space-x-4'>
									<Clock className='mt-1 size-5 shrink-0 text-green-500' />
									<div>
										<h3 className='font-medium text-green-800 dark:text-green-400'>
											Ish vaqtimiz
										</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											Dushanba - Shanba: 9:00 - 18:00
											<br />
											Yakshanba: Dam olish kuni
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Order Form */}
				<div>
					<Card className='relative overflow-hidden border-0 bg-white shadow-lg dark:bg-slate-900'>
						<div className='absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-green-400 to-green-600'></div>
						<CardContent className='pt-8'>
							<ContactForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
