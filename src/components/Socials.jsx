import Link from 'next/link'
import Image from 'next/image'
import linkedin_icon from '../../public/linkedin-icon.svg'
import github_icon from '../../public/github-icon.svg'

const Socials = () => {
	const color = "border text-gray-600 hover:bg-gray-100 rounded-md"
	return (
		<nav className="min-w-min max-h-[40px] flex gap-2 justify-center lg:ml-auto">
			<Link className={`${color}`} href="https://www.linkedin.com/in/bogdan-gevko" target="_blank" rel="noopener noreferrer">
				<Image src={linkedin_icon} alt="LinkedIn" />
			</Link>
			<Link className={`${color}`}href="https://www.github.com/bgevko" target="_blank" rel="noopener noreferrer">
				<Image src={github_icon} alt="Github" />
			</Link>
		</nav>
	)
}

export default Socials;
