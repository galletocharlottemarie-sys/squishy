import React from 'react';
import { Star, ShoppingBag, Zap, Heart, Eye, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onDirectBuy: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onDirectBuy,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group bg-white border border-pink-100 hover:border-[#FF6B9D] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 relative text-[#2D3436]"
    >
      {/* Image Stage */}
      <div className="relative aspect-square w-full bg-[#FFF0F3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#FFD93D] text-[#2D3436] font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#FF6B9D] text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Slow Rise Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md border border-pink-100 px-2.5 py-1 rounded-xl text-[11px] font-black text-[#FF6B9D] flex items-center gap-1 shadow-sm">
          <Zap className="w-3 h-3 text-[#FF6B9D] fill-[#FF6B9D]" />
          <span>{product.slowRiseDuration}s Rise</span>
        </div>

        {/* Scent Bubble */}
        <div className="absolute bottom-3 right-3 bg-[#2D3436]/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-white truncate max-w-[120px] shadow-sm">
          {product.scent}
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Verified Seller */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-black text-[#FF6B9D] uppercase tracking-wider text-[11px]">
              {product.categoryLabel}
            </span>
            <span className="flex items-center gap-0.5 text-emerald-600 font-bold text-[11px]">
              <ShieldCheck className="w-3 h-3" /> {product.sellerName.split(' ')[0]}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-black text-base sm:text-lg text-[#2D3436] group-hover:text-[#FF6B9D] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed font-medium">
            {product.tagline}
          </p>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center text-[#FFD93D] text-xs">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#FFD93D] text-[#FFD93D]'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-black text-[#2D3436]">{product.rating}</span>
            <span className="text-xs text-gray-400 font-medium">({product.reviewCount || 0})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-pink-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-[#FF6B9D]">₱{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">₱{product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`btn-cart-${product.id}`}
              onClick={(e) => onAddToCart(product, e)}
              className="p-2.5 bg-[#FFF0F3] hover:bg-[#ffe3ea] text-[#FF6B9D] rounded-xl border border-pink-200 transition-colors cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              id={`btn-buy-${product.id}`}
              onClick={(e) => onDirectBuy(product, e)}
              className="bg-[#FF6B9D] hover:bg-[#ff528a] text-white font-black text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(255,107,157,0.3)] active:scale-95 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
