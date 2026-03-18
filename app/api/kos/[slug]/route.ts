import { NextRequest, NextResponse } from 'next/server'
import { getKosBySlug } from '@/services/kos.service'

/**
 * GET /api/kos/:slug
 *
 * Returns detail of a single kos by slug, including facilities and images.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const data = await getKosBySlug(slug)

    if (!data) {
      return NextResponse.json(
        { error: 'Kos not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching kos detail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kos detail' },
      { status: 500 }
    )
  }
}
