import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const FALLBACK_COOKIE = 'wph_fallback_admin'
const FALLBACK_COOKIE_VALUE = 'granted'
const FALLBACK_COOKIE_MAX_AGE = 60 * 60 * 12 // 12 hours

function supabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return !!(
    url &&
    key &&
    !url.includes('dummy') &&
    !key.includes('dummy') &&
    url.startsWith('http')
  )
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })
  const { pathname } = request.nextUrl

  // /admin/login is always reachable
  const needsAuth = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (!needsAuth) {
    return response
  }

  // 1) Primary path: real Supabase auth
  if (supabaseConfigured()) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              response = NextResponse.next({ request })
              cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
            },
          },
        }
      )
      const { data } = await supabase.auth.getUser()
      const user = data?.user
      if (user) {
        return response
      }
    } catch (e) {
      console.error("Middleware Supabase auth error:", e)
      // Fall through to fallback gate
    }
  }

  // 2) Fallback gate: allow when Supabase is down but a signed fallback cookie is valid
  const fallbackCookie = request.cookies.get(FALLBACK_COOKIE)?.value
  const passwordSet = !!process.env.ADMIN_PASSWORD
  if (passwordSet && fallbackCookie === FALLBACK_COOKIE_VALUE) {
    return response
  }

  const url = new URL('/admin/login', request.url)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
