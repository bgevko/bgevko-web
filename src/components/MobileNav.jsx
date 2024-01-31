'use client';
import React, { useState }from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { bouncyAnimation } from '@/lib/anim'

// Images
import hamburger_icon from '../../public/hamburger-icon.svg'
import hamburger_close_icon from '../../public/hamburger-close-icon.svg'

// Components
import Scrim from '@/ui/Scrim.jsx'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

const MobileNav = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	}

	const hoverStyle = {scale: 1.05, originX: 0, originY: 0}
	const tapStyle = {scale: 0.97, originX: 0, originY: 0}
	const transition = {type: 'tween', duration: 0.1}

	const linkStye = 'mb-4 py-4 px-8 hover:text-gray-600 hover:bg-gray-100'

	return (
	<>
			<MotionLink href="/" className="mr-auto py-2.5 text-lg leading-8 font-bold text-purple-500 hover:text-purple-600"
				whileHover={bouncyAnimation.hover}
				whileTap={bouncyAnimation.tap}
				transition={bouncyAnimation.transition}
				onClick={() => setIsMenuOpen(false)}
			>
				bGevko
			</MotionLink>

		{!isMenuOpen &&
			<motion.button 
				initial = {{scale: 0, opacity: 0}}
				animate = {{scale: 1, opacity: 1}}
				className="md:hidden p-2.5 flex items-center justify-center"
				onClick={toggleMenu}>
					<Image src={hamburger_icon} alt="Open mobile nav"/>
			</motion.button>
		}

		{isMenuOpen &&
			<motion.button
				initial = {{scale: 0, opacity: 0}}
				animate = {{scale: 1, opacity: 1}}
				className="md:hidden p-2.5 flex items-center justify-center"
				onClick={toggleMenu}>
					<Image src={hamburger_close_icon} alt="Close mobile nav" />
			</motion.button>
		}
		<AnimatePresence>
		{isMenuOpen &&
			<>
			<motion.nav className="md:hidden absolute top-[52px] left-0 right-0 -mx-4 py-8 text-sm leading-5 font-medium text-gray-500 flex flex-col bg-white shadow-md border z-10"
				initial={{x: '100%'}}
				animate={{x: 0}}
				exit={{x: '110%'}}
				transition={{type: 'spring', stiffness: 500, damping: 35, duration: 0.2}}
			>
				<MotionLink 
					href="/projects" 
					className={linkStye}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition} 
					onClick={() => setIsMenuOpen(false)}
				>Projects</MotionLink>

				<MotionLink 
					href="/blog" 
					className={linkStye}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
					onClick={() => setIsMenuOpen(false)}
				>Blog</MotionLink>

				<MotionLink 
					href="/notes" 
					className={linkStye}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
					onClick={() => setIsMenuOpen(false)}
				>Notes</MotionLink>

				<MotionLink 
					href="/contact" 
					className={linkStye}
					whileHover={hoverStyle} whileTap={tapStyle} transition={transition}
					onClick={() => setIsMenuOpen(false)}
				>Contact</MotionLink>
			</motion.nav>
			<Scrim handleClick={toggleMenu} zValue={1} />
			</>
		}
	</AnimatePresence>
	</>
	)
}

export default MobileNav;
