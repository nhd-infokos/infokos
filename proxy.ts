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

  // If not logged in and trying to access admin (but not login page)
  if (!user && isAdminRoute && !isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // If not logged in and trying to access admin API
  if (!user && isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // If logged in and on login page, redirect to admin
  if (user && isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/kos"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
