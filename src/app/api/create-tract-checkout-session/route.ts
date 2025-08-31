import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, address, tractId, tractTitle, quantity, totalPrice, currency = 'gbp' } = await request.json();

    if (!name || !email || !address || !tractId || !quantity || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert price to pence for Stripe (Stripe uses smallest currency unit)
    const priceInPence = Math.round(totalPrice * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `${tractTitle} (${quantity} copies)`,
              description: `Gospel tract order - ${quantity} copies of "${tractTitle}"`,
            },
            unit_amount: priceInPence,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/get-involved/order-a-tract/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/get-involved/order-a-tract`,
      customer_email: email,
      metadata: {
        name,
        email,
        address,
        tractId,
        tractTitle,
        quantity: quantity.toString(),
        orderType: 'tract'
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}