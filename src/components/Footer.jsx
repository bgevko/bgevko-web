import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

// Images
import linkedin_icon from '../../public/linkedin-icon.svg'
import github_icon from '../../public/github-icon.svg'

const Footer = () => {
	return (
		<footer className="px-8 py-12 mt-auto w-full flex flex-col justify-center items-center">
			<nav className="mb-6 w-full flex flex justify-center">
				<Link className="mr-4" href="https://www.linkedin.com/in/bogdan-gevko" target="_blank" rel="noopener noreferrer">
					<Image src={linkedin_icon} alt="LinkedIn" />
				</Link>
				<Link href="https://www.github.com/bgevko" target="_blank" rel="noopener noreferrer">
					<Image src={github_icon} alt="Github" />
				</Link>

			</nav>
			<p className="text-sm leading-5 text-gray-500">© 2023 Bogdan Gevko</p>
		</footer>

	)
}

export default Footer;
