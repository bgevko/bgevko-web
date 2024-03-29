'use client'
import Lucide from '@/components/LucideIcons'
import StyledTag from '@/ui/StyledTag2'
import { LinkButtonGhost } from '@/ui/Buttons'
import AuthorInfo from '@/ui/AuthorInfo'

export default function Note( {meta, content } ) {
	const tags = meta.tags || []

	let itemType;
	if (meta.backlink === '/blog') {
		itemType = 'posts'
	} else if (meta.backlink === '/projects') {
		itemType = 'projects'
	} else if (meta.backlink === '/notes') {
		itemType = 'notes'
	}
	const dateInfo = meta.dateUpdated ? `Updated ${meta.dateUpdated}` : `Published ${meta.date}`
	return (
			<div className="flex flex-col w-full max-w-prose justify-center">
				<section className="w-full w-full flex flex-col items-center mb-16">
					<header className="flex w-full pt-8 pb-4 mb-8 flex-col gap-4">
						<p className="text-sm min-w-max max-w-prose text-gray-400">{dateInfo}</p>
						<h1 className="text-5xl font-bold text-gray-900" style={{ textWrap: 'balance' }}> {meta.title} </h1>
						<p className="text-xl text-gray-500 border-b pb-2 mb-1">{meta.description} </p>
						<span className="flex gap-1 flex-wrap">
							{ tags.map((tag, index) => (
									<StyledTag key={index} colorIndex={index}>{tag}</StyledTag>
								))
							}
						</span>
					</header>
					<article className="w-full mb-16 max-w-prose flex flex-col">
						{content}
					</article>
					<AuthorInfo />
				</section>
				<LinkButtonGhost
					className="self-center flex items-center gap-1"
					href={meta.backlink}>
					<Lucide
						name="ChevronLeft"
						size={16}
					/>
						See all {itemType}
				</LinkButtonGhost>
			</div>
	);
}
