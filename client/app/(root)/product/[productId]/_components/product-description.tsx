'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useMemo, useState } from 'react'

interface ProductDescriptionProps {
	description: string
	maxLines?: number
}

const BUTTON_TEXT = {
	readMore: "Ko'proq o'qish",
	readLess: "Ko'proq yig'ish",
} as const

// Estimate: average 50-60 characters per line for mobile, 80-100 for desktop
// Using a conservative estimate that works for both
const ESTIMATED_CHARS_PER_LINE = 70

const ProductDescription = ({
	description,
	maxLines = 6,
}: ProductDescriptionProps) => {
	const [isExpanded, setIsExpanded] = useState(false)

	// Simple character-based check - much more reliable than DOM measurement
	const characterThreshold = useMemo(() => {
		return ESTIMATED_CHARS_PER_LINE * maxLines
	}, [maxLines])

	const needsTruncation = description.length > characterThreshold

	const toggleExpanded = () => {
		setIsExpanded(prev => !prev)
	}

	return (
		<div className='space-y-2'>
			<p
				className={cn(
					'text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line transition-all duration-300'
				)}
				style={
					!isExpanded && needsTruncation
						? {
								display: '-webkit-box',
								WebkitLineClamp: maxLines,
								WebkitBoxOrient: 'vertical' as const,
								overflow: 'hidden',
						  }
						: undefined
				}
			>
				{description}
			</p>

			{needsTruncation && (
				<Button
					variant='ghost'
					size='sm'
					onClick={toggleExpanded}
					className='text-primary hover:text-primary/80 p-0 h-auto font-medium transition-colors'
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
