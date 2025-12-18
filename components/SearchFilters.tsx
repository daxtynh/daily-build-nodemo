'use client';

import { useState, useEffect } from 'react';

interface SearchFiltersProps {
  onFilterChange: (filters: { search: string; category: string; maxPrice: string }) => void;
  categories: string[];
}

export default function SearchFilters({ onFilterChange, categories }: SearchFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, category, maxPrice });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category, maxPrice, onFilterChange]);

  const priceOptions = [
    { value: '', label: 'Any price' },
    { value: '0', label: 'Free only' },
    { value: '10', label: 'Under $10/mo' },
    { value: '25', label: 'Under $25/mo' },
    { value: '50', label: 'Under $50/mo' },
    { value: '100', label: 'Under $100/mo' },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="min-w-[160px]">
            <label htmlFor="category" className="sr-only">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="min-w-[140px]">
            <label htmlFor="price" className="sr-only">Max Price</label>
            <select
              id="price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 appearance-none cursor-pointer"
            >
              {priceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
