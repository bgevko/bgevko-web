'use client';
import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ButtonTag from './ButtonTag.jsx';
import InfoTip from './InfoTip.jsx';

import { ButtonCyan } from '@/components/UI/Buttons.jsx';

function SectionTags({className="", tags, tagSet, tagsVisible, handleHideTags, handleShowTags, handleClearTags, handleTagClick}) {

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

	const combinedClass = `mt-8 w-full mx-auto max-w-prose lg:max-w-5xl flex flex-col gap-2 ${className ? className : ''}`
	return (
		<header className={combinedClass}>
		{/* Show button and Clear button */} 
		<div className="w-full h-11 flex flex-row border-b justify-between items-center">
			{/* Show button */}
			<div className="flex w-full max-w-[120px] flex-row justify-between gap-2 relative">
				<button className="text-sm text-blue-500 hover:text-blue-700 font-medium"
					onClick={() => tagsVisible ? handleHideTags() : handleShowTags()}
				>
					{tagsVisible ? 'Hide filters' : 'Show filters'} 
				</button>
				<InfoTip />
			</div>

			{/* Clear button */}
			<AnimatePresence>
			{ tagSet.size > 0 &&
				<motion.button className="py-2 px-4 bg-red-400 max-h-8 rounded-md ml-auto text-sm flex items-center justify-center font-medium text-white"
					onClick={() => handleClearTags()}
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0, opacity: 0 }}
					whileHover={hoverStyle} whileTap={tapStyle}
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
