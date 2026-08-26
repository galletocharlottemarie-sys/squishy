import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, PlusCircle, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface StoreCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onDirectBuy: (product: Product, e: React.MouseEvent) => void;
  onOpenSellModal: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onDirectBuy,
  onOpenSellModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFirmness, setSelectedFirmness] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    { id: 'all', label: 'All Squishies', icon: '✨' },
    { id: 'super-solid', label: 'Nice Cube / Solid Gel', icon: '🧊' },
    { id: 'butter-foam', label: 'Slow-Rise Butter Foam', icon: '🧈' },
    { id: 'cheese-cube', label: 'Cheese & Novelty', icon: '🧀' },
    { id: 'dim-sum', label: 'Dim Sum Bao Steamers', icon: '🥟' },
    { id: 'glitter-animals', label: 'Glitter Marine Squad', icon: '🐳' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.category === selectedCategory;
        const matchesFirmness =
          selectedFirmness === 'all' || p.firmness === selectedFirmness;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.scent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesFirmness && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'slow-rise') return b.slowRiseDuration - a.slowRiseDuration;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedFirmness, searchQuery, sortBy]);

  return (
    <section id="store-catalog-section" className="py-12 sm:py-16 bg-[#FFFBFB] text-[#2D3436] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-pink-100">
          <div>
            <p className="text-[#FF6B9D] font-black uppercase tracking-[0.2em] text-xs mb-2">
              Artisanal Sensory Marketplace
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D3436]">
              Browse Squishy Catalog
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              Showing {filteredProducts.length} sensory stress-relief items available for instant PayMongo &amp; GCash checkout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSellModal}
              className="bg-[#2D3436] hover:bg-black text-white font-black px-5 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#FF6B9D]" />
              <span>Post Your Squishy</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="py-6 space-y-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF6B9D] text-white shadow-[0_4px_12px_rgba(255,107,157,0.35)]'
                    : 'bg-white text-[#2D3436] hover:bg-[#FFF0F3] hover:text-[#FF6B9D] border border-pink-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search, Firmness, Sort Row */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by scent, name, texture, or seller..."
                className="w-full bg-white border border-pink-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent transition-all"
              />
            </div>

            {/* Firmness Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedFirmness}
                onChange={(e) => setSelectedFirmness(e.target.value)}
                className="w-full bg-white border border-pink-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] cursor-pointer"
              >
                <option value="all">All Firmness Types</option>
                <option value="Ultra Soft">Ultra Soft (Bakery Memory Foam)</option>
                <option value="Medium Squish">Medium Squish (Bao &amp; Cheese)</option>
                <option value="Super Solid">Super Solid (Nice Cube Gel)</option>
                <option value="Jelly Stretch">Jelly Stretch (Aquatic Silicone)</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-pink-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] cursor-pointer"
              >
                <option value="featured">Sort: Featured Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="slow-rise">Slowest Rise Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-3xl p-12 text-center my-8 space-y-4 shadow-sm">
            <div className="text-4xl">🍡</div>
            <h3 className="text-xl font-black text-[#2D3436]">No squishies match your search filter</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto font-medium">
              Try adjusting your search terms, clearing the firmness filter, or be the first to post a new squishy!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFirmness('all');
              }}
              className="bg-[#FF6B9D] hover:bg-[#ff528a] text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                onDirectBuy={onDirectBuy}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
