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
    
    // Safety check logging
    console.log('Room ID:', roomId)
    console.log('Body:', body)

    // Whitelist only the fields that are meant to be updated
    const updateData = {
      name: body.name,
      description: body.description,
      image_url: body.image_url,
      video_url: body.video_url,
      marker_top: body.marker_top,
      marker_left: body.marker_left,
      sort_order: body.sort_order
    }
    
    // Remove undefined values so we don't accidentally overwrite existing data with nulls
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v !== undefined)
    )
    
    const data = await updateRoom(roomId, cleanUpdateData)
    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error updating room:', error)
    return NextResponse.json({ 
      error: 'Failed to update', 
      details: error?.message || 'Unknown error occurred'
    }, { status: 500 })
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
