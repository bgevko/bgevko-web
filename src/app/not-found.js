'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'

// Components
import ButtonSecondary from './components/UI/ButtonSecondary'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

const not_found = '/layout/not-found.svg'
const back_arrow = '/back-arrow.svg'
 
export default function NotFound() {
	const MotionComponent = motion(Component)
	const MotionLink= motion(Link)

	const hoverStyle = {scale: 1.1, boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.05)'}
	const tapStyle = {scale: 0.9}
	const transition = {type: 'tween', duration: 0.1}

  return (
    <div className="w-full h-[100dvh] flex flex-col justify-center items-center">
      <h2 className="text-4xl lg:text-5xl leading-none font-bold text-gray-900 text-center">
				<span className="text-red-400" >Oops.</span> That Page doesn&apos;t exist.
			</h2>
			<Image src={not_found} alt="Not Found" width={650} height={463} />
			<nav className="flex justify-center items-center gap-4">
				<MotionLink href="/" className="px-4 py-2 gap-4 rounded-md border flex" whileHover={hoverStyle} whileTap={tapStyle} transition={transition} >
					<Image src={back_arrow} alt="Back to Home" width={24} height={24} />Go back
				</MotionLink>
				<ButtonSecondary href="/" title="Take me home" />
			</nav>
    </div>
  )
}
