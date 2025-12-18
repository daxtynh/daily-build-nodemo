'use client';

import { useState } from 'react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const categories = [
  'Analytics',
  'Authentication',
  'Customer Support',
  'Database',
  'Email',
  'Hosting & Deployment',
  'Marketing',
  'Monitoring',
  'Payments',
  'Project Management',
  'Scheduling',
  'UI Components',
  'Other',
];

const pricingModels = [
  { value: 'monthly', label: 'Monthly subscription' },
  { value: 'yearly', label: 'Yearly subscription' },
  { value: 'one-time', label: 'One-time purchase' },
  { value: 'freemium', label: 'Freemium (free tier + paid)' },
  { value: 'free', label: 'Completely free' },
];

export default function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      category: formData.get('category'),
      url: formData.get('url'),
      pricing_url: formData.get('pricing_url'),
      min_price: formData.get('min_price') ? Number(formData.get('min_price')) : null,
      max_price: formData.get('max_price') ? Number(formData.get('max_price')) : null,
      pricing_model: formData.get('pricing_model'),
      pricing_details: formData.get('pricing_details'),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit');
      }

      setSuccess(true);
      setTimeout(() => {
        onSubmit();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Submit a Tool</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Submitted!</h3>
            <p className="text-zinc-500">Your tool has been added to the directory.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Tool Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                placeholder="e.g., Stripe"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1.5">Description *</label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                placeholder="Brief description of what the tool does..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-1.5">Website URL *</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label htmlFor="pricing_url" className="block text-sm font-medium mb-1.5">Pricing Page URL *</label>
                <input
                  type="url"
                  id="pricing_url"
                  name="pricing_url"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  placeholder="https://.../pricing"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1.5">Category *</label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                >
                  <option value="">Select...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pricing_model" className="block text-sm font-medium mb-1.5">Pricing Model *</label>
                <select
                  id="pricing_model"
                  name="pricing_model"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                >
                  <option value="">Select...</option>
                  {pricingModels.map((model) => (
                    <option key={model.value} value={model.value}>{model.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="min_price" className="block text-sm font-medium mb-1.5">Min Price ($)</label>
                <input
                  type="number"
                  id="min_price"
                  name="min_price"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="max_price" className="block text-sm font-medium mb-1.5">Max Price ($)</label>
                <input
                  type="number"
                  id="max_price"
                  name="max_price"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  placeholder="99"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pricing_details" className="block text-sm font-medium mb-1.5">Pricing Details *</label>
              <textarea
                id="pricing_details"
                name="pricing_details"
                required
                rows={2}
                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                placeholder="e.g., Free tier: 1,000 requests. Pro: $29/mo for 50,000 requests"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 px-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Tool'}
              </button>
            </div>

            <p className="text-xs text-zinc-500 text-center">
              Want to be featured? After submitting, you can upgrade to a featured listing for $49/mo.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
