import { sql } from '@vercel/postgres';
import ProductGrid from '@/components/ProductGrid';
import { SaasProduct } from '@/lib/db';

async function getProducts(): Promise<SaasProduct[]> {
  try {
    const result = await sql`
      SELECT * FROM saas_products
      WHERE is_approved = true
      ORDER BY is_featured DESC, submitted_at DESC
    `;
    return result.rows as SaasProduct[];
  } catch {
    return [];
  }
}

async function getCategories(): Promise<string[]> {
  try {
    const result = await sql`
      SELECT DISTINCT category FROM saas_products
      WHERE is_approved = true
      ORDER BY category
    `;
    return result.rows.map(r => r.category as string);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">NoDemo</h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Transparent pricing only</p>
              </div>
            </div>
            <a
              href="https://twitter.com/intent/tweet?text=Found%20this%20awesome%20directory%20of%20SaaS%20tools%20with%20transparent%20pricing%20%E2%80%94%20no%20more%20%22Request%20Demo%22%20BS!&url="
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            SaaS tools that show their prices
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Every tool listed has <span className="text-emerald-600 dark:text-emerald-400 font-semibold">public pricing</span>.
            No &ldquo;Request Demo&rdquo;. No &ldquo;Contact Sales&rdquo;. Just transparent prices.
          </p>
        </div>

        <ProductGrid initialProducts={products} initialCategories={categories} />
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              Built for developers who hate &ldquo;Request Demo&rdquo; buttons
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span>Want to be featured? $49/mo</span>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Terms</a>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
