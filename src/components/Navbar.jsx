'use client';
import React from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import { bouncyAnimation } from '@/lib/anim'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

// Hamburger menu
import MobileNav from './MobileNav.jsx';

const Navbar = () => {
	const path = usePathname();

	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const hoverStyle = bouncyAnimation.hover
	const tapStyle = bouncyAnimation.tap
	const transition = bouncyAnimation.transition

	const linkStyle = 'hidden md:block ml-4 p-2.5 hover:text-gray-600 antialiased hover:text-gray-600'

	return (
		<nav className="w-screen box-content self-center container h-full text-sm leading-7 font-medium text-gray-500 antialiased flex items-center">
			<div className="relative flex w-full mx-auto max-w-5xl">
			<MobileNav />
				<MotionLink href="/projects" className={`${linkStyle} ${path === '/projects' ? 'text-red-500' : ''}`}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
				>Projects</MotionLink>

				<MotionLink href="/blog" className={`${linkStyle} ${path === '/blog' ? 'text-red-500' : ''}`}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
				>Blog</MotionLink>
				<MotionLink href="/notes" className={`${linkStyle} ${path === '/notes' ? 'text-red-500' : ''}`}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
				>Notes</MotionLink>
				<MotionLink href="/contact" className={`${linkStyle} ${path === '/contact' ? 'text-red-500' : ''}`}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
				>Contact</MotionLink>
			</div>
		</nav>
	)
}

export default Navbar;
