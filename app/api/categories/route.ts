import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT DISTINCT category FROM saas_products
      WHERE is_approved = true
      ORDER BY category
    `;
    return NextResponse.json(result.rows.map(r => r.category));
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
