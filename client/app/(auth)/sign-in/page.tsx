'use client'

import { login } from '@/actions/auth-action'
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
import { toast } from '@/hooks/use-toast'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const SignInPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isGoogleLoading, setIsGoogleLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	function onError(message: string) {
		setIsLoading(false)
		toast({ description: message, variant: 'destructive' })
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Xatolik yuz berdi')
		}
		if (res.data.failure) {
			return onError(res.data.failure)
		}
		if (res.data.user) {
			toast({ description: 'Tizimga kirdingiz' })
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
		}
	}

	async function handleGoogleSignIn() {
		setIsGoogleLoading(true)
		try {
			await signIn('google', { callbackUrl: '/' })
		} catch (error) {
			toast({
				description: 'Google orqali kirishda xatolik yuz berdi',
				variant: 'destructive',
			})
			setIsGoogleLoading(false)
		}
	}

	return (
		<Card className='w-full max-w-md p-6 shadow-lg'>
			<div className='space-y-2 text-center mb-6'>
				<h1 className='text-2xl font-bold'>Tizimga kirish</h1>
				<p className='text-sm text-muted-foreground'>
					Arzon<span className='font-semibold text-primary'>Kitob</span>{' '}
					tizimiga kirish
				</p>
			</div>

			<Button
				type='button'
				variant='outline'
				className='w-full mb-4'
				onClick={handleGoogleSignIn}
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
				Google orqali kirish
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
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
								<FormMessage className='text-xs text-red-500' />
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
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading || isGoogleLoading}
					>
						{isLoading ? (
							<>
								<Loader className='mr-2 h-4 w-4 animate-spin' />
								Kutilmoqda...
							</>
						) : (
							'Kirish'
						)}
					</Button>
				</form>
			</Form>

			<div className='mt-6 text-center text-sm'>
				<span className='text-muted-foreground'>Hisobingiz yo&apos;q? </span>
				<Button asChild variant='link' className='p-0 h-auto font-semibold'>
					<Link href='/sign-up'>Ro&apos;yxatdan otish</Link>
				</Button>
			</div>
		</Card>
	)
}

export default SignInPage
