import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { createSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const type = formData.get('type') as string // 'desktop' | 'mobile'
    const kosId = formData.get('kosId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Convert to WebP using sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80 })
      .toBuffer()

    // Generate unique filename
    const timestamp = Date.now()
    const safeName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_')
    const fileName = `${kosId}/${type}-${safeName}-${timestamp}.webp`

    // Upload to Supabase Storage
    const supabase = createSupabaseAdmin()
    const { data, error } = await supabase.storage
      .from('kos-images')
      .upload(fileName, webpBuffer, {
        contentType: 'image/webp',
        upsert: true
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ error: 'Failed to upload to storage', details: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('kos-images')
      .getPublicUrl(data.path)

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
      size: webpBuffer.length
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed', details: error?.message }, { status: 500 })
  }
}
