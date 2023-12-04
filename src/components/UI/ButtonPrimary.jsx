'use client';
import React from 'react';
import Link from 'next/link'
import {motion} from 'framer-motion'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function ButtonPrimary( {title, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

  return (
		<MotionLink className="px-4 py-2 w-max rounded-md bg-red-400 text-white text-xl leading-7 font-medium"
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			href={href}
		>
			{title}
		</MotionLink>
  )
}
export default ButtonPrimary;

