import { NextRequest, NextResponse } from 'next/server'
import { updateRoom, deleteRoom } from '@/services/room.service'

// PUT /api/admin/kos/:id/rooms/:roomId
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; roomId: string }> }
) {
  try {
    const { roomId } = await params
    const body = await request.json()
    const data = await updateRoom(roomId, body)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error updating room:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE /api/admin/kos/:id/rooms/:roomId
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; roomId: string }> }
) {
  try {
    const { roomId } = await params
    await deleteRoom(roomId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting room:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
