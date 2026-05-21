import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // 1. Added projectTitle to the incoming request
    const { clientName, email, projectTitle, budget, ideaDescription } = await req.json();

    // TEMPORARY BYPASS: Randomly assign a tag instead of paying OpenAI
    const tags = ['High Probability', 'Promising but Needs Scoping', 'Scope Mismatch'];
    const mockAiTag = tags[Math.floor(Math.random() * tags.length)];

    // 2. Added project_title to the database insert
    const { error } = await supabase
      .from("client_pitches")
      .insert([{
        client_name: clientName,
        email: email,
        project_title: projectTitle, 
        estimated_budget: budget,
        idea_description: ideaDescription,
        ai_assessment: mockAiTag
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, ai_assessment: mockAiTag });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}