'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
interface Props {
	isLoggedIn: boolean
}

const BuyButton: FC<Props> = ({ isLoggedIn }) => {
	const router = useRouter()

	const onBuy = () => {
		if (!isLoggedIn) {
			router.push('/sign-in')
			toast({
				title: 'Iltimos, tizimga kiring',
				description: 'Kitob xarid qilish uchun ruyxatdan oting',
			})
		} else {
			router.push('/contact')
		}
	}

	return (
		<Button
			size='lg'
			variant='secondary'
			className='bg-green-500'
			onClick={onBuy}
		>
			<span className='text-white'>Sotib olish uchun</span>
			<ShoppingCart className='h-4 w-4' />
		</Button>
	)
}

export default BuyButton
