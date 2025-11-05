'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ProductDescriptionProps {
	description: string
	maxLines?: number
}

const BUTTON_TEXT = {
	readMore: "Ko'proq o'qish",
	readLess: "Ko'proq yig'ish",
} as const

const ProductDescription = ({
	description,
	maxLines = 6,
}: ProductDescriptionProps) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [needsReadMore, setNeedsReadMore] = useState(false)
	const textRef = useRef<HTMLParagraphElement>(null)

	const checkIfNeedsTruncation = useCallback(() => {
		const element = textRef.current
		if (!element) return

		// Store original inline styles to restore later
		const originalStyles = {
			display: element.style.display,
			webkitLineClamp: element.style.webkitLineClamp,
			webkitBoxOrient: element.style.webkitBoxOrient,
			overflow: element.style.overflow,
		}

		// Temporarily remove clamping to measure actual height
		element.style.display = 'block'
		element.style.webkitLineClamp = 'none'
		element.style.webkitBoxOrient = 'unset'
		element.style.overflow = 'visible'

		// Calculate dimensions
		const computedStyles = getComputedStyle(element)
		const lineHeight = parseFloat(computedStyles.lineHeight) || 0
		const fontSize = parseFloat(computedStyles.fontSize) || 16
		const actualLineHeight = lineHeight || fontSize * 1.5
		const maxHeight = actualLineHeight * maxLines
		const actualHeight = element.scrollHeight

		// Restore original styles
		element.style.display = originalStyles.display || ''
		element.style.webkitLineClamp = originalStyles.webkitLineClamp || ''
		element.style.webkitBoxOrient = originalStyles.webkitBoxOrient || ''
		element.style.overflow = originalStyles.overflow || ''

		// Update state if truncation is needed
		setNeedsReadMore(actualHeight > maxHeight)
	}, [maxLines])

	const toggleExpanded = useCallback(() => {
		setIsExpanded(prev => !prev)
	}, [])

	// Check if truncation is needed when description or maxLines change
	useEffect(() => {
		// Use requestAnimationFrame to ensure DOM is fully rendered
		const rafId = requestAnimationFrame(() => {
			checkIfNeedsTruncation()
		})

		return () => cancelAnimationFrame(rafId)
	}, [description, maxLines, checkIfNeedsTruncation])

	// Reset expanded state when description changes
	useEffect(() => {
		setIsExpanded(false)
	}, [description])

	const clampStyles =
		!isExpanded && needsReadMore
			? {
					display: '-webkit-box',
					WebkitLineClamp: maxLines,
					WebkitBoxOrient: 'vertical' as const,
					overflow: 'hidden',
			  }
			: undefined

	return (
		<div className='space-y-2'>
			<p
				ref={textRef}
				className={cn(
					'text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line transition-all duration-300'
				)}
				style={clampStyles}
			>
				{description}
			</p>

			{needsReadMore && (
				<Button
					variant='ghost'
					size='sm'
					onClick={toggleExpanded}
					className='text-primary hover:text-primary/80 p-0 h-auto font-medium'
					aria-expanded={isExpanded}
					aria-label={isExpanded ? BUTTON_TEXT.readLess : BUTTON_TEXT.readMore}
				>
					<span className='flex items-center gap-1'>
						{isExpanded ? (
							<>
								{BUTTON_TEXT.readLess}
								<ChevronUp className='size-4' aria-hidden='true' />
							</>
						) : (
							<>
								{BUTTON_TEXT.readMore}
								<ChevronDown className='size-4' aria-hidden='true' />
							</>
						)}
					</span>
				</Button>
			)}
		</div>
	)
}

export default ProductDescription
