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
				src={'/logo_flami.svg'}
				alt='logo'
				width={150}
				height={150}
				className={isDark ? 'dark:invert' : ''}
			/>
		</Link>
	)
}

export default Logo
