import Image from 'next/image'
import StyledLink from '@/components/UI/StyledLink'
import ButtonPrimary from '@/components/UI/ButtonPrimary'
import ButtonSecondary from '@/components/UI/ButtonSecondary'
import ProfilePhoto from '@/components/UI/ProfilePhoto'
import ArticleCard from '@/components/UI/ArticleCard'
import ProjectCard from '@/components/UI/ArticleCard2'

export const metadata = {
	title: 'Bogdan Gevko',
	description: 'Bogdan Gevko, software developer and computer science student at Oregon State University.',
}

export default function Home() {
  return (
    <main className="py-20 flex w-full mx-auto flex-col lg:py-24">
			<header className="pb-24 mx-auto w-full max-w-5xl flex flex-col justify-between items-center lg:items-top lg:flex-row">
				<ProfilePhoto />
				<div className="max-w-prose flex flex-col items-center lg:items-start">
					<h1 className="text-lg leading-7 font-semibold text-gray-500">Hi, I&apos;m Bogdan.</h1>
					<p className="mb-8 text-4xl leading-10 font-bold text-gray-700 lg:mb-6">I create <span className="text-cyan-500">software</span></p>
					<p className="mb-8 text-center text-base leading-6 font-normal text-gray-900 lg:text-left lg:mb-6"
						>I&apos;m a full-time Computer Science student at Oregon State University. Welcome to my digital workshop, where I fine-tune my web development skills and catalog my broader technical pursuits.
					</p>
					<ButtonPrimary title="Get in touch" href="/contact" />
				</div>
			</header>
			<section className="px-4 py-16 w-screen flex flex-col bg-blue-50 -mx-4">
				<header className="mb-4 w-full max-w-prose lg:max-w-5xl mx-auto flex justify-between items-center">
					<p className="text-lg leading-8 font-semibold text-gray-500">Recent Posts</p>
					<ButtonSecondary title="View all" href="/blog" />
				</header>
				<article className="w-full mx-auto flex flex-col max-w-prose lg:max-w-5xl lg:flex-row lg:justify-between gap-4">
					<ArticleCard 
						date="30 Sep 2023"
						title="Linux Cheatsheet"
						content="Reference to common commands in Linux."
						tags={['Linux']}
						href="#"
					/>

					<ArticleCard
						date="6 Oct 2023"
						title="Build Script"
						content="Sometimes, simple programs don't require the full power of CMake, but it can also get tedious to build your program every time with terminal commands. I have just the solution for such cases. Sometimes, simple programs don't require the full power of CMake, but it can also get tedious to build your program every time with terminal commands. I have just the solution for such cases."
						tags={['C++', 'C']}
						href="#"
					/>

					<ArticleCard
						date="5 Oct 2023"
						title="Sym Link a Command Line Tool"
						content="How to make a command line tool work globally from any directory."
						tags={['Linux']}
						href="#"
					/>
				</article>
			</section>
			<section className="px-4 pt-16 w-screen flex flex-col bg-white -mx-4">
				<header className="mb-8 pb-4 w-full border-b max-w-prose lg:max-w-5xl mx-auto flex justify-between items-center">
					<p className="text-lg leading-8 font-normal text-gray-400 font-semibold">Featured Projects</p>
					<ButtonSecondary title="View all" href="/projects" />
				</header>
				<article className="w-full mx-auto flex flex-col max-w-prose lg:max-w-5xl">
					<ProjectCard
						date="1 day ago"
						title="I remade my website with Next.js 13"
						content="I rewrote my previous website, which was written in React with NextJS. In this article, I talk my process and the challenges I faced along the way."
						tags={['NextJS', 'React', 'TailwindCSS', 'CSS', 'HTML', 'JavaScript']}
						href="#"
					/>
					<ProjectCard
						date="24 Oct 2023"
						title="I created a 3D renderer"
						content="In this article, I talk about how I built an openGL renderer with the help of GLFW library."
						tags={['C++', 'OpenGL']}
						href="#"
					/>
					<ProjectCard
						date="20 Sep 2023"
						title="I rolled my own content management system"
						content="I created a command line tool that automatically pushes my Obsidian notes to the blog on this website. I can edit my notes in Obsidian and push all the changes to the blog with a single command."
						tags={['Python', 'Git', 'Markdown']}
						href="#"
					/>
				</article>
			</section>
		</main>
  )
}
