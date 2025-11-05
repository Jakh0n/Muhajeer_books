'use client'
import { Share2 } from 'lucide-react'
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	TelegramIcon,
	TelegramShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from 'react-share'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

interface ShareBtnProps {
	productId?: string
}

const ShareBtn = ({ productId }: ShareBtnProps) => {
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='rounded-full' size={'sm'} variant={'outline'}>
						<Share2 className='size-4' />
						<span className='text-sm'>Ulashish</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className='text-center text-2xl font-bold'>
							Ulashish
						</DialogTitle>
					</DialogHeader>
					<div className='flex items-center space-x-2 justify-center'>
						<TelegramShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}`}
						>
							<TelegramIcon className='rounded-full size-10' />
						</TelegramShareButton>
						<WhatsappShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}`}
						>
							<WhatsappIcon className='rounded-full size-10' />
						</WhatsappShareButton>
						<FacebookShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}`}
						>
							<FacebookIcon className='rounded-full size-10' />
						</FacebookShareButton>
						<TwitterShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}`}
						>
							<TwitterIcon className='rounded-full size-10' />
						</TwitterShareButton>
						<EmailShareButton
							url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}`}
						>
							<EmailIcon className='rounded-full size-10' />
						</EmailShareButton>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ShareBtn
