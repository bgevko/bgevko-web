import { NextResponse } from 'next/server'
import { clearTestLogs } from '@/lib/log'

export async function DELETE(request, { params }) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}

	try {
		await clearTestLogs()
		return new Response('Test logs cleared', { status: 200 })
	} catch (error) {
		return new Response('Error clearing logs', { status: 500 })
	}
}
