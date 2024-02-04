import { NextResponse } from 'next/server'
import { useSearchParams } from 'next/navigation'
import { getAll, addLog, sanitizeLog, purgeDeletedTypeLogs} from '@/lib/log'

export const revalidate = 60

export async function GET(request) {
	try {
		await sanitizeLog()
		// await purgeDeletedTypeLogs()
		const logs = await getAll()
		return NextResponse.json(logs)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function POST(request) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}
	const logObj = await request.json()
	try {
		const log = await addLog(logObj)
		return NextResponse.json(log)
	} catch (error) {
		return NextResponse.json(error)
	}
}

