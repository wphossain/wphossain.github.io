import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('dummy') ||
    !supabaseUrl.startsWith('http')
  ) {
    return response
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
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

    // Redirect unauthenticated users trying to access /admin
    if (!user && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
      const url = new URL('/admin/login', request.url)
      return NextResponse.redirect(url)
    }
  } catch (e) {
    console.error("Middleware Supabase auth error:", e)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
