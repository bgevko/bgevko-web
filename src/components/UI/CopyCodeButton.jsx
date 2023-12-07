'use client'
import React, { useState, useRef } from 'react'
import Lucide from '@/components/LucideIcons'
import { ButtonOutline } from '@/components/UI/Buttons'
import { motion } from 'framer-motion'
import { bouncyAnimation } from '@/lib/anim'


const CopyCodeButton = ({ code, className }) => {
	const [copied, setCopied] = useState(false)
	const timeoutRef = useRef(null)

	const hoverStyle = bouncyAnimation.hover
	const tapStyle = bouncyAnimation.tap
	const transition = bouncyAnimation.transition

	const copyCodeToClipboard = () => {
		navigator.clipboard.writeText(code)
		setCopied(true)

		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	const idle = "bg-opacity-40 opacity-40"
	const btnStyle = "border text-gray-600 rounded-md transition-all"
	const color = `${idle} hover:bg-gray-100 hover:bg-opacity-100 hover:opacity-100`

	return(
		<motion.button className={`flex justify-center items-center w-[35px] h-[35px] ${color} ${btnStyle} ${className}`} 
			onClick={copyCodeToClipboard}
			// whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
		>
			{!copied ? <Lucide name="Copy" size={16} /> : <Lucide name="Check" size={16} />}
		</motion.button>
	)
}

export default CopyCodeButton


