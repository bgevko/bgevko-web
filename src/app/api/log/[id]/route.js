import { NextResponse } from 'next/server'
import { useSearchParams } from 'next/navigation'
import { getLogById, adjustLogById, removeLogById } from '@/lib/log'

export const revalidate = 60

export async function GET(request, { params }) {
  const id = params.id
	try {
		const log = await getLogById(id)
		return NextResponse.json(log)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function DELETE(request, { params }) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}

	const id = params.id
	try {
		const log = await removeLogById(id)
		return NextResponse.json(log)
	} catch (error) {
		return NextResponse.json(error)
	}
}

export async function PUT(request, { params }) {
	const token = request.headers.get('Authorization')
	if (token === null || token.split(' ')[1] !== process.env.SECRET_KEY) {
		return new Response('Unauthorized', { status: 401 })
	}

	const id = params.id
	const logObj = await request.json()
	try {
		const log = await adjustLogById(id, logObj)
		return NextResponse.json(log)
	} catch (error) {
		return NextResponse.json("Error adjusting log. Error: " + error)
	}
	return NextResponse.json(log)
}
