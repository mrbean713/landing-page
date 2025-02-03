import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(request: Request) {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

  try {
    const { email } = await request.json();

    // Insert email into the 'waitlist' table in Supabase and return the inserted record
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select(); // Ensures `data` is returned

    if (error) {
      // Handle unique constraint violation (email already exists)
      if (error.code === '23505') {
        return NextResponse.json(
          { message: "This email is already on the waitlist." }, // Now returns 200 instead of 500
          { status: 200 }
        );
      }
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message || "Database error occurred." },
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
