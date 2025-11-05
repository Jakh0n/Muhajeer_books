'use client'
import { IProduct } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// interface Book {
// 	id: number
// 	title: string
// 	author: string
// 	description: string
// 	rating: number
// 	image: string
// }

// const books: Book[] = [
// 	{
// 		id: 1,
// 		title: 'The Great Gatsby',
// 		author: 'F. Scott Fitzgerald',
// 		description:
// 			'A classic American novel exploring themes of decadence and the American Dream in the Jazz Age.',
// 		rating: 4.5,
// 		image:
// 			'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
// 	},
// 	{
// 		id: 2,
// 		title: 'To Kill a Mockingbird',
// 		author: 'Harper Lee',
// 		description:
// 			'A gripping tale of racial injustice and loss of innocence in the American South.',
// 		rating: 4.8,
// 		image:
// 			'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
// 	},
// 	{
// 		id: 3,
// 		title: '1984',
// 		author: 'George Orwell',
// 		description:
// 			'A dystopian masterpiece about totalitarianism and the power of independent thought.',
// 		rating: 4.6,
// 		image:
// 			'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop',
// 	},
// 	{
// 		id: 4,
// 		title: 'Pride and Prejudice',
// 		author: 'Jane Austen',
// 		description:
// 			'A romantic novel about love, marriage, and social expectations in Regency England.',
// 		rating: 4.4,
// 		image:
// 			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
// 	},
// 	{
// 		id: 5,
// 		title: 'The Catcher in the Rye',
// 		author: 'J.D. Salinger',
// 		description:
// 			"A coming-of-age story following teenager Holden Caulfield's journey through New York.",
// 		rating: 4.2,
// 		image:
// 			'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
// 	},
// ]

interface CarouselProps {
	products: IProduct[]
}

export default function BookCarousel({ products }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	// Auto-play every 3 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % products.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	const nextSlide = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % products.length)
	}

	const prevSlide = () => {
		setCurrentIndex(
			prevIndex => (prevIndex - 1 + products.length) % products.length
		)
	}

	const currentBook = products[currentIndex]

	// const renderStars = (rating: number) => {
	// 	const fullStars = Math.floor(rating)
	// 	const hasHalfStar = rating % 1 !== 0
	// 	const emptyStars = 5 - Math.ceil(rating)

	// 	return (
	// 		<div className='flex items-center gap-1'>
	// 			{[...Array(fullStars)].map((_, i) => (
	// 				<Star key={i} className='w-4 h-4 fill-green-400 text-green-400' />
	// 			))}
	// 			{hasHalfStar && (
	// 				<Star className='w-4 h-4 fill-green-400/50 text-green-400' />
	// 			)}
	// 			{[...Array(emptyStars)].map((_, i) => (
	// 				<Star key={i} className='w-4 h-4 text-gray-300' />
	// 			))}
	// 			<span className='ml-2 text-sm font-semibold text-green-600'>
	// 				{rating}
	// 			</span>
	// 		</div>
	// 	)
	// }

	return (
		<div className='w-full h-[18vh] lg:h-[35vh] relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl overflow-hidden shadow-2xl border border-green-100/50'>
			{/* Main Grid - 3 columns */}
			<div className='grid grid-cols-3 h-full'>
				{/* Left Side - Book Info (2 columns) */}
				<div className='col-span-2 p-4 lg:p-8 flex items-center bg-white/40 backdrop-blur-sm order-2 relative'>
					<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-50/40 via-transparent to-transparent'></div>
					<div className='w-full h-full flex flex-col relative'>
						{/* Title */}
						<h2 className='text-lg lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight tracking-tight mb-2 lg:mb-4 line-clamp-1'>
							{currentBook.title}
						</h2>

						{/* Description */}
						<p className='text-xs lg:text-base text-gray-600 leading-relaxed font-medium line-clamp-2 lg:line-clamp-3 mb-3 lg:mb-6'>
							{currentBook.description}
						</p>

						<div className='flex items-center gap-2 lg:gap-4 mt-auto'>
							<div className='hidden lg:block'>
								<span className='inline-flex items-center px-2 lg:px-4 py-0.5 lg:py-1.5 rounded-full text-xs lg:text-sm font-semibold bg-green-100/80 text-green-700 backdrop-blur-sm'>
									Bestseller
								</span>
							</div>
							<Link
								href={`/product/${currentBook._id}`}
								className='inline-flex items-center px-3 lg:px-5 py-1.5 lg:py-2.5 rounded-full text-xs lg:text-sm font-semibold bg-emerald-600/90 hover:bg-emerald-600 text-white backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5'
							>
								Batafsil
							</Link>
						</div>
					</div>
				</div>

				{/* Right Side - Book Image (1 column) */}
				<div className='col-span-1 relative bg-gradient-to-br from-emerald-200 via-green-300 to-teal-400 flex items-center justify-center p-2 lg:p-6 order-1 overflow-hidden'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)] opacity-30'></div>
					<div className='absolute top-0 right-0 h-full w-1/2 bg-white/20 blur-3xl transform rotate-12 translate-x-1/2'></div>
					<div className='relative group'>
						<div className='absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500'></div>
						<Image
							src={currentBook.image}
							alt={currentBook.title}
							width={100}
							height={100}
							className='lg:w-[200px] lg:h-[200px] object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:shadow-emerald-200 relative'
						/>
						<div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center'>
							<span className='text-white text-xs lg:text-sm font-medium px-2 py-1 bg-black/50 rounded-lg backdrop-blur-sm'>
								Ko'proq ko'rish
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className='absolute top-1/2 left-2 lg:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 p-1.5 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-emerald-100 backdrop-blur-sm'
			>
				<ChevronLeft className='w-4 h-4 lg:w-5 lg:h-5' />
			</button>

			<button
				onClick={nextSlide}
				className='absolute top-1/2 right-2 lg:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-600 p-1.5 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-emerald-100 backdrop-blur-sm'
			>
				<ChevronRight className='w-4 h-4 lg:w-5 lg:h-5' />
			</button>

			{/* Dots Indicator */}
			<div className='absolute bottom-2 lg:bottom-6 left-1/2 transform -translate-x-1/2'>
				<div className='flex gap-1 lg:gap-2'>
					{products.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={`h-1.5 lg:h-2 rounded-full transition-all duration-300 ${
								index === currentIndex
									? 'bg-emerald-500 w-6 lg:w-8'
									: 'bg-white/70 w-1.5 lg:w-2 hover:bg-white hover:shadow-md backdrop-blur-sm'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
