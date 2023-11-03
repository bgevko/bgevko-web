'use client';
import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonTag from './ButtonTag.jsx';
import ButtonPrimary from './ButtonPrimary.jsx';
import Image from 'next/image';
const info_icon = '/info.svg';

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function SectionTags({className="", tags, tagSet, tagsVisible, handleHideTags, handleShowTags, handleClearTags, handleTagClick}) {
	const MotionComponent = motion(Component)
	const MotionImage = motion(Image)

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

	const combinedClass = `mt-8 w-full mx-auto max-w-prose lg:max-w-5xl flex flex-col gap-2 ${className ? className : ''}`
	return (
		<header className={combinedClass}>
		{/* Show button and Clear button */} 
		<div className="w-full h-11 flex flex-row border-b justify-between items-center">
			{/* Show button */}
			<div className="flex w-full max-w-[135px] flex-row justify-between gap-2 relative">
				<button className="text-base text-blue-500 hover:text-blue-700 font-semibold"
					onClick={() => tagsVisible ? handleHideTags() : handleShowTags()}
				>
					{tagsVisible ? 'Hide filters' : 'Show filters'} 
				</button>
				<button>
					<MotionImage src={info_icon} alt="info icon" width={32} height={32} 
						initial={{ opacity: 0.8 }}
						animate={{ opacity: 0.8 }}
						whileHover={{ scale: 1.1, opacity: 1}} 
						whileTap={{ scale: 0.9 }}
						transition={transition}
					/>
				</button>
			</div>

			{/* Clear button */}
			<AnimatePresence>
			{ tagSet.size > 0 &&
				<motion.button className="py-2 px-4 bg-red-400 max-h-8 rounded-md ml-auto text-base flex items-center justify-center leading-6 font-semibold text-white"
					onClick={() => handleClearTags()}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					whileHover={{ hoverStyle }} whileTap={{ tapStyle }}
					transition={transition}
				>
					Clear
				</motion.button>
			}
			</AnimatePresence>
		</div>

		{/* Tags */}
		<AnimatePresence>
			{ tagsVisible &&
			<motion.div className="w-full pb-1 flex"
				initial={{ height: 0, opacity: 2 }}
				animate={{ height: 'auto', opacity: 2 }}
				exit={{ height: 0, opacity: 0 }}
				transition={{type: 'tween', duration: 0.1, ease: 'linear'}}
			>
				<motion.div className="-ml-2 w-full flex flex-wrap gap-1 lg:gap-2">
					{tags.map((tag, index) => (
						<ButtonTag key={index} active={tagSet.has(tag)} text={tag} onClick={() => handleTagClick(tag)} />
					))}
				</motion.div>
			</motion.div>
			}
		</AnimatePresence>

		</header>
	)
}

export default SectionTags;
