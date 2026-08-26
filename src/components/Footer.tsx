import React from 'react';
import { Sparkles, Heart, ShieldCheck, Smartphone, MapPin, Mail, Phone, BookOpen, Layers, Store } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'store' | 'about' | 'contacts' | 'seller') => void;
  onOpenSitemap: () => void;
  onOpenDocs: () => void;
  onOpenSellModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSitemap,
  onOpenDocs,
  onOpenSellModal,
}) => {
  return (
    <footer className="bg-[#2D3436] text-white border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gray-700/60">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B9D] flex items-center justify-center text-xl shadow-md">
                🍡
              </div>
              <span className="font-black text-2xl tracking-tight text-white">SQUISHY HAVEN</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm font-medium">
              The premier artisanal squishy marketplace in the Philippines. Providing tested sensory stress relief with authentic slow-rise formulations and instant GCash &amp; PayMongo payments.
            </p>

            {/* Verified Gateway Badges */}
            <div className="pt-2">
              <span className="text-[11px] text-[#FF6B9D] font-black block uppercase tracking-wider mb-2">Supported Payment Methods:</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-xl text-xs font-bold">
                  📱 GCash
                </span>
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-xl text-xs font-bold">
                  🟢 Maya
                </span>
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-xl text-xs font-bold">
                  💳 PayMongo
                </span>
                <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-xl text-xs font-bold">
                  🟢 GrabPay
                </span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer">
                  Store Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('seller')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-[#FF6B9D]" /> Seller Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contacts')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer">
                  Contacts &amp; Support
                </button>
              </li>
              <li>
                <button onClick={onOpenSitemap} className="hover:text-[#FF6B9D] font-bold transition-colors cursor-pointer">
                  🗺️ Website Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Squishy Models (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider">Squishy Collections</h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer text-left">
                  🧊 NeeDoh Nice Cube (Solid Gel)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer text-left">
                  🧈 4oz Salted Butter Foam (12s Rise)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer text-left">
                  🧀 Artisan Swiss Cheese Cube
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer text-left">
                  🥟 Glitter Dim Sum Bao &amp; Steamer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-[#FF6B9D] transition-colors cursor-pointer text-left">
                  🐳 Glitter Marine Aquatic Friends
                </button>
              </li>
            </ul>
          </div>

          {/* Developer & Platform Docs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-black text-sm text-white uppercase tracking-wider">Platform Architecture</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Full-stack ready for GitHub repo, Vercel edge deployment, Supabase PostgreSQL, PayMongo API, and Gemini AI.
            </p>
            
            <button
              onClick={onOpenDocs}
              className="w-full bg-[#3D4548] hover:bg-[#4a5357] border border-gray-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#FF6B9D]" />
              <span>View Tech Stack Setup Guide</span>
            </button>

            <button
              onClick={onOpenSellModal}
              className="w-full bg-[#FF6B9D] hover:bg-[#ff528a] text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <span>+ Post Your Squishy Today</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left font-medium">
          <p>© {new Date().getFullYear()} Squishy Haven Philippines Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={onOpenSitemap} className="hover:text-white cursor-pointer">Sitemap</button>
            <span>•</span>
            <button onClick={onOpenDocs} className="hover:text-white cursor-pointer">Vercel &amp; Supabase Docs</button>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> PayMongo Verified Merchant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
