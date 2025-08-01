import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, inquiryType, subject, message } = body;
    
    if (!firstName || !lastName || !email || !inquiryType || !subject || !message) {
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
    const emailSent = await emailService.sendContactFormEmail({
      firstName,
      lastName,
      email,
      phone: body.phone,
      inquiryType,
      subject,
      message,
    });

    if (!emailSent) {
      console.error('Failed to send email, but form submission logged');
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
      firstName,
      lastName,
      email,
      phone: body.phone || 'Not provided',
      inquiryType,
      subject,
      message,
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}