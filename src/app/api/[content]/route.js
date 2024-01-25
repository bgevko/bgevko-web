import { NextResponse } from 'next/server'
import { useSearchParams } from 'next/navigation'
import { getAllPosts, addPost, removePostBySlug } from '@/lib/posts'

export const revalidate = 60

export async function GET(request, { params }) {
  const param = params.content
	switch (param) {
		case 'blog':
			const posts = await getAllPosts(param)
			return NextResponse.json(posts)
		case 'projects':
			const projects = await getAllPosts(param)
			return NextResponse.json(projects)
		case 'notes':
			const notes = await getAllPosts(param)
			return NextResponse.json(notes)
		default:
			return NextResponse.json("Unknown endpoint")
	}
}

export async function POST(request) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}
	const postObj = await request.json()
	try {
		const post = await addPost(postObj)
		return NextResponse.json(post)
	} catch (error) {
		return NextResponse.json(error)
	}
}

