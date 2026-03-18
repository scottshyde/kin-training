import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { canAccessManual } from '@/lib/roles';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key',
  });

  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check manual-level access
  const pathname = request.nextUrl.pathname;
  const manualMatch = pathname.match(/^\/(setter-manual|closer-manual|builder-playbook)(\/|$)/);
  if (manualMatch) {
    const manualSlug = manualMatch[1];
    if (!canAccessManual(token.role, manualSlug)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico|.*\\.mp4|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
