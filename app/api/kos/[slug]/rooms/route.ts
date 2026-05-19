import { NextRequest, NextResponse } from 'next/server'
import { getRoomsByKosSlug } from '@/services/room.service'

/**
 * GET /api/kos/:slug/rooms
 *
 * Returns all rooms for a kos by slug, including room facilities.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await getRoomsByKosSlug(slug)

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching kos rooms:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    )
  }
}
