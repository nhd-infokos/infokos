import { NextRequest, NextResponse } from 'next/server'
import { addTag, deleteTag } from '@/services/tag.service'

// POST /api/admin/kos/:id/tags
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await addTag(id, body)
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error adding tag:', error)
    return NextResponse.json({ error: 'Failed to add tag' }, { status: 500 })
  }
}

// DELETE /api/admin/kos/:id/tags
export async function DELETE(request: NextRequest) {
  try {
    const { id: tagId } = await request.json()
    await deleteTag(tagId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }
}
