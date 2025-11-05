import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='flex flex-col gap-8 pb-10'>
			<div className='flex items-center justify-between'>
				<Skeleton className='h-10 w-[200px]' />
				<Skeleton className='h-10 w-[100px]' />
			</div>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{[...Array(8)].map((_, i) => (
					<div key={i} className='space-y-3'>
						<Skeleton className='aspect-square rounded-xl' />
						<Skeleton className='h-4 w-2/3' />
						<Skeleton className='h-4 w-1/2' />
					</div>
				))}
			</div>
		</div>
	)
}
