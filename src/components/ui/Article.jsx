'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Components
import StyledTag from '@/ui/StyledTag'
import AuthorInfo from '@/ui/AuthorInfo'
import { ButtonOutline, LinkButtonGhost } from '@/ui/Buttons'
import Lucide from '@/components/LucideIcons'

export default function Article( {meta, content} ) {
	const [linkCopied, setLinkCopied] = useState(false)
	const [coverLoading, setCoverLoading] = useState(false)
	const [articleImageLoading, setArticleImageLoading] = useState(false)

	// Handle undefined behavior
	const coverImage = meta.image || null
	const tags = meta.tags || []

	// Common Styles
	const headerStyle = "mb-4 mt-16 text-3xl font-semibold text-gray-900"
	const pStyle = "mb-4 text-lg text-gray-700"

	// Handle dynamic back link
	let itemType;
	if (meta.backlink === '/blog') {
		itemType = 'posts'
	} else if (meta.backlink === '/projects') {
		itemType = 'projects'
	} else if (meta.backlink === '/notes') {
		itemType = 'notes'
	}

	// Copy article link to clipboard
	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href)
		setLinkCopied(true)

		setTimeout(() => {
			setLinkCopied(false)
		}, 10000)
	}

	// If no updated date, the p will say "Published" and will use meta.date, otherwise, it will say "Updated" and use meta.dateUpdated
	const dateInfo = meta.dateUpdated ? `Updated ${meta.dateUpdated}` : `Published ${meta.date}`
	const draftMessage = meta.draft === 1 ? (<StyledTag colorIndex={3} className="mb-8">DRAFT</StyledTag>) : null

  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			<section className="w-full flex flex-col items-center mb-16">
				<header className={`flex box-content py-8 mb-8 md:px-8 lg:py-16 lg:mb-16 w-full flex-col items-center ${!coverImage && 'border-b'}`}>
					<p className="mb-8 text-sm max-w-prose text-gray-400">{dateInfo}</p>
					{draftMessage}
					<h1 className="mb-8 text-3xl md:text-5xl max-w-prose font-bold text-center text-gray-900" style={{ textWrap: 'balance' }}> {meta.title} </h1>
					<p className="mb-8 text-base md:text-lg max-w-prose text-gray-500 text-center" style={{ textWrap: 'balance' }}> {meta.description} </p>
					<span className="flex max-w-prose w-full gap-2 flex-wrap justify-center">
						{ tags.map((tag, index) => (
								<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
							))
						}
					</span>

					{ coverImage &&
					<>
						<div className={`mt-8 relative w-full max-w-4xl h-[320px] md:h-[480px] ${coverLoading ? 'hidden' : ''}`}>
							<Image src={coverImage}
								className="rounded-lg"
								alt="Article hero image" 
								fill
								sizes="100vw"
								style={{ objectFit: 'cover' }}
								priority
								onLoad={() => setCoverLoading(false)}
							/>
						</div>
						{ coverLoading &&
							// Loading animation
							<motion.div className="mb-8 relative w-full h-[320px] md:h-[480px] lg:h-[640px] bg-gray-300 flex justify-center items-center"
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							></motion.div>
						}
					</>
					}
				</header>
				<article className="mb-16 w-full max-w-prose flex flex-col">
					{content}
				</article>
				<AuthorInfo />
			</section>
			<LinkButtonGhost
				className="self-center flex items-center gap-1"
				href={meta.backlink}>
				<Lucide
					name="ChevronLeft"
					size={16}
				/>
					See all {itemType}
			</LinkButtonGhost>
		</main>
	)
}

// For testing purposes only
function simulatedRequest(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const imageUrl = 'https://images.unsplash.com/photo-1698966378323-51d7982dfd96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1Mjk2OTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1MjA2NDR8&ixlib=rb-4.0.3&q=85'; 
      resolve(imageUrl);
    }, timeout); 
  });
}
