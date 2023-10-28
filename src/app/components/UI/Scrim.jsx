'use client';
import React, {useRef} from 'react';
import {motion} from 'framer-motion'

const scrimVariants = {
	closed: {
		opacity: 0,
	},
	open: {
		opacity: 1,
	}
}

function Scrim( {handleClick, zValue} ) {

  return (
		<motion.div 
			className={"md:hidden fixed top-[52px] left-0 w-full h-full scrim bg-black bg-opacity-10"}
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			onClick={handleClick} 
			style={{zIndex: `${zValue ?? 100}`}}>
		</motion.div>
  )
}
export default Scrim;

