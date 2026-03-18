import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { search } from '@/lib/search';
import { canAccessManual } from '@/lib/roles';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'dev-secret-key',
    });
    const role = token?.role as string | undefined;

    const results = await search(query);
    const filtered = results.filter((r) => canAccessManual(role, r.manualSlug));
    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json([]);
  }
}
