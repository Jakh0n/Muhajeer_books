'use client'

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Home, Menu, Package, User } from 'lucide-react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import Logo from './logo'
import ModeToggle from './mode-toggle'
import UserBox from './user-box'
interface NavbarProps {
	session: Session | null
}

function Navbar({ session }: NavbarProps) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div className='h-[8vh] lg:h-[10vh] fixed inset-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-blue-950/30 border-b border-gray-200 dark:border-gray-800 flex items-center'>
			<div className='container mx-auto flex justify-between items-center'>
				<Logo />
				<div className='flex items-center gap-2'>
					{/* Desktop Menu */}
					<div className='hidden md:flex items-center gap-4 md:gap-6'>
						{pathname === '/' ? (
							<Link
								href='/products'
								className='text-sm font-medium transition-colors hover:text-primary flex items-center gap-1'
							>
								<Package className='size-5' />
								<span className='font-bold text-sm'>Barcha Kitoblar</span>
							</Link>
						) : (
							<Link
								href='/'
								className='text-sm font-medium transition-colors hover:text-primary flex items-center gap-1'
							>
								<Home className='size-5' />
								<span className='font-bold text-sm'>Asosiy</span>
							</Link>
						)}
					</div>

					{/* Mobile Menu */}
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild className='md:hidden'>
							<Button variant='ghost' size='icon'>
								<Menu className='h-5 w-5' />
							</Button>
						</SheetTrigger>
						<SheetContent side='right'>
							<SheetTitle className='text-xl font-  mb-4'>Menu</SheetTitle>
							<div className='flex flex-col gap-4'>
								<Link
									href='/'
									onClick={() => setOpen(false)}
									className='flex items-center gap-2'
								>
									<Home className='h-5 w-5' />
									<span className='text-sm font-medium transition-colors hover:text-primary'>
										Asosiy
									</span>
								</Link>
								<Link
									href='/products'
									onClick={() => setOpen(false)}
									className='flex items-center gap-2'
								>
									<Package className='h-5 w-5' />
									<span className='text-sm font-medium transition-colors hover:text-primary'>
										Barcha Kitoblar
									</span>
								</Link>
							</div>
						</SheetContent>
					</Sheet>

					<ModeToggle />
					<div className='flex items-center gap-2 '>
						{session?.currentUser?._id && (
							<UserBox user={session.currentUser} />
						)}
						{!session?.currentUser?._id && (
							<Button asChild size={'icon'}>
								<Link href={'/sign-in'}>
									<User />
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
