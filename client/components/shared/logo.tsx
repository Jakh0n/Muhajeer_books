import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function Logo() {
	const { resolvedTheme } = useTheme()
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		setIsDark(resolvedTheme === 'dark')
	}, [resolvedTheme])

	return (
		<Link href={'/'} className='flex items-center gap-2'>
			<Image
				src={'/muhajeer_logo.jpg'}
				alt='logo'
				width={50}
				height={50}
				className='rounded-full object-cover'
			/>
			<span className='text-xl hidden font-montserrat md:block font-bold'>
				Muhajeer Books
			</span>
		</Link>
	)
}

export default Logo
