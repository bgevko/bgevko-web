import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

// Images
import nextjs_icon from '../../public/nextjs-icon.svg'
import react_icon from '../../public/react-icon.svg'
import tailwind_icon from '../../public/tailwind-icon.svg'
import mdx_icon from '../../public/mdx-icon.svg'

const Footer = () => {
	const iconStyle = "flex flex-col justify-center items-center text-gray-500"
	return (
		<footer className="px-8 py-12 mx-auto mt-auto w-full max-w-5xl flex flex-col justify-center items-center">
			<p className="mb-4 text-sm text-gray-500">Powered by</p>
			<span className="gap-8 flex flex-wrap justify-center items-center">
				<div className={iconStyle}>
					<Image src={nextjs_icon} alt="Next.js"/>
					<p className="text-xs">Next.js</p>
				</div>
				<div className={iconStyle}>
					<Image src={react_icon} alt="React"/>
					<p className="text-xs">React</p>
				</div>
				<div className={iconStyle}>
					<Image src={tailwind_icon} alt="Tailwind CSS"/>
					<p className="text-xs">Tailwind</p>
				</div>
				<div className={iconStyle}>
					<Image src={mdx_icon} alt="MDX"/>
					<p className="text-xs">MDX</p>
				</div>
			</span>
		</footer>

	)
}

export default Footer;
