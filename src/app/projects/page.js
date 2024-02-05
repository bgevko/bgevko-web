import SectionTags from '@/ui/SectionTags'
import ProjectsList from '@/ui/ArticlesList'
import { getPostsMeta } from '@/lib/posts'

export const revalidate = 60

export const metadata = {
	title: "Bogdan's Projects",
	description: "Bogdan Gevko's coding projects.",
}

async function getMetadata() {
	try {
		const posts = await getPostsMeta('projects')
		if (!posts) return []
		return posts
	} catch (err) {
		console.log("getMetadata:error: ", err)
		return []
	}
}

export default async function Projects() {
	const devMode = process.env.NODE_ENV === 'development'
	let data = await getMetadata()
	if (devMode === false) {
		data = data.filter((post) => post?.draft !== 1)
	}
  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<ProjectsList 
				articles={data}
			/>
		</main>
	)
}
