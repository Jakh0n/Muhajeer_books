import Navbar from '@/components/shared/navbar'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import MobileSidebar from './_components/mobile-sidebar'
import Sidebar from './_components/sidebar'

async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) redirect('/sign-in')

	return (
		<div>
			<Navbar session={session} />
			<div className='px-2 sm:px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Mobile Sidebar Component */}
				<MobileSidebar />

				{/* Desktop Sidebar */}
				<div className='hidden md:block md:col-span-1'>
					<Sidebar />
				</div>

				<div className='col-span-1 md:col-span-2 pb-10'>{children}</div>
			</div>
		</div>
	)
}

export default Layout
