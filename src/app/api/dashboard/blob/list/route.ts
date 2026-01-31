import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

const allowedFolders = new Set(['BigChurch', '10CFC']);

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

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folder = request.nextUrl.searchParams.get('folder') || '';

  if (!allowedFolders.has(folder)) {
    return NextResponse.json({ error: 'Invalid folder selection' }, { status: 400 });
  }

  try {
    const response = await list({ prefix: `${folder}/` });
    const items = response.blobs
      .filter((blob) => blob.pathname.includes('.'))
      .map((blob) => ({
        pathname: blob.pathname,
        url: blob.url || blob.downloadUrl,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Blob list error:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
