'use client';
import React from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";

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

	const hoverStyle = {scale: 1.1}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'spring', stiffness: 700, damping: 20}

	return (
		<nav className="w-full container mx-auto h-full text-xl leading-7 font-semibold text-gray-500 antialiased flex items-center relative">
			<MobileNav />

			<MotionLink href="/projects" className={`hidden md:block ml-4 p-2.5 ${path === '/projects' ? 'text-red-500' : ''}`}
				whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
			>Projects</MotionLink>

			<MotionLink href="/blog" className={`hidden md:block ml-4 p-2.5 ${path === '/blog' ? 'text-red-500' : ''}`}
				whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
			>Blog</MotionLink>
			<MotionLink href="/notes" className={`hidden md:block ml-4 p-2.5 ${path === '/notes' ? 'text-red-500' : ''}`}
				whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
			>Notes</MotionLink>
			<MotionLink href="/contact" className={`hidden md:block ml-4 p-2.5 ${path === '/contact' ? 'text-red-500' : ''}`}
				whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
			>Contact</MotionLink>
		</nav>
	)
}

export default Navbar;
