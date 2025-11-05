import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-8'>
			<div className='container max-w-6xl py-8 px-4 sm:px-6 lg:px-8'>
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{/* Branding */}
					<div className='space-y-2'>
						<h3 className='text-lg font-bold'>FLAMI</h3>
						<p className='text-sm leading-6 text-muted-foreground max-w-xs'>
							Koreyada yashovchi o'zbeklar uchun{' '}
							<span className='font-bold text-green-500'>eng arzon</span> va
							<span className='font-bold text-green-500'> eng yangi</span>{' '}
							kitoblarni taklif qilamiz. O'zbek, rus va ingliz tilidagi
							kitoblarni online buyurtma qiling.
						</p>
						<div className='flex items-center space-x-2 pt-2'>
							<Link
								href='https://github.com/jahongirdev'
								target='_blank'
								className='hover:text-primary transition-colors p-1.5 hover:bg-muted rounded-full'
							>
								<Github className='h-4 w-4' />
							</Link>
							<Link
								href='https://linkedin.com'
								target='_blank'
								className='hover:text-primary transition-colors p-1.5 hover:bg-muted rounded-full'
							>
								<Linkedin className='h-4 w-4' />
							</Link>
							<Link
								href='https://twitter.com'
								target='_blank'
								className='hover:text-primary transition-colors p-1.5 hover:bg-muted rounded-full'
							>
								<Twitter className='h-4 w-4' />
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-2'>
						<h3 className='text-base font-semibold'>Tezkor Havolalar</h3>
						<ul className='space-y-1.5 text-sm text-muted-foreground'>
							<li>
								<Link
									href='/about'
									className='hover:text-primary transition-colors inline-flex items-center hover:translate-x-1 duration-200'
								>
									Biz haqimizda
								</Link>
							</li>
							<li>
								<Link
									href='/services'
									className='hover:text-primary transition-colors inline-flex items-center hover:translate-x-1 duration-200'
								>
									Xizmatlar
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='hover:text-primary transition-colors inline-flex items-center hover:translate-x-1 duration-200'
								>
									Bog'lanish
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className='space-y-2'>
						<h3 className='text-base font-semibold'>Bog'lanish</h3>
						<ul className='space-y-1.5 text-sm text-muted-foreground'>
							<li>
								<a
									href='tel:+821048387177'
									className='hover:text-primary transition-colors'
								>
									+82 10 4838 7177
								</a>
							</li>
							<li>
								<a
									href='mailto:info@flami.org'
									className='hover:text-primary transition-colors'
								>
									info@flami.org
								</a>
							</li>
							<li className='max-w-xs'>Janubiy Korea, Seoul</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-8 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground'>
					<div className='text-center md:text-left'>
						© {new Date().getFullYear()} FLAMI. Barcha huquqlar himoyalangan
					</div>
					<div className='flex items-center gap-1'>
						<Link
							href='https://www.linkedin.com/in/jakhon-yokubov/'
							target='_blank'
							className='hover:text-primary transition-colors flex items-center gap-1.5 group'
						>
							<Linkedin className='h-4 w-4 group-hover:scale-110 transition-transform' />
							<span className='font-bold underline underline-offset-4'>
								Jakhon Yokubov
							</span>
						</Link>{' '}
						tomonidan yaratilgan
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
