import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Socials from '@/components/Socials'
import { ButtonOutline, LinkButtonGhost } from '@/components/UI/Buttons'
import Lucide from '@/components/LucideIcons'

const profile_photo = '/profile-photo.webp'

const AuthorInfo = ({ active, onClick, text }) => {
	const [linkCopied, setLinkCopied] = useState(false)
	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href)
		setLinkCopied(true)

		setTimeout(() => {
			setLinkCopied(false)
		}, 10000)
	}
    return (
		<div className="flex w-full max-w-prose flex-col sm:flex-row gap-4 border-t pt-6">
			<span className="flex gap-4">
				<Image src={profile_photo} alt="Bogdan Gevko" width={56} height={56}/>
				<div className="flex flex-col">
					<p className="text-base font-medium text-gray-900">Bogdan Gevko</p>
					<p className="text-sm font-medium text-gray-500">Computer Science Student</p>
				</div>
			</span>
			<span className="flex gap-2 sm:ml-auto">
				<ButtonOutline className="min-w-[121px] h-[40px] max-h-[40px] flex items-center gap-1"
					onClick={handleCopyLink}
				>
					{!linkCopied ? <Lucide name="Link" size={16} /> : <Lucide name="Check" size={16} />}
					{!linkCopied ? 'Copy Link' : 'Copied!'}
				</ButtonOutline>
				<Socials />
			</span>
		</div>
    );
}

export default AuthorInfo;
