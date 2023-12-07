import formatDate from '@/lib/utils'
import { getPostsMeta, getPostBySlug } from '@/lib/posts'
import { getTableOfContents } from '@/lib/toc'
import { getCodeContent } from '@/lib/codecopy'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Note from '@/components/UI/Note'
import { MDXRemote } from 'next-mdx-remote'
import 'highlight.js/styles/github.css'
import TableOfContents from '@/components/UI/TableOfContents'

export const revalidate = 86400

export async function generateStaticParams() {
	try {
		const posts = await getPostsMeta('notes')
		if (!posts) return []
		return posts.map(post => ({ postId: post.id }))
	} catch (err) {
		console.log("generateStaticParams:error: ", err)
		return []
	}
}

export async function generateMetadata({ params }) {
	try {
		const post = await getPostBySlug(params.slug, 'notes')
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

export default async function ArticlePage({ params }) {
	const post = await getPostBySlug(params.slug, 'notes')

	if (!post) return notFound()

	const { meta, content, raw } = post
	const toc = await getTableOfContents(raw)
	const codeData = getCodeContent(raw)

  return (
    <main className="pt-4 pb-20 flex w-full flex justify-center lg:pb-24">
			<Note meta={meta} content={content} />
			{ toc?.items?.length > 3 &&
				<TableOfContents 
				className="sticky top-20"
				toc={toc} 
			/>
			}
		</main>
	)
}
