import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { startTime, duration, type } = await req.json();

  if (!startTime || !duration || !type) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("pomodoros").insert({
      start_time: startTime,
      duration,
      type,
    });
    if (error) throw new Error(error.message);

    return NextResponse.json({
      success: true,
      message: "create pomodoro success",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
