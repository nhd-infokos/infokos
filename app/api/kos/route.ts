import { NextRequest, NextResponse } from 'next/server'
import { getKosList, getKosForMap, getFeaturedKos, KosFilters } from '@/services/kos.service'

/**
 * GET /api/kos
 *
 * Query params:
 *  - city: filter by city name (partial match)
 *  - kos_type: "putra" | "putri" | "campur"
 *  - price_min: minimum price
 *  - price_max: maximum price
 *  - featured: "true" to get only the featured kos
 *  - map: "true" to get lightweight data for map markers
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Special mode: map markers
    if (searchParams.get('map') === 'true') {
      const data = await getKosForMap()
      return NextResponse.json({ data })
    }

    // Special mode: featured kos
    if (searchParams.get('featured') === 'true') {
      const data = await getFeaturedKos()
      return NextResponse.json({ data })
    }

    // Build filters
    const filters: KosFilters = {}
    const city = searchParams.get('city')
    const kosType = searchParams.get('kos_type')
    const priceMin = searchParams.get('price_min')
    const priceMax = searchParams.get('price_max')

    if (city) filters.city = city
    if (kosType) filters.kos_type = kosType
    if (priceMin) filters.price_min = parseInt(priceMin, 10)
    if (priceMax) filters.price_max = parseInt(priceMax, 10)

    const data = await getKosList(filters)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching kos list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch kos data' },
      { status: 500 }
    )
  }
}
