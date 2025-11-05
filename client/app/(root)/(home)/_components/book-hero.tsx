'use client'

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { IProduct } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface BookHeroProps {
	featuredBook: IProduct
}

const BookHero = ({ featuredBook }: BookHeroProps) => {
	return (
		<>
			{/* Banner (sm va md o'lchamlarda ko'rinadi) */}
			<div className='w-full block lg:hidden'>
				<div className='relative overflow-hidden rounded-lg bg-primary text-primary-foreground p-4 sm:p-6'>
					<div className='space-y-3 sm:space-y-4'>
						<h2 className='text-xl sm:text-2xl font-bold'>Yangi kitoblar</h2>
						<p className='text-sm opacity-90'>
							Eng so'nggi va qiziqarli kitoblarni kashf eting
						</p>
						<Button variant='secondary' size='sm' className='w-fit' asChild>
							<Link href='/products'>Barcha kitoblar</Link>
						</Button>
					</div>
					<div className='absolute -right-6 -bottom-6 opacity-20'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='100'
							height='100'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='sm:w-[120px] sm:h-[120px]'
						>
							<path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
							<path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
						</svg>
					</div>
				</div>
			</div>

			{/* BookHero (faqat lg o'lchamda ko'rinadi) */}
			<div className='relative overflow-hidden rounded-lg bg-muted py-10 hidden lg:block'>
				<div className='container relative z-10 grid grid-cols-2'>
					<div className='col-span-1 flex flex-col justify-center space-y-4'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								{featuredBook.title}
							</h1>
						</div>
						<p className='line-clamp-6 max-w-[600px] text-muted-foreground md:text-lg'>
							{featuredBook.description}
						</p>
						<div className='flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
							<Button size='lg' asChild>
								<Link href={`/product/${featuredBook._id}`}>Ko&apos;rish</Link>
							</Button>
							<Button size='lg' variant='outline'>
								{formatPrice(featuredBook.price)}
							</Button>
						</div>
					</div>
					<div className='col-span-1 flex items-center justify-center'>
						<div className='relative h-[350px] w-[250px] overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105'>
							<Image
								src={featuredBook.image || '/images/placeholder.jpg'}
								alt={featuredBook.title}
								fill
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BookHero
