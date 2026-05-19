import { NextRequest, NextResponse } from 'next/server'
import { createKos, getAllKosAdmin } from '@/services/kos.service'

// GET /api/admin/kos — list all kos (admin)
export async function GET() {
  try {
    const data = await getAllKosAdmin()
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching admin kos list:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

// POST /api/admin/kos — create kos
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = await createKos(body)
    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Error creating kos:', error)
    return NextResponse.json({ error: 'Failed to create kos' }, { status: 500 })
  }
}
