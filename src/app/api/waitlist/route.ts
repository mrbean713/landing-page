import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '', // Your Supabase project URL
  process.env.SUPABASE_ANON_KEY || '' // Your Supabase anon/public API key
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Insert email into the 'waitlist' table in Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select(); // Ensures data is returned in the correct format

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Database error occurred." },
        { status: 500 }
      );
    }

    // Ensure `data` is valid before returning
    if (!data || (data as any[]).length === 0) {
      return NextResponse.json(
        { error: "Failed to insert email into the database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Thank you for signing up!", user: data[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
