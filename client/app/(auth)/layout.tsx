import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { ChildProps } from '@/types'
import { getServerSession } from 'next-auth'

async function Layout({ children }: ChildProps) {
	const session = await getServerSession(authOptions)

	return (
		<div>
			<Navbar session={session} />
			<main className='px-2 sm:px-4 md:px-6 lg:px-8 mt-44 flex justify-center'>
				{children}
			</main>
		</div>
	)
}

export default Layout
