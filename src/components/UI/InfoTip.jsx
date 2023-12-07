'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'

const info_icon = '/info.svg';

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function InfoTip() {
	const [tipVisible, setTipVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)
	const MotionComponent = motion(Component)
	const MotionImage = motion(Image)

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

	const handleMouseLeave = () => {
		setTimeout(() => {
			setTipVisible(false)
		}, 1000)
	}

  return (
		<div className="relative">
			<button 
				className="mt-1"
				onMouseLeave={handleMouseLeave}
				onClick={() => setTipVisible(!tipVisible)}
				>
				<MotionImage src={info_icon} alt="info icon" width={32} height={32} 
					initial={{ opacity: 0.8 }}
					animate={{ opacity: 0.8 }}
					whileHover={{ scale: 1.1, opacity: 1}} 
					whileTap={{ scale: 0.9 }}
					transition={transition}
				/>
			</button>
			<AnimatePresence>
				{ tipVisible &&
					<>
					<motion.div 
						className="absolute px-4 py-3 w-[200px] lg:top-[-64px] lg:left-[32px] lg:h-16 lg:w-[312px] bg-blue-600 text-white text-sm rounded-md shadow-md z-10"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{type: 'tween', duration: 0.3, ease: 'linear'}}
						>
						Click <span className="font-bold">Show filters</span> to expand. Click one or more filter tags to toggle the filters.
					</motion.div>
					</>
				}
			</AnimatePresence>
		</div>
	)
}
export default InfoTip;

