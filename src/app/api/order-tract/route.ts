import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';

interface OrderTractFormData {
  name: string;
  email: string;
  address: string;
  tractId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderTractFormData = await request.json();
    
    // Validate required fields
    const { name, email, address, tractId, quantity } = body;
    
    if (!name || !email || !address || !tractId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Missing required fields or invalid quantity' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send emails using SMTP
    const emailSent = await emailService.sendOrderTractEmail({
      name,
      email,
      address,
      tractId,
      quantity,
    });

    if (!emailSent) {
      console.error('Failed to send email, but form submission logged');
    }

    // Log the tract order
    console.log('Tract order:', {
      name,
      email,
      address,
      tractId,
      quantity,
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        message: 'Tract order submitted successfully',
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Tract order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}