import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/search';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const results = await search(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json([]);
  }
}
