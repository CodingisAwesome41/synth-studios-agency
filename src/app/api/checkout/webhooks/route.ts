import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Master key to update the database
);

export async function POST(req: Request) {
  const body = await req.text(); // Get the raw data from Stripe
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    // Verify that this request actually came from Stripe, not a hacker
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // If the payment was successful...
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clientEmail = session.customer_email;

    if (clientEmail) {
      // Find the pitch with this email and update it to 'Retained'
      const { error } = await supabase
        .from("client_pitches")
        .update({ status: 'Retained' })
        .eq('email', clientEmail);

      if (error) {
        console.error("Database update failed:", error);
      } else {
        console.log(`Success! Pitch for ${clientEmail} marked as Retained.`);
      }
    }
  }

  // Tell Stripe we received the message successfully
  return NextResponse.json({ received: true });
}