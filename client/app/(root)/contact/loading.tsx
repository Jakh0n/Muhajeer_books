import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='flex flex-col gap-8 pb-10'>
			<div className='space-y-4'>
				<Skeleton className='h-10 w-[200px]' />
				<Skeleton className='h-4 w-[300px]' />
			</div>

			<div className='space-y-6'>
				<div className='space-y-2'>
					<Skeleton className='h-4 w-[150px]' />
					<Skeleton className='h-10 w-full' />
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-[150px]' />
					<Skeleton className='h-10 w-full' />
				</div>

				<div className='space-y-2'>
					<Skeleton className='h-4 w-[150px]' />
					<Skeleton className='h-32 w-full' />
				</div>

				<Skeleton className='h-10 w-[150px]' />
			</div>
		</div>
	)
}
