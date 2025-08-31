import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';

interface NewsletterFormData {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterFormData = await request.json();
    
    // Validate required fields
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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
    const emailSent = await emailService.sendNewsletterSignupEmail({ email });

    if (!emailSent) {
      console.error('Failed to send email, but subscription logged');
    }

    // Log the newsletter signup
    console.log('Newsletter signup:', {
      email,
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        message: 'Newsletter subscription successful',
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter signup error:', error);
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