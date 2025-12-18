'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import SearchFilters from './SearchFilters';
import SubmitModal from './SubmitModal';
import { SaasProduct } from '@/lib/db';

interface ProductGridProps {
  initialProducts: SaasProduct[];
  initialCategories: string[];
}

export default function ProductGrid({ initialProducts, initialCategories }: ProductGridProps) {
  const [products, setProducts] = useState<SaasProduct[]>(initialProducts);
  const [categories] = useState<string[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = useCallback(async (filters: { search: string; category: string; maxPrice: string }) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.category && filters.category !== 'all') params.set('category', filters.category);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmitSuccess = () => {
    setShowModal(false);
    fetchProducts({ search: '', category: 'all', maxPrice: '' });
  };

  return (
    <>
      <SearchFilters onFilterChange={fetchProducts} categories={categories} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          {loading ? 'Loading...' : `${products.length} tools with transparent pricing`}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Submit a Tool
        </button>
      </div>

      {products.length === 0 && !loading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No tools found</h3>
          <p className="text-zinc-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <SubmitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitSuccess}
      />
    </>
  );
}
