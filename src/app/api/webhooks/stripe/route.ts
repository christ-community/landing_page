import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log('Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amount: session.amount_total,
          currency: session.currency,
          frequency: session.metadata?.frequency,
          isDedicated: session.metadata?.isDedicated,
          dedicationMessage: session.metadata?.dedicationMessage,
        });

        // Here you would typically:
        // 1. Send confirmation email to donor
        // 2. Send notification to your team
        // 3. Update your database
        // 4. Send thank you message
        
        // Example: Send confirmation email
        /*
        await emailService.send({
          to: session.customer_details?.email,
          from: process.env.FROM_EMAIL,
          subject: 'Thank you for your donation!',
          html: `
            <h2>Donation Confirmation</h2>
            <p>Thank you for your generous donation of ${session.currency?.toUpperCase()} ${(session.amount_total! / 100).toFixed(2)}!</p>
            <p>Your support makes a real difference in our community.</p>
            <p>Blessings,<br>The Christ Community Team</p>
          `,
        });
        */
        
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        
        console.log('Subscription created:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          amount: subscription.items.data[0]?.price.unit_amount,
          currency: subscription.items.data[0]?.price.currency,
        });

        // Handle new subscription
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        console.log('Subscription updated:', {
          subscriptionId: subscription.id,
          status: subscription.status,
        });

        // Handle subscription changes
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        console.log('Subscription cancelled:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
        });

        // Handle subscription cancellation
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        console.log('Recurring payment succeeded:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          amount: invoice.amount_paid,
          currency: invoice.currency,
        });

        // Handle successful recurring payment
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        console.log('Payment failed:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          customerEmail: invoice.customer_email,
        });

        // Handle failed payment - maybe send email to customer
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        console.log('One-time payment succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          isDedicated: paymentIntent.metadata?.isDedicated,
          dedicationMessage: paymentIntent.metadata?.dedicationMessage,
        });

        // Handle successful one-time payment
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
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