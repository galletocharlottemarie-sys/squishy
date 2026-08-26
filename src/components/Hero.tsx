import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Heart, Star, Store, Smartphone, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onSellClick: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onSellClick,
  onSelectProduct,
  featuredProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFBFB] via-[#FFFBFB] to-[#FFF0F5] border-b border-pink-100 text-[#2D3436]">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B9D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Rule of Thirds Asymmetric 7:5 Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 7-Column Section: Bold Display Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <p className="text-[#FF6B9D] font-black uppercase tracking-[0.2em] mb-4 text-xs sm:text-sm">
              Limited Edition 2024
            </p>

            <h1 className="text-5xl sm:text-7xl lg:text-[84px] xl:text-[96px] leading-[0.92] font-black tracking-tighter mb-6 text-[#2D3436]">
              SQUISHY <br />
              <span className="text-[#FF6B9D]">HEAVEN.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 max-w-lg mb-8 leading-relaxed font-medium">
              Collect the world's softest, slowest-rising premium squishies. Verified sellers and secure GCash &amp; PayMongo payments. Join the community today.
            </p>

            {/* Dual High-Impact Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                id="hero-primary-shop-cta"
                onClick={onShopClick}
                className="bg-[#FF6B9D] hover:bg-[#ff528a] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-[0_10px_20px_rgba(255,107,157,0.3)] hover:scale-105 transition-transform cursor-pointer text-center"
              >
                SHOP THE COLLECTION
              </button>

              <button
                id="hero-secondary-seller-cta"
                onClick={onSellClick}
                className="border-2 border-[#2D3436] text-[#2D3436] hover:bg-[#2D3436] hover:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer text-center"
              >
                SELL YOURS
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-pink-100 grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center font-bold">
                  📱
                </div>
                <div>
                  <p className="font-black text-[#2D3436]">GCash &amp; PayMongo</p>
                  <p className="text-[10px] text-gray-400 font-bold">Instant Payouts</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center font-bold">
                  ⏱️
                </div>
                <div>
                  <p className="font-black text-[#2D3436]">12s Slow-Rise</p>
                  <p className="text-[10px] text-gray-400 font-bold">Memory Foam</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <p className="font-black text-[#2D3436]">100% Non-Toxic</p>
                  <p className="text-[10px] text-gray-400 font-bold">BPA-Free Safe</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Column Section: Featured Reviews & Squish-AI Assistant Box */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Featured Reviews Card */}
            <div className="p-6 sm:p-7 bg-white rounded-3xl border border-pink-100 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#FF6B9D] block">Community Praise</span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#2D3436]">Featured Reviews</h2>
                </div>
                <div className="flex gap-0.5 text-[#FFD93D]">
                  <span className="text-lg">★</span>
                  <span className="text-lg">★</span>
                  <span className="text-lg">★</span>
                  <span className="text-lg">★</span>
                  <span className="text-lg">★</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-[#FDF2F5] rounded-2xl border border-pink-100">
                  <p className="text-xs sm:text-sm italic mb-2 text-[#2D3436] font-medium leading-relaxed">
                    "The Nice Cube is so soft and stress-relieving! Delivery was super fast with GCash checkout."
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-xs font-black">
                      B
                    </div>
                    <span className="text-xs font-bold text-[#2D3436]">@BunnyCollector • 5/5 Stars</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-xs">
                  <p className="text-xs sm:text-sm italic mb-2 text-[#2D3436] font-medium leading-relaxed">
                    "Earning ₱5,000/week selling my custom squishies here. Best seller dashboard in PH!"
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#2D3436] text-white flex items-center justify-center text-xs font-black">
                      S
                    </div>
                    <span className="text-xs font-bold text-[#2D3436]">@SquishArtist • 5/5 Stars</span>
                  </div>
                </div>
              </div>

              {/* Bestseller Preview Shortcut */}
              <div
                onClick={() => onSelectProduct(featuredProduct)}
                className="mt-3 pt-3 border-t border-pink-100 flex items-center justify-between cursor-pointer group hover:text-[#FF6B9D] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#FF6B9D]">✨ Top Bestseller:</span>
                  <span className="text-xs font-bold text-[#2D3436] group-hover:text-[#FF6B9D]">{featuredProduct.name}</span>
                </div>
                <span className="text-xs font-black text-[#FF6B9D] flex items-center gap-1">
                  ₱{featuredProduct.price} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Squish-AI Assistant Box */}
            <div className="bg-[#2D3436] p-6 rounded-3xl text-white relative overflow-hidden shadow-md">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                    <span>Squish-AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-[#FF6B9D] animate-ping" />
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B9D] bg-white/10 px-2 py-0.5 rounded-full">
                    Gemini 2.5
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3 font-medium">Instant recommendations &amp; seller guidance</p>
                
                <div className="bg-[#3D4548] p-3 rounded-xl text-xs mb-3 text-gray-200 leading-relaxed font-medium">
                  👋 Hi! Need help choosing slow-rise squishies, verifying GCash, or listing your toys?
                </div>

                <div
                  onClick={onShopClick}
                  className="w-full bg-[#1A1F21] border border-gray-700/50 rounded-xl p-2.5 text-xs text-gray-400 flex items-center justify-between cursor-pointer hover:border-[#FF6B9D] transition-colors"
                >
                  <span>Ask AI anything or browse catalog...</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6B9D]" />
                </div>
              </div>

              {/* Pink Accent Glow in Background */}
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#FF6B9D] rounded-full opacity-20 blur-2xl pointer-events-none" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
