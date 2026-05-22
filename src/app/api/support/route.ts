import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // FIXED: Extracting clientEmail from the incoming request
    const { clientRef, clientEmail, ticketType, description } = await req.json();

    const ticketId = "TCKT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    let aiReply = "Our systems have logged your request. An engineering lead will review this shortly. Your Ticket ID is: " + ticketId;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are the L1 Technical Support AI for an elite software agency named Synth Studios. A client has submitted a support ticket. Write a brief, highly professional response. Tell them what the next steps are, or provide a likely technical explanation if it's a bug. Keep it under 3 sentences. You MUST include their Ticket ID: ${ticketId} in your response.` },
          { role: "user", content: `Ticket Type: ${ticketType}\nIssue: ${description}` }
        ]
      });
      aiReply = completion.choices[0].message.content || aiReply;
    } catch (aiError) {
      console.error("OpenAI failed, using fallback:", aiError);
    }

    // FIXED: Inserting client_email into Supabase
    const { error } = await supabase
      .from("support_tickets")
      .insert([{
        id: ticketId,
        client_reference: clientRef || "Unknown",
        client_email: clientEmail, // <--- SAVED HERE
        ticket_type: ticketType || "General",
        description: description || "No description provided",
        ai_response: aiReply,
        status: 'Open'
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, ai_response: aiReply, ticket_id: ticketId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}