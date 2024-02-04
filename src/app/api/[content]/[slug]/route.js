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
		const post = await updatePostBySlug(slug, postObj, type)
		const log = await addLog({ 
			ActivityType: type, 
			ActionType: 'updated', 
			Description: post.title,
			BlogPostID: type === 'blog' ? post.postID : null,
			ProjectPostID: type === 'projects' ? post.postID : null,
			NotesPostID: type === 'notes' ? post.postID : null
		})
		return NextResponse.json({ message: 'Post updated', post: post, log: log })
	} catch (error) {
		return NextResponse.json("Error updating post. Error: " + error)
	}
	return NextResponse.json("PUT request")
}
