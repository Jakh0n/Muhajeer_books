'use client'

import { toast } from '@/hooks/use-toast'
import { contactSchema } from '@/lib/validation/index'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	BookOpen,
	MapPin,
	MessageSquare,
	Phone,
	Send,
	User,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

function ContactForm() {
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			bookTitle: '',
			message: '',
		},
	})

	function onSubmit(values: z.infer<typeof contactSchema>) {
		setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TETELGRAM_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TETELGRAM_CHAT_ID!

		fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache',
			},
			body: JSON.stringify({
				chat_id: telegramChatId,
				text: `📚 Yangi Buyurtma!

👤 Mijoz: ${values.name}
📱 Telefon: ${values.phone}
📍 Manzil: ${values.address}
📖 Kitob: ${values.bookTitle}
💬 Qo'shimcha: ${values.message || "Yo'q"}`,
			}),
		})
			.then(() => {
				form.reset()
				toast({
					description:
						"Buyurtmangiz muvaffaqiyatli yuborildi! Siz bilan tez orada bog'lanishadi",
				})
			})
			.catch(() => {
				toast({
					description: "Xatolik yuz berdi! Qayta urinib ko'ring.",
					variant: 'destructive',
				})
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 max-w-md mx-auto p-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-lg'
			>
				<h2 className='text-2xl font-semibold text-center mb-6'>
					Kitob buyurtma berish
				</h2>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative'>
									<Input
										className='h-12 text-lg rounded-xl focus:ring-2 focus:ring-primary pl-10'
										placeholder='Ismingiz'
										disabled={isLoading}
										{...field}
									/>
									<User className='absolute left-3 top-3.5 h-5 w-5 text-muted-foreground' />
								</div>
							</FormControl>
							<FormMessage className='text-sm' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative'>
									<Input
										className='h-12 text-lg rounded-xl focus:ring-2 focus:ring-primary pl-10'
										placeholder='Telefon raqamingiz'
										type='tel'
										disabled={isLoading}
										{...field}
									/>
									<Phone className='absolute left-3 top-3.5 h-5 w-5 text-muted-foreground' />
								</div>
							</FormControl>
							<FormMessage className='text-sm' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='address'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative'>
									<Input
										className='h-12 text-lg rounded-xl focus:ring-2 focus:ring-primary pl-10'
										placeholder='Yetkazib berish manzili'
										disabled={isLoading}
										{...field}
									/>
									<MapPin className='absolute left-3 top-3.5 h-5 w-5 text-muted-foreground' />
								</div>
							</FormControl>
							<FormMessage className='text-sm' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bookTitle'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative'>
									<Input
										className='h-12 text-lg rounded-xl focus:ring-2 focus:ring-primary pl-10'
										placeholder='Qaysi kitobni xohlaysiz?'
										disabled={isLoading}
										{...field}
									/>
									<BookOpen className='absolute left-3 top-3.5 h-5 w-5 text-muted-foreground' />
								</div>
							</FormControl>
							<FormMessage className='text-sm' />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='relative'>
									<Textarea
										disabled={isLoading}
										className='resize-none h-32 text-lg rounded-xl focus:ring-2 focus:ring-primary pl-10 pt-2'
										placeholder="Qo'shimcha ma'lumotlar..."
										{...field}
									/>
									<MessageSquare className='absolute left-3 top-3.5 h-5 w-5 text-muted-foreground' />
								</div>
							</FormControl>
							<FormMessage className='text-sm' />
						</FormItem>
					)}
				/>

				<Button
					className='w-full h-12 text-lg font-medium rounded-xl transition-transform active:scale-98'
					size={'lg'}
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? (
						<span className='flex items-center justify-center'>
							<svg
								className='animate-spin -ml-1 mr-3 h-5 w-5'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle
									className='opacity-25'
									cx='12'
									cy='12'
									r='10'
									stroke='currentColor'
									strokeWidth='4'
								></circle>
								<path
									className='opacity-75'
									fill='currentColor'
									d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
								></path>
							</svg>
							Yuborilmoqda...
						</span>
					) : (
						<span className='flex items-center justify-center'>
							Buyurtma berish
							<Send className='w-5 h-5 ml-2' />
						</span>
					)}
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm
