'use client'

import { register, sendOtp, verifyOtp } from '@/actions/auth-action'
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { toast } from '@/hooks/use-toast'
import { otpSchema, registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignUpPage = () => {
	const [isResend, setIsResend] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)
	const { isLoading, setIsLoading, onError } = UseAction()
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', fullName: '' },
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: '' },
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)
		const res = await sendOtp({ email: values.email })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Xatolik yuz berdi')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast({ description: 'OTP yuborildi' })
			setIsVerifying(true)
			setIsLoading(false)
			setIsResend(false)
		}
	}

	async function onVerify(values: z.infer<typeof otpSchema>) {
		setIsLoading(true)
		const res = await verifyOtp({
			otp: values.otp,
			email: form.getValues('email'),
		})
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Xatolik yuz berdi')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 301) {
			setIsResend(true)
			setIsLoading(false)
			toast({ description: 'OTP vaqti o&apos;tgan. Iltimos, OTP yuboring' })
		}
		if (res.data.status === 200) {
			const response = await register(form.getValues())
			if (
				response?.serverError ||
				response?.validationErrors ||
				!response?.data
			) {
				return onError('Xatolik yuz berdi')
			}
			if (response.data.failure) {
				return onError(response.data.failure)
			}
			if (response.data.user._id) {
				toast({ description: 'User yaratildi' })
				signIn('credentials', {
					userId: response.data.user._id,
					callbackUrl: '/',
				})
			}
		}
	}

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

	return (
		<Card className='w-full max-w-md p-6 shadow-lg'>
			<div className='space-y-2 text-center mb-6'>
				<h1 className='text-2xl font-bold'>Ro&apos;yxatdan otish</h1>
				<p className='text-sm text-muted-foreground'>
					Arzon<span className='font-semibold text-primary'>Kitob</span>{' '}
					tizimiga ro&apos;yxatdan o&apos;tish
				</p>
			</div>

			{!isVerifying && (
				<>
					<Button
						type='button'
						variant='outline'
						className='w-full mb-4'
						onClick={handleGoogleSignUp}
						disabled={isLoading || isGoogleLoading}
					>
						{isGoogleLoading ? (
							<Loader className='mr-2 h-4 w-4 animate-spin' />
						) : (
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
						)}
						Google orqali ro&apos;yxatdan o&apos;tish
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
				</>
			)}

			<Form {...form}>
				<form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
					{!isVerifying && (
						<>
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
						</>
					)}
				</form>
			</Form>

			{isVerifying && (
				<Form {...otpForm}>
					<form
						className='mt-2 space-y-4'
						onSubmit={otpForm.handleSubmit(onVerify)}
					>
						<FormField
							control={otpForm.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='w-full space-y-2'>
									<Label>OTP kiriting</Label>
									<FormControl>
										<div className='flex justify-center'>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
												</InputOTPGroup>
												<InputOTPSeparator />
												<InputOTPGroup>
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</div>
									</FormControl>
									<FormMessage className='text-red-500 text-xs' />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-2'>
							<Button
								disabled={isLoading || isResend}
								type='submit'
								className='flex-1'
							>
								{isLoading ? (
									<>
										<Loader className='mr-2 h-4 w-4 animate-spin' />
										Kutilmoqda...
									</>
								) : (
									'Tasdiqlash'
								)}
							</Button>
							{isResend && (
								<Button
									disabled={isLoading}
									onClick={() => onSubmit(form.getValues())}
									type='button'
									variant='outline'
								>
									OTP yuborish
								</Button>
							)}
						</div>
					</form>
				</Form>
			)}

			{!isVerifying && (
				<div className='mt-6 text-center text-sm'>
					<span className='text-muted-foreground'>Hisobingiz bormi? </span>
					<Button asChild variant='link' className='p-0 h-auto font-semibold'>
						<Link href='/sign-in'>Tizimga kirish</Link>
					</Button>
				</div>
			)}
		</Card>
	)
}

export default SignUpPage
