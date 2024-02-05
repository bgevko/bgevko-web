import { NextResponse } from 'next/server'
import { purgeDeletedTypeLogs} from '@/lib/log'

export async function DELETE(request) {
	// debug, send back hello world
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}
	try {
		await purgeDeletedTypeLogs()
		return NextResponse.json({ message: 'Purge deleted type logs successfully' })
	} catch (error) {
		console.error(error)
		return new Response('Internal Server Error', { status: 500 })
	}
}
