import React, { useState } from 'react';
import { ShoppingBag, Sparkles, User, Store, Search, Menu, X, PlusCircle, BookOpen, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile, CartItem } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'store' | 'about' | 'contacts' | 'seller';
  setActiveTab: (tab: 'home' | 'store' | 'about' | 'contacts' | 'seller') => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  currentUser: UserProfile | null;
  setIsAuthOpen: (open: boolean) => void;
  setIsDocsOpen: (open: boolean) => void;
  setIsSitemapOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSellModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  currentUser,
  setIsAuthOpen,
  setIsDocsOpen,
  setIsSitemapOpen,
  searchQuery,
  setSearchQuery,
  onOpenSellModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (tab: 'home' | 'store' | 'about' | 'contacts' | 'seller') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 text-[#2D3436] shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#FFF0F3] border-b border-pink-100 text-[#FF6B9D] text-xs py-1.5 px-4 text-center font-black flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5" />
        <span>LIMITED EDITION 2024: Use code <strong>SQUISH15</strong> for 15% OFF! Fast PayMongo &amp; GCash checkout.</span>
        <button
          onClick={() => setIsDocsOpen(true)}
          className="underline hover:text-[#2D3436] ml-2 font-bold cursor-pointer hidden md:inline-flex items-center gap-1"
        >
          <BookOpen className="w-3 h-3" /> Tech Stack Guides
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] gap-4">
          {/* Logo */}
          <div
            id="header-logo-container"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 bg-[#FF6B9D] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-sm transform group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-[#FF6B9D]">
                SQUISHY<span className="text-[#2D3436]">.STORE</span>
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="header-desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'store') setActiveTab('store');
                }}
                placeholder="Search squishies..."
                className="w-full bg-[#FFFBFB] border border-pink-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-[#2D3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D3436] text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-sm">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] font-black'
                  : 'text-[#2D3436] hover:text-[#FF6B9D]'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-store"
              onClick={() => handleNavClick('store')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'store'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] font-black'
                  : 'text-[#2D3436] hover:text-[#FF6B9D]'
              }`}
            >
              Store Page
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'about'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] font-black'
                  : 'text-[#2D3436] hover:text-[#FF6B9D]'
              }`}
            >
              About Us
            </button>
            <button
              id="nav-link-contacts"
              onClick={() => handleNavClick('contacts')}
              className={`transition-colors cursor-pointer ${
                activeTab === 'contacts'
                  ? 'text-[#FF6B9D] border-b-2 border-[#FF6B9D] font-black'
                  : 'text-[#2D3436] hover:text-[#FF6B9D]'
              }`}
            >
              Contacts
            </button>
            <button
              id="nav-link-seller"
              onClick={() => handleNavClick('seller')}
              className={`text-sm font-bold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'seller'
                  ? 'bg-[#FF6B9D] text-white font-black shadow-sm'
                  : 'bg-[#FFF0F3] text-[#FF6B9D] hover:bg-[#ffe3ea] border border-pink-200'
              }`}
            >
              Seller Dashboard
            </button>
          </nav>

          {/* Action Buttons & Verified GCash Tag */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* GCash Verified Phone Display */}
            <div className="text-right hidden sm:block">
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">GCash Verified</p>
              <p className="text-xs font-mono font-black text-[#2D3436]">
                {currentUser?.gcashNumber || '0917-555-0123'}
              </p>
            </div>

            {/* Auth / Register Button */}
            <button
              id="btn-user-auth-header"
              onClick={() => setIsAuthOpen(true)}
              className="bg-[#2D3436] hover:bg-black text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-black transition-colors cursor-pointer"
            >
              {currentUser ? currentUser.name.split(' ')[0] : 'Register'}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="btn-open-cart-header"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#FF6B9D] hover:bg-[#ff528a] text-white rounded-xl shadow-[0_4px_12px_rgba(255,107,157,0.35)] transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2D3436] text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D3436] hover:text-[#FF6B9D] bg-[#FFF0F3] rounded-xl border border-pink-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <div className="relative w-full mb-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'store') setActiveTab('store');
              }}
              placeholder="Search squishies..."
              className="w-full bg-[#FFFBFB] border border-pink-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-[#2D3436]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-2.5 rounded-xl text-left text-sm font-black ${activeTab === 'home' ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F3] text-[#2D3436]'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('store')}
              className={`p-2.5 rounded-xl text-left text-sm font-black ${activeTab === 'store' ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F3] text-[#2D3436]'}`}
            >
              Store Page
            </button>
            <button
              onClick={() => handleNavClick('seller')}
              className={`p-2.5 rounded-xl text-left text-sm font-black ${activeTab === 'seller' ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F3] text-[#FF6B9D]'}`}
            >
              Seller Dashboard
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`p-2.5 rounded-xl text-left text-sm font-black ${activeTab === 'about' ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F3] text-[#2D3436]'}`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contacts')}
              className={`p-2.5 rounded-xl text-left text-sm font-black ${activeTab === 'contacts' ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F3] text-[#2D3436]'}`}
            >
              Contacts
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSitemapOpen(true);
              }}
              className="p-2.5 rounded-xl text-left text-sm font-black bg-[#FFF0F3] text-[#2D3436]"
            >
              Sitemap
            </button>
          </div>

          <div className="pt-2 border-t border-pink-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="flex-1 bg-[#FF6B9D] text-white font-black py-2.5 rounded-xl text-center text-xs uppercase tracking-wider shadow-sm"
            >
              + Sell Squishy
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDocsOpen(true);
              }}
              className="px-3 bg-white text-[#2D3436] border border-pink-200 font-bold py-2.5 rounded-xl text-xs"
            >
              Tech Stack Info
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
