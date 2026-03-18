import { NextRequest, NextResponse } from 'next/server'
import { getKosById, updateKos, deleteKos } from '@/services/kos.service'

// GET /api/admin/kos/:id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await getKosById(id)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching kos:', error)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

// PUT /api/admin/kos/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await updateKos(id, body)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error updating kos:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE /api/admin/kos/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteKos(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting kos:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
