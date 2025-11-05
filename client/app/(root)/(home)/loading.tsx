import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<>
			{/* Hero section loading */}
			<div className='max-sm:hidden'>
				<div className='relative overflow-hidden rounded-lg bg-muted py-10'>
					<div className='container relative z-10 grid grid-cols-2'>
						<div className='col-span-1 flex flex-col justify-center space-y-4'>
							<div className='space-y-2'>
								<Skeleton className='h-12 w-[80%]' />
							</div>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-[90%]' />
								<Skeleton className='h-4 w-[85%]' />
								<Skeleton className='h-4 w-[80%]' />
							</div>
							<div className='flex space-x-3'>
								<Skeleton className='h-10 w-24' />
								<Skeleton className='h-10 w-24' />
							</div>
						</div>
						<div className='col-span-1 flex items-center justify-center'>
							<Skeleton className='h-[350px] w-[250px] rounded-lg' />
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto p-4'>
				{/* Filter va Products title loading */}
				<div className='w-full flex items-center mt-10'>
					<Skeleton className='h-6 w-24 mr-4' />
					<Skeleton className='h-10 w-[200px]' />
				</div>

				<Skeleton className='h-[1px] w-full my-4' />

				{/* Grid layout for books */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4'>
					{Array(8)
						.fill(null)
						.map((_, index) => (
							<div
								key={index}
								className='flex flex-col h-[300px] bg-card rounded-lg p-3'
							>
								{/* Book cover skeleton */}
								<div className='relative w-full h-[180px]'>
									<Skeleton className='absolute inset-0 rounded-lg' />
								</div>

								{/* Book info container */}
								<div className='flex flex-col justify-between flex-1 mt-2'>
									{/* Title and description */}
									<div className='space-y-1.5'>
										<Skeleton className='h-3.5 w-[80%]' />
										<Skeleton className='h-3.5 w-[60%]' />
									</div>

									<div className='space-y-1.5'>
										{/* Author name */}
										<Skeleton className='h-3 w-[40%]' />

										{/* Rating */}
										<div className='flex items-center gap-1.5'>
											<Skeleton className='h-3.5 w-3.5' />
											<Skeleton className='h-3 w-[30%]' />
										</div>
									</div>
								</div>
							</div>
						))}
				</div>

				{/* Pagination loading */}
				<div className='flex justify-center mt-8 gap-2'>
					<Skeleton className='h-10 w-10' />
					<Skeleton className='h-10 w-10' />
					<Skeleton className='h-10 w-10' />
				</div>
			</div>
		</>
	)
}
