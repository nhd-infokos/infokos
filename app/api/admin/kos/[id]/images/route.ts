import { NextRequest, NextResponse } from 'next/server'
import { addImage, deleteImage } from '@/services/image.service'

// POST /api/admin/kos/:id/images
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await addImage(id, body)
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error adding image:', error)
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 })
  }
}

// DELETE /api/admin/kos/:id/images
export async function DELETE(request: NextRequest) {
  try {
    const { id: imageId } = await request.json()
    await deleteImage(imageId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
