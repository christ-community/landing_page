import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';

function isAuthenticated(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('dashboard-session')?.value;
  if (!sessionToken) return false;

  try {
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [, timestamp] = decoded.split(':');
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    const maxAge = 60 * 60 * 24 * 1000;
    return tokenAge <= maxAge;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pathname } = await request.json();

    if (!pathname || typeof pathname !== 'string') {
      return NextResponse.json({ error: 'Pathname is required' }, { status: 400 });
    }

    await del(pathname);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Blob delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
