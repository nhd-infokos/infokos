import { NextRequest, NextResponse } from 'next/server'
import { addFacility, deleteFacility } from '@/services/facility.service'

// POST /api/admin/kos/:id/facilities
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const data = await addFacility(id, body)
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error adding facility:', error)
    return NextResponse.json({ error: 'Failed to add' }, { status: 500 })
  }
}

// DELETE /api/admin/kos/:id/facilities
export async function DELETE(request: NextRequest) {
  try {
    const { id: facilityId } = await request.json()
    await deleteFacility(facilityId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting facility:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
