import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  // Only protect /admin routes (except /admin/login)
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/admin/login"
  const isAdminApi = request.nextUrl.pathname.startsWith("/api/admin")

  if (!isAdminRoute && !isAdminApi) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // --- Admin page routes ---
  if (isAdminRoute) {
    // Login page handling
    if (isLoginPage) {
      // If already logged in, check if admin and redirect to dashboard
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (profile?.role === 'admin') {
          const url = request.nextUrl.clone()
          url.pathname = "/admin/kos"
          return NextResponse.redirect(url)
        }
      }
      return supabaseResponse
    }

    // All other /admin/* routes require admin auth
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      // Not admin — sign out and redirect to admin login with error
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      url.searchParams.set('error', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  // --- Admin API routes ---
  if (isAdminApi) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Not authenticated" }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
