import SectionTags from '@/components/UI/SectionTags'
import ArticlesList from '@/components/UI/ArticlesList'
import { getPostsMeta } from '@/lib/posts'

export const metadata = {
	title: "Bogdan's Blog",
	description: "Bogdan Gevko's blog. I write about software development and other technical topics.",
}

async function getMetadata() {
	try {
		const posts = await getPostsMeta('blog')
		if (!posts) return []
		return posts
	} catch (err) {
		console.log("getMetadata:error: ", err)
		return []
	}
}

export default async function Blog() {
	const data = await getMetadata()
	const articles = [
		{
			date: "23 Oct 2023",
			title: "CSS Tricks",
			content: "CSS tricks that I don't want to forget, and you shouldn't either.",
			tags: ['CSS'],
			href: "#",
		},
		{
			date: "6 Oct 2023",
			title: "Build Script",
			content: "Sometimes, simple programs don't require the full power of CMake, but it can also get tedious to build your program every time with terminal commands. I have just the solution for such cases.",
			tags: ['C++', 'CMake'],
			href: "#",
		},
		{
			date: "23 Oct 2023",
			title: "I can't produce music because I'm too busy writing scripts to help me produce music",
			content: "If there's an API, some programmer is writing a script to automate something.. right now. Even if that automation ends up taking way more time than it would have to do it manually. Why are we like this?",
			tags: ['Non-technical'],
			href: "#",
		},
	]

  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<ArticlesList articles={data} />
		</main>
	)
}
