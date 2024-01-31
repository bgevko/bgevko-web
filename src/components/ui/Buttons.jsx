'use client';
import React from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion'
import { bouncyAnimation } from '@/lib/anim'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

export const btnStyle = "px-4 py-2 max-h-[36px] max-w-max rounded-md text-sm font-medium"
const hoverStyle = bouncyAnimation.hover
const tapStyle = bouncyAnimation.tap
const transition = bouncyAnimation.transition

export function LinkButtonRed( {children, className, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)
	const color = "text-white bg-red-400"
	const combinedClass = `${btnStyle} ${color} ${className}`

	return (
		<MotionLink className={combinedClass}
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			href={href}
		>
			{children}
		</MotionLink>
  )
}

export function LinkButtonCyan( {children, className, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)
	const color = "text-white bg-cyan-500"
	const combinedClass = `${btnStyle} ${color} ${className}`

  return (
		<MotionLink className={combinedClass}
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			href={href}
		>
			{children}
		</MotionLink>
  )
}

export function ButtonRed( {children, className, onClick} ) {
	const color = "bg-red-400"
	const combinedClass = `${btnStyle} ${color} ${className}`

  return (
		<motion.button className={combinedClass}
			whileHover={hoverStyle}
			whileTap={tapStyle}
			transition={transition}
			onClick={onClick}
		>
			{children}
		</motion.button>
  )
}

export function ButtonCyan( {children, className, onClick, disabled=false}) {
	const color = "text-white bg-cyan-500" + (disabled ? " opacity-50 cursor-not-allowed" : "")
	const combinedClass = `${btnStyle} ${color} ${className}`

  return (
		<motion.button className={combinedClass}
			whileHover={!disabled && hoverStyle}
			whileTap={!disabled && tapStyle}
			transition={!disabled && transition}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
  )
}

export function LinkButtonGhost( {children, className, href} ) {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)
	const color = "text-gray-600 hover:bg-gray-100"
	const combinedClass = `${btnStyle} ${color} ${className}`

	return (
		<MotionLink className={combinedClass} href={href}
			whileTap={tapStyle}
			>
			{children}
		</MotionLink>
	)
}

export function ButtonOutline ({children, className, onClick}) {
	const color = "border text-gray-600 hover:bg-gray-100"
	const combinedClass = `${btnStyle} ${color} ${className}`

	return (
		<motion.button className={combinedClass}
			// whileHover={hoverStyle}
			whileTap={tapStyle}
			// transition={transition}
			onClick={onClick}
		>
			{children}
		</motion.button>
	)
}

