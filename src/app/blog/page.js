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
  return (
    <main className="pt-4 pb-20 flex w-full flex-col lg:pb-24">
			<ArticlesList articles={data} />
		</main>
	)
}
