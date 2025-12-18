import { sql } from '@vercel/postgres';
import { seedProducts } from '@/lib/seed-data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS saas_products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        url VARCHAR(500) NOT NULL,
        pricing_url VARCHAR(500) NOT NULL,
        min_price DECIMAL(10, 2),
        max_price DECIMAL(10, 2),
        pricing_model VARCHAR(50) NOT NULL,
        pricing_details TEXT NOT NULL,
        is_featured BOOLEAN DEFAULT FALSE,
        is_approved BOOLEAN DEFAULT TRUE,
        submitted_at TIMESTAMP DEFAULT NOW(),
        logo_url VARCHAR(500)
      )
    `;

    // Check if we already have data
    const existing = await sql`SELECT COUNT(*) as count FROM saas_products`;
    if (parseInt(existing.rows[0].count) > 0) {
      return NextResponse.json({ message: 'Database already seeded', count: existing.rows[0].count });
    }

    // Insert seed data
    for (const product of seedProducts) {
      await sql`
        INSERT INTO saas_products (name, description, category, url, pricing_url, min_price, max_price, pricing_model, pricing_details, logo_url, is_featured)
        VALUES (${product.name}, ${product.description}, ${product.category}, ${product.url}, ${product.pricing_url}, ${product.min_price}, ${product.max_price}, ${product.pricing_model}, ${product.pricing_details}, ${product.logo_url}, ${Math.random() > 0.7})
      `;
    }

    return NextResponse.json({ message: 'Database seeded successfully', count: seedProducts.length });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
