import { getProducts } from '@/actions/user.action'
import ProductCard from '@/components/card/product.card'
import Filter from '@/components/shared/filter'
import Pagination from '@/components/shared/pagination'
import { Separator } from '@/components/ui/separator'
import { SearchParams } from '@/types'
import BookHero from './_components/book-hero'
interface Props {
	searchParams: SearchParams
}
const Page = async ({ searchParams }: Props) => {
	const { q, filter, category, page } = await searchParams
	const res = await getProducts({
		searchQuery: `${q || ''}`,
		filter: `${filter || ''}`,
		category: `${category || ''}`,
		page: `${page || '1'}`,
	})

	const products = res?.data?.products

	const isNext = res?.data?.isNext || false

	// Eng oxirgi qo'shilgan kitob (birinchi kitob, chunki filter=newest bo'lganida eng yangisi birinchi keladi)
	const featuredBook = res?.data?.products[0]

	return (
		<>
			<div className=' w-full'>
				{featuredBook && <BookHero featuredBook={featuredBook} />}
			</div>

			<div className=' w-full flex items-center   mt-10 '>
				<h1 className='font-bold mr-4'>Kitoblar</h1>

				<Filter />
			</div>

			<Separator className='my-4' />

			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4'>
				{products &&
					products.map(product => (
						<ProductCard key={product._id} product={product} />
					))}
			</div>
			<Pagination isNext={isNext} pageNumber={page ? +page : 1} />
		</>
	)
}
export default Page
