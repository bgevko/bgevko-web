import { NextResponse } from 'next/server'
import { useSearchParams } from 'next/navigation'
import { queryPostBySlug, updatePostBySlug, removePostBySlug } from '@/lib/posts'
import { addLog } from '@/lib/log'

export const revalidate = 60

export async function GET(request, { params }) {
	const type = params.content
  const slug = params.slug
	try {
		const post = await queryPostBySlug(slug, type)
		return NextResponse.json(post)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function DELETE(request, { params }) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}

	const type = params.content
	const slug = params.slug
	try {
		const post = await removePostBySlug(slug, type)

		// Don't add a log if the post is a draft
		if (post.draft === 1) {
			return NextResponse.json({ message: 'Post deleted', post: post })
		}

		const log = await addLog({ ActivityType: type, ActionType: 'deleted', Description: post.title })
		return NextResponse.json({ message: 'Post deleted', post: post, log: log })
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function PUT(request, { params }) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}

	const type = params.content
	const slug = params.slug
	const postObj = await request.json()


	try {
		const oldPost = await queryPostBySlug(slug, type)
		const post = await updatePostBySlug(slug, postObj, type)
		
		// Don't add a log if the post is a draft
		if (oldPost.postObj.draft === 1) {
			return NextResponse.json({ message: 'Post updated', post: post })
		}

		// Determine if post is coming out of draft status, then it should be 'created' instead of 'updated'
		let actionText = 'updated'
		if (oldPost.draft === 1 && postObj.draft === 0) {
			actionText = 'added'
		}

		const log = await addLog({ 
			ActivityType: type, 
			ActionType: actionText,
			Description: post.title,
			BlogPostID: type === 'blog' ? post.postID : null,
			ProjectPostID: type === 'projects' ? post.postID : null,
			NotesPostID: type === 'notes' ? post.postID : null,
			URL: `/${type}/${post.slug}`
		})
		return NextResponse.json({ message: 'Post updated', post: post, log: log })
	} catch (error) {
		return NextResponse.json("Error updating post. Error: " + error)
	}
	return NextResponse.json("PUT request")
}
