import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/resolve-video
 * 
 * For TikTok URLs (including shortened vt.tiktok.com / vm.tiktok.com):
 *   - Resolves shortened URLs to full URLs
 *   - Extracts the video ID (either from URL or via oEmbed API)
 * 
 * For other URLs: returns resolvedUrl as-is
 * 
 * Body: { url: string }
 * Returns: { resolvedUrl: string, platform: string, videoId?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const isShortenedTiktok = /^https?:\/\/(vt|vm)\.tiktok\.com\//i.test(url)
    const isFullTiktok = /tiktok\.com\/@[\w.-]+\/video\/\d+/i.test(url)
    const isTiktok = isShortenedTiktok || isFullTiktok

    if (!isTiktok) {
      return NextResponse.json({ resolvedUrl: url, platform: 'unknown' })
    }

    // Step 1: Resolve shortened URL if needed
    let fullUrl = url
    if (isShortenedTiktok) {
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
        
        if (location && [301, 302, 303, 307, 308].includes(res.status)) {
          currentUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href
          maxRedirects--
        } else {
          break
        }
      }

      // Clean up URL
      try {
        const parsed = new URL(currentUrl)
        fullUrl = `${parsed.origin}${parsed.pathname}`
      } catch {
        fullUrl = currentUrl
      }
    }

    // Step 2: Extract video ID from the resolved full URL
    // Pattern: tiktok.com/@username/video/VIDEO_ID
    let videoId: string | null = null
    const videoIdMatch = fullUrl.match(/\/video\/(\d+)/)
    if (videoIdMatch) {
      videoId = videoIdMatch[1]
    }

    // Step 3: If we couldn't extract from URL, try oEmbed API as fallback
    if (!videoId) {
      try {
        const oembedRes = await fetch(
          `https://www.tiktok.com/oembed?url=${encodeURIComponent(fullUrl)}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; InfoKos/1.0)',
            },
          }
        )
        
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json()
          // Extract data-video-id from oEmbed HTML
          if (oembedData.html) {
            const idMatch = oembedData.html.match(/data-video-id="(\d+)"/)
            if (idMatch) {
              videoId = idMatch[1]
            }
          }
        }
      } catch (oembedError) {
        console.error('oEmbed API error:', oembedError)
      }
    }

    return NextResponse.json({ 
      resolvedUrl: fullUrl, 
      platform: 'tiktok',
      videoId,
    })
  } catch (error: any) {
    console.error('Error resolving video URL:', error)
    return NextResponse.json({ 
      error: 'Failed to resolve URL',
      details: error?.message 
    }, { status: 500 })
  }
}
