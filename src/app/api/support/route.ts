import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { clientRef, clientEmail, ticketType, description } = await req.json();

    const ticketId = "TCKT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Just save to Supabase. No AI, No Resend.
    const { error } = await supabase
      .from("support_tickets")
      .insert([{
        id: ticketId,
        client_reference: clientRef,
        client_email: clientEmail,
        ticket_type: ticketType,
        description: description,
        status: 'Open'
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, ticket_id: ticketId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}