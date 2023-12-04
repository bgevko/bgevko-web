'use client';
import React, {useState} from 'react';
import Image from 'next/image'
import {motion} from 'framer-motion'

const profile_photo = '/profile-photo.webp'
const profile_photo_no_jaw = '/profile-photo-no-jaw.webp'
const jaw = '/jaw.webp'

// eslint-disable-next-line react/display-name
const Component = React.forwardRef((props, ref) => (
   <div ref={ref} />
))

function ProfilePhoto() {
	const MotionComponent = motion(Component)
	const MotionImage = motion(Image)
	const [isHovered, setIsHovered] = useState(false)
	const [isChomping, setIsChomping] = useState(false)

	const handleClick = () => {
		setIsChomping(true)
		setTimeout(() => {
			setIsChomping(false)
		}, 400)
	}

  return (
	<>
		{/* Chomp effect on hover for bigger screens */}
		<div className="hidden ml-16 flex order-last w-[248px] lg:block relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
			{ isHovered &&
				<>
				<Image className="absolute top-0 left-0" src={profile_photo_no_jaw} alt="Bogdan Gevko" width={1000} height={1021}/>
				<MotionImage src={jaw} alt="Bogdan Gevko" className="absolute top-0 left-0 w-full" width={1000} height={1021}
					animate={isHovered ? {y: 10} : {y: 0}}
					transition={{duration: 0.1, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}}
				/>
				</>
			}
			<Image className="w-full" src={profile_photo} alt="Bogdan Gevko" width={1000} height={1021}/>
		</div>

		{/* Chomp effect on click for smaller screens */} 
		<div className="flex w-[201px] mb-8 lg:hidden relative" onClick={handleClick}>
			{ isChomping &&
				<>
				<Image className="w-full absolute top-0 left-0" src={profile_photo_no_jaw} alt="Bogdan Gevko" width={1000} height={1021}/>
				<MotionImage src={jaw} alt="Bogdan Gevko" className="absolute top-0 left-0 w-full" width={1000} height={1021}
					animate={isChomping ? {y: 10} : {y: 0}}
					transition={{duration: 0.1, repeat: Infinity, repeatType: 'reverse', ease: 'linear'}}
				/>
				</>
			}

				<Image className="w-full" src={profile_photo} alt="Bogdan Gevko" width={1000} height={1021}/>
		</div>
	</>
  )
}
export default ProfilePhoto;

