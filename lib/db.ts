import { sql } from '@vercel/postgres';

export interface SaasProduct {
  id: number;
  name: string;
  description: string;
  category: string;
  url: string;
  pricing_url: string;
  min_price: number | null;
  max_price: number | null;
  pricing_model: 'monthly' | 'yearly' | 'one-time' | 'free' | 'freemium';
  pricing_details: string;
  is_featured: boolean;
  is_approved: boolean;
  submitted_at: string;
  logo_url: string | null;
}

export async function initDatabase() {
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
}

export async function getProducts(options?: {
  category?: string;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
}) {
  let query = `
    SELECT * FROM saas_products
    WHERE is_approved = true
  `;

  const conditions: string[] = [];

  if (options?.category && options.category !== 'all') {
    conditions.push(`category = '${options.category}'`);
  }

  if (options?.maxPrice) {
    conditions.push(`(min_price <= ${options.maxPrice} OR min_price IS NULL)`);
  }

  if (options?.search) {
    const searchTerm = options.search.toLowerCase().replace(/'/g, "''");
    conditions.push(`(LOWER(name) LIKE '%${searchTerm}%' OR LOWER(description) LIKE '%${searchTerm}%')`);
  }

  if (options?.featured) {
    conditions.push(`is_featured = true`);
  }

  if (conditions.length > 0) {
    query += ` AND ${conditions.join(' AND ')}`;
  }

  query += ` ORDER BY is_featured DESC, submitted_at DESC`;

  const result = await sql.query(query);
  return result.rows as SaasProduct[];
}

export async function getCategories() {
  const result = await sql`
    SELECT DISTINCT category FROM saas_products
    WHERE is_approved = true
    ORDER BY category
  `;
  return result.rows.map(r => r.category as string);
}

export async function addProduct(product: Omit<SaasProduct, 'id' | 'is_featured' | 'is_approved' | 'submitted_at'>) {
  const result = await sql`
    INSERT INTO saas_products (name, description, category, url, pricing_url, min_price, max_price, pricing_model, pricing_details, logo_url)
    VALUES (${product.name}, ${product.description}, ${product.category}, ${product.url}, ${product.pricing_url}, ${product.min_price}, ${product.max_price}, ${product.pricing_model}, ${product.pricing_details}, ${product.logo_url})
    RETURNING id
  `;
  return result.rows[0].id;
}

export async function setFeatured(id: number, featured: boolean) {
  await sql`
    UPDATE saas_products SET is_featured = ${featured} WHERE id = ${id}
  `;
}
