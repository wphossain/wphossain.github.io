import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { error: 'Fallback admin login is not configured on the server.' },
        { status: 503 }
      );
    }

    if (typeof password !== 'string' || password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('wph_fallback_admin', 'granted', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return response;
  } catch (e) {
    console.error('Fallback login error:', e);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
