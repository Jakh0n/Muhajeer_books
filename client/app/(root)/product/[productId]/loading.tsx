import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='h-full w-full p-8'>
			<div className='mx-auto px-4 py-10 sm:px-6 max-w-7xl lg:px-8'>
				<div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
					{/* Rasm skeleti */}
					<div className='flex flex-col gap-4'>
						<Skeleton className='aspect-square rounded-xl' />
						<div className='hidden gap-4 lg:grid grid-cols-3'>
							<Skeleton className='aspect-square rounded-lg' />
							<Skeleton className='aspect-square rounded-lg' />
							<Skeleton className='aspect-square rounded-lg' />
						</div>
					</div>

					{/* Ma'lumotlar skeleti */}
					<div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
						<Skeleton className='h-8 w-48 rounded-lg' />

						<div className='mt-8 flex flex-col gap-4'>
							<Skeleton className='h-4 w-32 rounded-lg' />
							<Skeleton className='h-4 w-24 rounded-lg' />
							<Skeleton className='h-4 w-36 rounded-lg' />
						</div>

						<div className='mt-10 flex flex-col gap-4'>
							<Skeleton className='h-20 w-full rounded-lg' />
							<Skeleton className='h-12 w-full rounded-lg' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
