import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "Welcome to Christ Community API",
    timestamp: new Date().toISOString(),
    status: "active"
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: "Thank you for connecting with Christ Community",
    received: body,
    timestamp: new Date().toISOString()
  });
} 