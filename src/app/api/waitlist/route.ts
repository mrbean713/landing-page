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
      .insert([{ email }]);

    if (error) {
      // Handle unique constraint violation (email already exists)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 400 }
        );
      }
      // Log and return other database errors
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Database error occurred." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Thank you for signing up!", user: data[0] },
      { status: 200 }
    );
  } catch (error) {
    // Catch and handle unexpected errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
