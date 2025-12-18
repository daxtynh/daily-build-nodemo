import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    let query = `
      SELECT * FROM saas_products
      WHERE is_approved = true
    `;

    if (category && category !== 'all') {
      query += ` AND category = '${category.replace(/'/g, "''")}'`;
    }

    if (maxPrice) {
      query += ` AND (min_price <= ${parseInt(maxPrice)} OR min_price IS NULL OR min_price = 0)`;
    }

    if (search) {
      const searchTerm = search.toLowerCase().replace(/'/g, "''");
      query += ` AND (LOWER(name) LIKE '%${searchTerm}%' OR LOWER(description) LIKE '%${searchTerm}%' OR LOWER(category) LIKE '%${searchTerm}%')`;
    }

    query += ` ORDER BY is_featured DESC, submitted_at DESC`;

    const result = await sql.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, url, pricing_url, min_price, max_price, pricing_model, pricing_details } = body;

    if (!name || !description || !category || !url || !pricing_url || !pricing_model || !pricing_details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO saas_products (name, description, category, url, pricing_url, min_price, max_price, pricing_model, pricing_details, is_approved)
      VALUES (${name}, ${description}, ${category}, ${url}, ${pricing_url}, ${min_price || null}, ${max_price || null}, ${pricing_model}, ${pricing_details}, true)
      RETURNING id
    `;

    return NextResponse.json({ id: result.rows[0].id, message: 'Product submitted successfully' });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
