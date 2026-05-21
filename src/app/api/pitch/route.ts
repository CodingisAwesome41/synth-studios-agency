import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// Initialize AI and Database
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Receive the pitch from the public website form
    const { clientName, email, budget, ideaDescription } = await req.json();

    // 2. Send the idea to OpenAI for instant screening
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast, cheap, and highly intelligent
      messages: [
        { 
          role: "system", 
          content: "You are an elite tech agency project screener. Read the user's project idea and budget. Classify it strictly as one of three tags: 'High Probability', 'Promising but Needs Scoping', or 'Scope Mismatch'. Do not output anything else except the exact tag." 
        },
        { 
          role: "user", 
          content: `Idea: ${ideaDescription}\nBudget: ${budget}` 
        }
      ]
    });

    const aiTag = completion.choices[0].message.content || 'Analysis Failed';

    // 3. Save the pitch AND the AI's verdict directly into Supabase
    const { error } = await supabase
      .from("client_pitches")
      .insert([{
        client_name: clientName,
        email: email,
        estimated_budget: budget,
        idea_description: ideaDescription,
        ai_assessment: aiTag
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, ai_assessment: aiTag });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}