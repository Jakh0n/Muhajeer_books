import { getProduct } from '@/actions/user.action'
import ShareBtn from '@/components/shared/share-btn'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { authOptions } from '@/lib/auth-options'
import { formatPrice } from '@/lib/utils'
import { Params } from '@/types'
import { Package } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BuyButton from './_components/buy-button'
interface ProductPageProps {
	params: Params
}

export async function generateMetadata({ params }: ProductPageProps) {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product

	if (!product) {
		return {
			title: 'Mahsulot topilmadi',
			description: "Kechirasiz, so'ralgan mahsulot mavjud emas",
		}
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			images: [{ url: product.image }],
			title: product.title,
			description: product.description,
		},
	}
}

const ProductPage = async ({ params }: ProductPageProps) => {
	const { productId } = await params
	const res = await getProduct({ id: productId })
	const product = res?.data?.product
	const session = await getServerSession(authOptions)

	const isLoggedIn = !!session?.currentUser

	if (!product) return notFound()

	return (
		<div className=' mx-auto py-6 md:py-12'>
			<div className='grid gap-8 lg:grid-cols-2'>
				{/* Image Section */}
				<div className='flex items-center justify-center lg:justify-end'>
					<div className='relative h-[300px] w-[250px] md:h-[400px] md:w-[300px] lg:h-[500px] lg:w-[350px] overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl'>
						<Image
							src={product.image || '/images/placeholder.jpg'}
							alt={product.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				</div>

				{/* Content Section */}
				<div className='flex flex-col justify-center space-y-6 px-4 md:px-0'>
					<div className='space-y-2'>
						<h1 className='text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight'>
							{product.title}
						</h1>
					</div>

					<div className='flex items-center gap-2'>
						<Badge className='w-fit text-sm md:text-base' variant={'secondary'}>
							# {product.category}
						</Badge>
						<ShareBtn />
					</div>

					<p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
						{product.description}
					</p>

					<div className='flex flex-col gap-2 bg-muted/50 p-4 rounded-lg'>
						<div className='flex items-center gap-2'>
							<span className='font-semibold text-base md:text-lg'>Narxi:</span>
							<span className='text-primary font-bold text-lg md:text-xl'>
								{formatPrice(product.price)}
							</span>
						</div>
					</div>

					<div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
						<BuyButton isLoggedIn={isLoggedIn} />
						<Button size='lg' variant='outline' className='w-fit sm:w-auto'>
							<Link
								href={`/products?category=${product.category}`}
								className='flex items-center gap-2'
							>
								<Package className='size-5' />
								<span>Uxshash kitoblar</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProductPage
