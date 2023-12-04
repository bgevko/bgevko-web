import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import StyledLink from './StyledLink'
import StyledVector from './StyledVector'

// Images
const placeholder = '/blog/card/placeholder.png'

// Components
import StyledTag from './StyledTag'
import StyledTag2 from './StyledTag2'

function ArticleCard( {date, title, content, tags, href } ) {
	return (
	<>
		<div className="hidden flex flex-col w-full max-w-xs lg:block ">
			<StyledVector colorIndex={Math.floor(Math.random() * 10000)} />
			<div className="p-6 h-80 w-full flex flex-col items-center bg-white">

				{/* Title and Tags */}
				<div className="w-full mb-4 flex justify-between items-baseline">
					<p className="min-w-max mr-2 text-sm leading-5 font-normal text-gray-400">{date}</p>
					<div className="flex justify-end items-center flex-wrap gap-1">
						{ tags.map((tag, index) => (
								<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
							))
						}
					</div>
				</div>

				{/* Content */}
				<div className="w-full h-full max-h-[200px] flex flex-col overflow-hidden relative">
					<Link href={href} className="text-2xl mb-4 max-w-max leading-8 font-bold text-gray-900 hover:underline">{title}</Link>
					<p className="text-base leading-6 font-normal gext-gray-500">{content}</p>
					<div className="hidden absolute bottom-0 w-full h-16 bg-gradient-to-t sm:from-white to-transparent lg:block"></div>
				</div>

				{/* Read More */}
				<StyledLink className="ml-auto" href={href}>View Article</StyledLink>
			</div>
		</div>

	<div className="p-6 mb-2 w-full flex flex-col bg-white lg:hidden shadow-lg">
		{/* Date and Tags */}
		<div className="flex mb-4 justify-between items-baseline">
			<p className="min-w-max mr-2 text-sm leading-5 font-normal text-gray-400">{date}</p>
			<div className="flex justify-end items-center flex-wrap gap-1">
			{ tags.map((tag, index) => (
					<StyledTag2 key={index}>{tag}</StyledTag2>
				))
			}
			</div>
		</div>

		{/* Content */}
		<div className="mb-2 w-full h-full h-48 sm:h-auto flex flex-col overflow-hidden relative">
			<Link href={href} className="text-2xl mb-4 max-w-max leading-8 font-bold text-gray-900 hover:underline">{title}</Link>
			<p className="text-base leading-6 font-normal gext-gray-500">{content}</p>
		</div>

		{/* Read More */}
		<StyledLink className="ml-auto" href={href}>View Article</StyledLink>
	</div>
	</>
	)
}

export default ArticleCard;

