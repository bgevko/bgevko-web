'use client';
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import StyledLink from './StyledLink'
import StyledVector from './StyledVector'
import { motion } from 'framer-motion'

// Images
const placeholder = '/blog/card/placeholder.png'

// Components
import StyledTag from './StyledTag'

function ProjectCard( { article } ) {
	let cardImage;
	if (article.image) {
		cardImage = 
		<div className={`relative w-full max-w-[240px] h-[223px] hidden lg:block`}>
			<Image 
				className="rounded-md"
				src={article.image} 
				alt="Article cover preview" 
				fill
				sizes="100vw"
				style={{objectFit: 'cover'}}
			/>
		</div>
	} else {
		cardImage = <StyledVector className="hidden w-full h-full min-w-[240px] max-w-[240px] max-h-[240px] lg:flex " colorIndex={0} />
	}

	return (
	<>
		<motion.div className="pb-4 mb-16 flex w-full border-b lg:h-60 relative"
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }} 
			exit={{ opacity: 0, y: 100 }}
			transition={{ type: "spring", stiffness: 100, damping: 20 }}
		>
			{/* Image */}
			{cardImage}
			{/* Content */}
			<div className="lg:pl-4 flex flex-col w-full h-full">
				{/* Tags and Date */}
				<div className="mb-2 w-full flex flex-row justify-between items-top">
					{/* Tags */}
					<div className="mb-2 flex w-full flex-row gap-2 flex-wrap">
						{article.tags.map((tag, index) => (
							<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
						))}
					</div>
					{/* Date */}
					<p className="min-w-max ml-4 text-sm leading-5 font-normal text-gray-400">{article.date}</p>
				</div>
				{/* Title and text*/}
				<div className="flex flex-col h-full lg:max-h-[150px] relative">
					<Link href={article.href} className="mb-2 max-w-max text-2xl leading-8 font-bold text-gray-900 hover:underline">{article.title}</Link>
					<p className="text-base leading-6 font-normal text-gray-500 overflow-hidden">{article.description}</p>
					<div className="hidden absolute bottom-0 w-full h-8 bg-gradient-to-t sm:from-white to-transparent lg:block"></div>
				</div>
				{/* Link */}
				<StyledLink className="ml-auto mt-auto" href={article.href}>View Full</StyledLink>
			</div>
		</motion.div>
	</>
	)
}

export default ProjectCard;

