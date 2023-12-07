import Image from 'next/image'
import StyledLink from '@/components/UI/StyledLink'
import ProfilePhoto from '@/components/UI/ProfilePhoto'
import ArticleCard from '@/components/UI/ArticleCard'
import ProjectCard from '@/components/UI/ArticleCard2'
import Socials from '@/components/Socials'
import { getPostsMeta } from '@/lib/posts'

import { LinkButtonRed, LinkButtonCyan } from '@/components/UI/Buttons'

export const metadata = {
	title: 'Bogdan Gevko',
	description: 'Bogdan Gevko, software developer and computer science student at Oregon State University.',
}

async function getMetadata(type) {
	try {
		const posts = await getPostsMeta(type)
		if (!posts) return []
		return posts.filter(post => post.featured)
	} catch (err) {
		console.log("getMetadata:error: ", err)
		return []
	}
}

export default async function Home() {
	const projectsData = await getMetadata('projects')

	const projectCards = projectsData.map((post, index) => {
		return (
			<ProjectCard
				key={index}
				date={post.date}
				title={post.title}
				content={post.description}
				tags={post.tags}
				href={post.href}
				image={post.image}
			/>
		)
	})

  return (
    <main className="py-20 flex w-full mx-auto flex-col lg:py-24">
			<header className="pb-24 mx-auto w-full max-w-5xl flex flex-col justify-between items-center lg:items-top lg:flex-row">
				<ProfilePhoto />
				<div className="max-w-prose flex flex-col items-center lg:items-start">
					<h1 className="mb-8 font-bold text-5xl text-gray-700 lg:mb-6 lg:text-7xl">I&apos;m <span className="text-cyan-500">Bogdan</span></h1>
					<p className="mb-8 text-center text-base leading-7 font-normal text-gray-500 sm:text-lg lg:text-left lg:mb-6"
						>I&apos;m a full-time Computer Science student at Oregon State University. Welcome to my digital workshop, where I fine-tune my web development skills and catalog my broader technical pursuits.
					</p>
					<span className="w-full flex flex-col items-center lg:flex-row gap-4">
						<LinkButtonRed href="/contact">Get in touch</LinkButtonRed>
						<Socials />
					</span>
				</div>
			</header>
			<section className="px-4 py-24 w-screen flex flex-col border-t -mx-4">
				<header className="mb-4 w-full max-w-prose lg:max-w-5xl mx-auto flex justify-between items-center">
					<p className="text-base leading-8 font-medium text-gray-400">Featured Projects</p>
					<LinkButtonCyan href="/blog">View all</LinkButtonCyan>
				</header>
				<article className="w-full mx-auto flex flex-col max-w-prose lg:max-w-5xl">
					{projectCards}
				</article>
			</section>
		</main>
  )
}
