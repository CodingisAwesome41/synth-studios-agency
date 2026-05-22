import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const resend = new Resend(process.env.RESEND_API_KEY);

    const payload = await req.json();
    const ticket = payload.record;

    if (ticket.status !== 'Resolved') {
      return NextResponse.json({ message: "Ignored: Status is not Resolved." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are the automated Operations AI for Synth Studios. A client submitted a bug report which has now been fixed by the engineering team. Draft a highly professional, brief (3-4 sentences) email to the client informing them that their issue has been resolved. Be polite and technical. Do NOT use placeholders like [Client Name]." },
        { role: "user", content: `Ticket ID: ${ticket.id}\nOriginal Issue: ${ticket.description}` }
      ]
    });

    const aiEmailBody = completion.choices[0].message.content || "Your ticket has been resolved.";

    // FIXED: Now we send the email directly to the 'your_actual_personal_email@gmail.com' !
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: ['somilsoni41@gmail.com'], 
      subject: `[Resolved] Support Ticket ${ticket.id}`,
      text: aiEmailBody,
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "AI Dispatch Sent." });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}