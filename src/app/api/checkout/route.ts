import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { clientName, email, projectTitle } = await req.json();
    
    // Dynamically grab the current URL (works for both localhost and Vercel)
    const origin = req.headers.get("origin");

    // Tell Stripe to create a checkout page
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Project Retainer: ${projectTitle}`,
              description: `Initial architecture and development deposit for ${clientName}.`,
            },
            unit_amount: 250000, // $2,500.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/admin?payment=success`,
      cancel_url: `${origin}/admin?payment=canceled`,
    });

    // Send the secure Stripe URL back to the dashboard
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}