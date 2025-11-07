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
	const getShareUrl = () => {
		if (!productId) {
			// Fallback to home page if no productId
			if (typeof window !== 'undefined') {
				return window.location.origin
			}
			return (
				process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://muhajeerbooks.vercel.app'
			)
		}

		if (typeof window !== 'undefined') {
			return `${window.location.origin}/product/${productId}`
		}
		return `${
			process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://muhajeerbooks.vercel.app'
		}/product/${productId}`
	}

	const shareUrl = getShareUrl()

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
						<TelegramShareButton url={shareUrl}>
							<TelegramIcon className='rounded-full size-10' />
						</TelegramShareButton>
						<WhatsappShareButton url={shareUrl}>
							<WhatsappIcon className='rounded-full size-10' />
						</WhatsappShareButton>
						<FacebookShareButton url={shareUrl}>
							<FacebookIcon className='rounded-full size-10' />
						</FacebookShareButton>
						<TwitterShareButton url={shareUrl}>
							<TwitterIcon className='rounded-full size-10' />
						</TwitterShareButton>
						<EmailShareButton url={shareUrl}>
							<EmailIcon className='rounded-full size-10' />
						</EmailShareButton>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ShareBtn
