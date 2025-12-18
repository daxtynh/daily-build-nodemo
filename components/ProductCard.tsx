'use client';

import { SaasProduct } from '@/lib/db';

interface ProductCardProps {
  product: SaasProduct;
}

function formatPrice(min: number | null, max: number | null, model: string): string {
  if (model === 'free') return 'Free';
  if (model === 'freemium') {
    if (min === 0 || min === null) return 'Free tier available';
    return `From $${min}`;
  }
  if (model === 'one-time') {
    if (min && max && min !== max) return `$${min} - $${max}`;
    return `$${min || max}`;
  }

  // Monthly/yearly
  if (min === 0 || min === null) {
    if (max) return `Free - $${max}/mo`;
    return 'Free tier available';
  }
  if (max && min !== max) return `$${min} - $${max}/mo`;
  return `$${min}/mo`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const priceDisplay = formatPrice(
    product.min_price ? Number(product.min_price) : null,
    product.max_price ? Number(product.max_price) : null,
    product.pricing_model
  );

  return (
    <div className={`relative bg-white dark:bg-zinc-900 rounded-xl border ${product.is_featured ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-zinc-200 dark:border-zinc-800'} p-6 card-hover`}>
      {product.is_featured && (
        <span className="absolute -top-3 left-4 featured-badge text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </span>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-lg flex items-center justify-center text-lg font-bold text-zinc-600 dark:text-zinc-300">
            {product.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{product.name}</h3>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>

      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
            {priceDisplay}
          </span>
        </div>
        <p className="text-emerald-600 dark:text-emerald-400 text-xs">
          {product.pricing_details}
        </p>
      </div>

      <div className="flex gap-2">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
        >
          Visit Site
        </a>
        <a
          href={product.pricing_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          View Pricing
        </a>
      </div>
    </div>
  );
}
