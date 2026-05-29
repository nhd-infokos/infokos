import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/resolve-video
 * 
 * Resolves shortened video URLs (e.g. vt.tiktok.com, vm.tiktok.com) 
 * to their full canonical URLs by following redirects.
 * 
 * Body: { url: string }
 * Returns: { resolvedUrl: string, platform: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Check if this is a shortened TikTok URL (vt.tiktok.com or vm.tiktok.com)
    const isShortenedTiktok = /^https?:\/\/(vt|vm)\.tiktok\.com\//i.test(url)
    
    if (!isShortenedTiktok) {
      // Not a shortened URL, return as-is
      return NextResponse.json({ resolvedUrl: url, platform: 'unknown' })
    }

    // Follow redirects to get the final URL
    // Use fetch with redirect: 'manual' to capture the redirect chain
    let currentUrl = url
    let maxRedirects = 5

    while (maxRedirects > 0) {
      const res = await fetch(currentUrl, {
        method: 'HEAD',
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; InfoKos/1.0)',
        },
      })

      const location = res.headers.get('location')
      
      if (location && (res.status === 301 || res.status === 302 || res.status === 303 || res.status === 307 || res.status === 308)) {
        // Handle relative redirects
        currentUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href
        maxRedirects--
      } else {
        // No more redirects
        break
      }
    }

    // Extract the canonical TikTok URL (strip query params for cleanliness)
    let resolvedUrl = currentUrl
    try {
      const parsed = new URL(currentUrl)
      // Keep the path but remove tracking query params
      resolvedUrl = `${parsed.origin}${parsed.pathname}`
    } catch {
      // If URL parsing fails, use as-is
    }

    return NextResponse.json({ 
      resolvedUrl, 
      platform: 'tiktok' 
    })
  } catch (error: any) {
    console.error('Error resolving video URL:', error)
    return NextResponse.json({ 
      error: 'Failed to resolve URL',
      details: error?.message 
    }, { status: 500 })
  }
}
