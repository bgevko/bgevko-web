'use client';
import React from 'react';
import Link from 'next/link'
import {motion} from 'framer-motion'
import { bouncyAnimation } from '@/lib/anim'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function LinkPrimary( {title, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const hoverStyle = bouncyAnimation.hover
	const tapStyle = bouncyAnimation.tap
	const transition = bouncyAnimation.transition

  return (
		<MotionLink 
			className="px-4 py-2 w-max rounded-md bg-red-400 text-white text-sm font-medium"
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			href={href}
		>
			{title}
		</MotionLink>
  )
}
export default LinkPrimary;

