import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

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

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const folder = String(formData.get('folder') || '');

    if (!allowedFolders.has(folder)) {
      return NextResponse.json({ error: 'Invalid folder selection' }, { status: 400 });
    }

    const files = formData.getAll('files').filter((value) => value instanceof File) as File[];

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        const pathname = `${folder}/${file.name}`;
        const blob = await put(pathname, file, {
          access: 'public',
          contentType: file.type || undefined,
        });
        return { pathname: blob.pathname, url: blob.url };
      })
    );

    return NextResponse.json({ items: uploads }, { status: 200 });
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
