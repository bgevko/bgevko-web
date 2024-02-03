import Image from 'next/image'
import StyledLink from '@/ui/StyledLink'
import ProfilePhoto from '@/ui/ProfilePhoto'
import ArticleCard from '@/ui/ArticleCard'
import ProjectCard from '@/ui/ArticleCard2'
import ActivityCard from '@/components/ActivityCard'
import Socials from '@/components/Socials'
import { getPostsMeta } from '@/lib/posts'

import { LinkButtonRed, LinkButtonCyan } from '@/ui/Buttons'

export const metadata = {
	title: 'Bogdan Gevko',
	description: 'Bogdan Gevko, software developer and computer science student at Oregon State University.',
}

export const revalidate = 60

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
			<section className="px-4 py-24 w-full flex flex-col border-t">
				<header className="mb-4 w-full max-w-prose lg:max-w-5xl mx-auto flex justify-between items-center">
					<p className="text-base leading-8 text-gray-500">Featured Projects</p>
					<LinkButtonCyan href="/projects">View all</LinkButtonCyan>
				</header>
				<article className="w-full mx-auto flex flex-col max-w-prose lg:max-w-5xl">
					{projectCards}
				</article>
			</section>
			{/* <section className="px-4 py-16 w-full gap-4 lg:max-w-5xl sm:mx-auto sm:rounded-lg flex flex-col items-center bg-gray-100"> */}
			<section className="-mx-4 px-4 py-16 gap-4 flex flex-col items-center border-t border-b border-slate-200">
				<p className="text-base text-gray-500">Recent Activity</p>
				<div className="w-full flex flex-col gap-4">
					<ActivityCard
						date="03 Feb"
						description="CLI Tool for Boilerplate Fetching"
						href="/projects/boilerplate-tool"
						tagType="update"
					/>
					<ActivityCard
						date="03 Feb"
						description="Recent activity is now shown on the home page."
						tagType="feature"
					/>
					<ActivityCard
						date="02 Feb"
						description="Self-hosting Plausible Analytics with Next.js 13+"
						href="/blog/self-hosting-plausible"
						tagType="article"
					/>
				</div>
				<button className="px-4 py-2 mt-4 text-sm text-slate-400 border border-slate-400 rounded-md 
													 hover:bg-slate-50 hover:text-slate-500 hover:border-slate-500 transition-colors duration-100">
					Show More
				</button>
			</section>
		</main>
  )
}
