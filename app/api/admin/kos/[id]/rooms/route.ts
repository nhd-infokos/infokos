import { NextRequest, NextResponse } from 'next/server'
import { getRoomsByKosId, createRoom } from '@/services/room.service'

// GET /api/admin/kos/:id/rooms
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await getRoomsByKosId(id)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST /api/admin/kos/:id/rooms
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await createRoom(id, body)
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
