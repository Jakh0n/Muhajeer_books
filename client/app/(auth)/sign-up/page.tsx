'use client'

import { register } from '@/actions/auth-action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignUpPage = () => {
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)
	const { isLoading, setIsLoading, onError } = UseAction()
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', fullName: '' },
	})

	async function handleGoogleSignUp() {
		setIsGoogleLoading(true)
		try {
			await signIn('google', { callbackUrl: '/' })
		} catch (error) {
			toast({
				description:
					'Google orqali ro&apos;yxatdan o&apos;tishda xatolik yuz berdi',
				variant: 'destructive',
			})
			setIsGoogleLoading(false)
		}
	}

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)
		try {
			const res = await register(values)

			// Check for server errors
			if (res?.serverError) {
				console.error('Server error:', res.serverError)
				onError("Server xatosi. Iltimos, qayta urinib ko'ring.")
				return
			}

			// Check for validation errors
			if (res?.validationErrors) {
				console.error('Validation errors:', res.validationErrors)
				onError("Ma'lumotlar noto'g'ri. Iltimos, tekshiring.")
				return
			}

			// Check if response data exists
			if (!res?.data) {
				console.error('No data in response:', res)
				onError("Server javob bermadi. Iltimos, qayta urinib ko'ring.")
				return
			}

			// Check for failure message
			if (res.data.failure) {
				onError(res.data.failure)
				return
			}

			// Check for success
			if (res.data.user?._id) {
				toast({ description: "Ro'yxatdan muvaffaqiyatli o'tdingiz!" })
				// Sign in the user after registration
				await signIn('credentials', {
					userId: res.data.user._id,
					callbackUrl: '/',
				})
			} else {
				console.error('Unexpected response:', res.data)
				onError("Noma'lum xatolik yuz berdi")
			}
		} catch (error) {
			console.error('Sign up error:', error)
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'

			// Check for timeout or network errors
			if (
				errorMessage.includes('timeout') ||
				errorMessage.includes('ECONNABORTED')
			) {
				onError(
					"Server javob bermadi. Vaqt tugadi. Iltimos, qayta urinib ko'ring."
				)
			} else if (
				errorMessage.includes('Network') ||
				errorMessage.includes('ERR_NETWORK')
			) {
				onError(
					"Internetga ulanib bo'lmadi. Iltimos, internet aloqasini tekshiring."
				)
			} else {
				onError("Serverga ulanib bo'lmadi. Iltimos, qayta urinib ko'ring.")
			}
		}
	}

	return (
		<Card className='w-full max-w-md p-6 shadow-lg'>
			<div className='space-y-2 text-center mb-6'>
				<h1 className='text-2xl font-bold'>Ro&apos;yxatdan otish</h1>
				<p className='text-sm text-muted-foreground'>
					Arzon<span className='font-semibold text-primary'>Kitob</span>{' '}
					tizimiga ro&apos;yxatdan o&apos;tish
				</p>
			</div>

			<Button
				type='button'
				variant='outline'
				className='w-full mb-4'
				onClick={handleGoogleSignUp}
				disabled={isLoading || isGoogleLoading}
			>
				{isGoogleLoading ? (
					<>
						<Loader className='mr-2 h-4 w-4 animate-spin' />
						Kutilmoqda...
					</>
				) : (
					<>
						<svg
							className='mr-2 h-4 w-4'
							aria-hidden='true'
							focusable='false'
							data-prefix='fab'
							data-icon='google'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 488 512'
						>
							<path
								fill='currentColor'
								d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 52.6 94.3 256s164.2 203.4 254.5 187.4c49.6-11.5 88.9-45.1 103.4-88.2H248v-96.4h240z'
							></path>
						</svg>
						Google orqali ro&apos;yxatdan o&apos;tish
					</>
				)}
			</Button>

			<div className='relative mb-4'>
				<div className='absolute inset-0 flex items-center'>
					<Separator />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						yoki email bilan
					</span>
				</div>
			</div>

			<Form {...form}>
				<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>To&apos;liq ism</Label>
								<FormControl>
									<Input
										placeholder='Osman Ali'
										disabled={isLoading || isGoogleLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='namuna@gmail.com'
										type='email'
										disabled={isLoading || isGoogleLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Parol</Label>
								<FormControl>
									<Input
										placeholder='****'
										type='password'
										disabled={isLoading || isGoogleLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<Button
						disabled={isLoading || isGoogleLoading}
						type='submit'
						className='w-full'
					>
						{isLoading ? (
							<>
								<Loader className='mr-2 h-4 w-4 animate-spin' />
								Kutilmoqda...
							</>
						) : (
							"Ro'yxatdan o'tish"
						)}
					</Button>
				</form>
			</Form>

			<div className='mt-6 text-center text-sm'>
				<span className='text-muted-foreground'>Hisobingiz bormi? </span>
				<Button asChild variant='link' className='p-0 h-auto font-semibold'>
					<Link href='/sign-in'>Tizimga kirish</Link>
				</Button>
			</div>
		</Card>
	)
}

export default SignUpPage
