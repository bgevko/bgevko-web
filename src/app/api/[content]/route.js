import { NextResponse } from 'next/server'
import { useSearchParams } from 'next/navigation'
import { getAllPosts, addPost, removePostBySlug } from '@/lib/posts'
import { addLog } from '@/lib/log'

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
	const type = postObj.type
	try {
		const post = await addPost(postObj)
		const logObj = {
			ActivityType: postObj.type,
			ActionType: 'added',
			Description: postObj.title,
			BlogPostID: type === 'blog' ? post.postID : null,
			ProjectPostID: type === 'projects' ? post.postID : null,
			NotesPostID: type === 'notes' ? post.postID : null
		}
		const log = await addLog(logObj)
		return NextResponse.json({ message: 'Post added successfully', post, log })
	} catch (error) {
		return NextResponse.json(error)
	}
}

