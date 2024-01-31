import formatDate from '@/lib/utils'
import { getPostsMeta, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Article from '@/ui/Article'
import { MDXRemote } from 'next-mdx-remote'
import 'highlight.js/styles/github.css'

export const revalidate = 60

export async function generateStaticParams() {
	try {
		const posts = await getPostsMeta('projects')
		if (!posts) return []
		return posts.map(post => ({ postId: post.id }))
	} catch (err) {
		console.log("generateStaticParams:error: ", err)
		return []
	}
}

export async function generateMetadata({ params }) {
	try {
		const post = await getPostBySlug(params.slug, 'projects')
		if (!post) return { title: 'Post not found' }

		return {
			title: post.meta.title,
			description: post.meta.description,
		}
	} catch (err) {
		console.error("generateMetadata:error: ", err)
		return { title: 'Something went wrong.' }
	}
}

export default async function ProjectPage({ params }) {
	const post = await getPostBySlug(params.slug, 'projects')

	if (!post) return notFound()

	const { meta, content } = post

  return (
    <main className="pt-4 pb-20 flex w-full flex flex-col items-center lg:pb-24">
			<Article meta={meta} content={content} />
		</main>
	)
}
