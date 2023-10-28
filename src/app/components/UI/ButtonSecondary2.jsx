'use client';
import React from 'react';
import Link from 'next/link'
import {motion} from 'framer-motion'

function ButtonSecondary2( {children, className}) {
	const combinedClass = "px-4 py-2 rounded-md bg-cyan-500 text-white text-base leading-6 font-semibold " + className
	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

  return (
		<motion.button className={combinedClass}
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
		>
			{children}
		</motion.button>
  )
}
export default ButtonSecondary2;

