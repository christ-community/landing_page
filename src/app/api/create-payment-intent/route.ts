import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  frequency: 'once' | 'monthly';
  isDedicated?: boolean;
  dedicationMessage?: string;
  donorInfo?: {
    name?: string;
    email?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePaymentIntentRequest = await request.json();
    const { amount, currency, frequency, isDedicated, dedicationMessage, donorInfo } = body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { error: 'Currency is required' },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);

    if (frequency === 'monthly') {
      // For recurring donations, create a subscription
      try {
        // First, create or retrieve customer
        let customer;
        if (donorInfo?.email) {
          const existingCustomers = await stripe.customers.list({
            email: donorInfo.email,
            limit: 1,
          });

          if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
          } else {
            customer = await stripe.customers.create({
              email: donorInfo.email,
              name: donorInfo.name,
              metadata: {
                isDedicated: isDedicated ? 'true' : 'false',
                dedicationMessage: dedicationMessage || '',
              },
            });
          }
        }

        // Create a product for the donation
        const product = await stripe.products.create({
          name: `Monthly Donation - ${currency.toUpperCase()}`,
          description: isDedicated 
            ? `Dedicated monthly donation: ${dedicationMessage}` 
            : 'Monthly donation to Christ Community',
        });

        // Create a price for the product
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: amountInCents,
          currency: currency.toLowerCase(),
          recurring: {
            interval: 'month',
          },
        });

        // Create checkout session for subscription
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          customer: customer?.id,
          success_url: `${request.headers.get('origin')}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.headers.get('origin')}/donate?canceled=true`,
          metadata: {
            isDedicated: isDedicated ? 'true' : 'false',
            dedicationMessage: dedicationMessage || '',
            frequency: 'monthly',
          },
        });

        return NextResponse.json({
          sessionId: session.id,
          url: session.url,
        });

      } catch (error) {
        console.error('Subscription creation error:', error);
        return NextResponse.json(
          { error: 'Failed to create subscription' },
          { status: 500 }
        );
      }
    } else {
      // For one-time donations, create a payment intent
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: currency.toLowerCase(),
          metadata: {
            isDedicated: isDedicated ? 'true' : 'false',
            dedicationMessage: dedicationMessage || '',
            frequency: 'once',
            donorName: donorInfo?.name || '',
            donorEmail: donorInfo?.email || '',
          },
        });

        // Create checkout session for one-time payment
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [
            {
              price_data: {
                currency: currency.toLowerCase(),
                product_data: {
                  name: 'Donation to Christ Community',
                  description: isDedicated 
                    ? `Dedicated donation: ${dedicationMessage}` 
                    : 'One-time donation to Christ Community',
                },
                unit_amount: amountInCents,
              },
              quantity: 1,
            },
          ],
          success_url: `${request.headers.get('origin')}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.headers.get('origin')}/donate?canceled=true`,
          metadata: {
            isDedicated: isDedicated ? 'true' : 'false',
            dedicationMessage: dedicationMessage || '',
            frequency: 'once',
          },
        });

        return NextResponse.json({
          sessionId: session.id,
          url: session.url,
          clientSecret: paymentIntent.client_secret,
        });

      } catch (error) {
        console.error('Payment intent creation error:', error);
        return NextResponse.json(
          { error: 'Failed to create payment intent' },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('Payment processing error:', error);
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