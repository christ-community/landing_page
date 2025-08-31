import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/lib/email';

interface FreeBibleFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  translation: string;
  specialRequests?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FreeBibleFormData = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, address, city, state, zipCode, country, translation } = body;
    
    if (!firstName || !lastName || !email || !address || !city || !state || !zipCode || !translation) {
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
    const emailSent = await emailService.sendFreeBibleEmail({
      firstName,
      lastName,
      email,
      phone: body.phone,
      address,
      city,
      state,
      zipCode,
      country,
      translation,
      specialRequests: body.specialRequests,
    });

    if (!emailSent) {
      console.error('Failed to send email, but form submission logged');
    }

    // Log the bible request
    console.log('Free Bible request:', {
      firstName,
      lastName,
      email,
      address: `${address}, ${city}, ${state} ${zipCode}`,
      country,
      translation,
      specialRequests: body.specialRequests || 'None',
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        message: 'Free Bible request submitted successfully',
        timestamp: new Date().toISOString() 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Free Bible request error:', error);
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