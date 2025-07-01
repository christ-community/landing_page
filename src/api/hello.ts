import { NextResponse } from 'next/server';

export function getHelloResponse() {
  return NextResponse.json({
    message: "Welcome to Christ Community API",
    timestamp: new Date().toISOString(),
    status: "active",
  });
}

export function createHelloResponse(body: unknown) {
  return NextResponse.json({
    message: "Thank you for connecting with Christ Community",
    received: body,
    timestamp: new Date().toISOString(),
  });
} 