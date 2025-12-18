import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key, {
    apiVersion: '2025-12-15.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured. Add STRIPE_SECRET_KEY to enable payments.' }, { status: 503 });
    }

    const body = await request.json();
    const { productId, productName } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Featured Listing: ${productName}`,
              description: 'Get your SaaS product featured at the top of NoDemo for 30 days',
            },
            unit_amount: 4900, // $49.00
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}?featured=success&product=${productId}`,
      cancel_url: `${request.nextUrl.origin}?featured=cancelled`,
      metadata: {
        productId: String(productId),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
