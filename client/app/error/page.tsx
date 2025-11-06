'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AuthErrorContent() {
	const searchParams = useSearchParams()
	const error = searchParams.get('error')

	const errorMessages: Record<string, string> = {
		Configuration:
			'There is a problem with the server configuration. Please contact support.',
		AccessDenied:
			'Authentication failed. This could be due to a server connection issue or configuration problem. Check the server console for details.',
		Verification:
			'The verification token has expired or has already been used.',
		Default:
			'An error occurred during authentication. Please try again or use email/password to sign in.',
	}

	const errorMessage =
		error && errorMessages[error] ? errorMessages[error] : errorMessages.Default

	return (
		<Card className='w-full max-w-md p-6 shadow-lg'>
			<div className='space-y-4 text-center'>
				<h1 className='text-2xl font-bold text-destructive'>
					Authentication Error
				</h1>
				<p className='text-sm text-muted-foreground'>{errorMessage}</p>

				{error === 'AccessDenied' && (
					<div className='rounded-lg bg-muted p-4 text-left text-sm'>
						<p className='font-semibold mb-2'>💡 Troubleshooting steps:</p>
						<ol className='list-decimal list-inside space-y-1 text-muted-foreground'>
							<li>Make sure your Express server is running</li>
							<li>Check that NEXT_PUBLIC_SERVER_URL is set correctly</li>
							<li>Verify your server console for error messages</li>
							<li>Check the browser console for detailed logs</li>
						</ol>
					</div>
				)}

				<div className='flex flex-col gap-2 pt-4'>
					<Button asChild>
						<Link href='/sign-in'>Try Again</Link>
					</Button>
					<Button asChild variant='outline'>
						<Link href='/sign-up'>Sign Up Instead</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

function ErrorFallback() {
	return (
		<Card className='w-full max-w-md p-6 shadow-lg'>
			<div className='space-y-4 text-center'>
				<h1 className='text-2xl font-bold text-destructive'>
					Authentication Error
				</h1>
				<p className='text-sm text-muted-foreground'>
					An error occurred during authentication. Please try again or use
					email/password to sign in.
				</p>
				<div className='flex flex-col gap-2 pt-4'>
					<Button asChild>
						<Link href='/sign-in'>Try Again</Link>
					</Button>
					<Button asChild variant='outline'>
						<Link href='/sign-up'>Sign Up Instead</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default function AuthErrorPage() {
	return (
		<div className='flex justify-center items-center min-h-screen p-4'>
			<Suspense fallback={<ErrorFallback />}>
				<AuthErrorContent />
			</Suspense>
		</div>
	)
}
