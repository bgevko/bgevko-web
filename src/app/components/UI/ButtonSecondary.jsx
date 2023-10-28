'use client';
import React from 'react';
import Link from 'next/link'
import {motion} from 'framer-motion'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function ButtonSecondary( {title, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

  return (
		<MotionLink className="px-4 py-2 w-max rounded-md bg-cyan-500 text-white text-base leading-6 font-semibold"
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			href={href}
		>
			{title}
		</MotionLink>
  )
}
export default ButtonSecondary;

