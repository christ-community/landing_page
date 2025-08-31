import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';

interface SendHelpFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendHelpFormData = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
    const emailSent = await emailService.sendSendHelpEmail({
      name,
      email,
      subject,
      message,
    });

    if (!emailSent) {
      console.error('Failed to send email, but form submission logged');
    }

    // Log the send help request
    console.log('Send Help request:', {
      name,
      email,
      subject,
      message,
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        message: 'Send Help request submitted successfully',
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Send Help request error:', error);
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