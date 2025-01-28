import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    const result = await pool.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );

    return NextResponse.json(
      { message: "Thank you for signing up!", user: result.rows[0] },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 400 }
      );
    }
    
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
