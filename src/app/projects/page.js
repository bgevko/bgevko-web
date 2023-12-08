import SectionTags from '@/components/UI/SectionTags'
import ProjectsList from '@/components/UI/ArticlesList'
import { getPostsMeta } from '@/lib/posts'

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
	const data = await getMetadata()
  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<ProjectsList 
				articles={data}
			/>
		</main>
	)
}
