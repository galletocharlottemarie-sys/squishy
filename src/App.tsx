import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StoreCatalog } from './components/StoreCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellerDashboard } from './components/SellerDashboard';
import { AboutUs } from './components/AboutUs';
import { Contacts } from './components/Contacts';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { AiChatbot } from './components/AiChatbot';
import { SitemapModal } from './components/SitemapModal';
import { DocsModal } from './components/DocsModal';
import { Footer } from './components/Footer';
import { initialProducts } from './data/initialProducts';
import { Product, CartItem, Review, UserProfile, Order } from './types';
import { Sparkles, ShieldCheck, Heart, Zap, Award, CheckCircle2, ArrowRight, Store } from 'lucide-react';

export default function App() {
  // Global Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'about' | 'contacts' | 'seller'>('home');
  
  // Marketplace Products State (seeded from initialProducts + localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('squishy_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialProducts;
  });

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('squishy_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { product: initialProducts[0], quantity: 1 } // 1 Nice Cube in cart as welcome demo
    ];
  });

  // User Profile & Authentication State (with GCash Number)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('squishy_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr-demo-01',
      name: 'Maria Santos',
      email: 'maria.santos@squishymail.ph',
      gcashNumber: '0917-882-9901',
      role: 'both',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      balancePhp: 850.0,
      joinedDate: '2026-08-01',
      isGcashVerified: true
    };
  });

  // Modals & Drawers States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Orders History
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('squishy_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  // Save products to localStorage on update
  useEffect(() => {
    localStorage.setItem('squishy_products', JSON.stringify(products));
  }, [products]);

  // Save cart to localStorage on update
  useEffect(() => {
    localStorage.setItem('squishy_cart', JSON.stringify(cart));
  }, [cart]);

  // Save user profile to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('squishy_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('squishy_user');
    }
  }, [currentUser]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('squishy_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Management Handlers
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setAppliedDiscount(discount);
    setAppliedCouponCode(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Review Submission Handler
  const handleAddReview = (productId: string, review: Review) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [review, ...p.reviews];
          const newAvg =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
            updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            rating: Number(newAvg.toFixed(1)),
            reviewCount: updatedReviews.length,
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      const updatedReviews = [review, ...selectedProduct.reviews];
      const newAvg =
        updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
        updatedReviews.length;
      setSelectedProduct({
        ...selectedProduct,
        reviews: updatedReviews,
        rating: Number(newAvg.toFixed(1)),
        reviewCount: updatedReviews.length,
      });
    }
  };

  // Seller Product Creation Handler
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleOrderComplete = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] text-[#2D3436] font-sans antialiased selection:bg-[#FF6B9D] selection:text-white flex flex-col">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        currentUser={currentUser}
        setIsAuthOpen={setIsAuthOpen}
        setIsDocsOpen={setIsDocsOpen}
        setIsSitemapOpen={setIsSitemapOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSellModal={() => setActiveTab('seller')}
      />

      {/* Main Page Routing Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Rule of Thirds Hero + Tactile Simulator */}
            <Hero
              onShopClick={() => setActiveTab('store')}
              onSellClick={() => setActiveTab('seller')}
              featuredProduct={products[0]}
              onSelectProduct={setSelectedProduct}
            />

            {/* Principles of Design Features Section: Contrast & Hierarchical Topography */}
            <section className="py-16 sm:py-20 bg-white border-y border-pink-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <p className="text-[#FF6B9D] font-black uppercase tracking-[0.2em] text-xs">
                    Sensory Ergonomics &amp; Safety
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D3436]">
                    Engineered for Instant Stress Relief
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base font-medium">
                    Discover the science behind our certified non-toxic memory formulations, slow-rise rebound durations, and velvety textures.
                  </p>
                </div>

                {/* 3-Column Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-[#FFFBFB] border border-pink-100 rounded-3xl p-8 space-y-4 hover:border-[#FF6B9D] transition-all shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center text-2xl font-bold">
                      ⏱️
                    </div>
                    <h3 className="text-xl font-black text-[#2D3436]">12-Second Slow-Rise</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      Micro-cellular viscoelastic foam rebounds gently over 8 to 15 seconds, creating a satisfying visual and tactile cadence for anxiety relief.
                    </p>
                  </div>

                  <div className="bg-[#FFFBFB] border border-pink-100 rounded-3xl p-8 space-y-4 hover:border-[#FF6B9D] transition-all shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center text-2xl font-bold">
                      🛡️
                    </div>
                    <h3 className="text-xl font-black text-[#2D3436]">Certified Non-Toxic</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      100% BPA-free, lead-free polyurethane and food-grade silicone elastomers. Hypoallergenic, washable, and gentle on sensitive skin.
                    </p>
                  </div>

                  <div className="bg-[#FFFBFB] border border-pink-100 rounded-3xl p-8 space-y-4 hover:border-[#FF6B9D] transition-all shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] text-[#FF6B9D] flex items-center justify-center text-2xl font-bold">
                      💳
                    </div>
                    <h3 className="text-xl font-black text-[#2D3436]">PayMongo &amp; GCash Native</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      Enjoy instant QR code checkout, GCash mobile wallet integration, and direct seller disbursements without listing fees.
                    </p>
                  </div>
                </div>

                {/* Call To Action Banner */}
                <div className="bg-gradient-to-r from-[#FFF0F3] via-[#FFF0F5] to-white border border-pink-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                  <div className="space-y-2 text-center md:text-left">
                    <p className="text-[#FF6B9D] font-black uppercase tracking-[0.2em] text-xs">Join The Community</p>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#2D3436]">Ready to Squish and Unwind?</h3>
                    <p className="text-sm text-gray-500 font-medium">Browse our best-selling artisanal Nice Cubes, butter sticks, and dim sum bao.</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('store')}
                      className="bg-[#FF6B9D] hover:bg-[#ff528a] text-white font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-[0_8px_16px_rgba(255,107,157,0.3)] flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('seller')}
                      className="border-2 border-[#2D3436] text-[#2D3436] hover:bg-[#2D3436] hover:text-white font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Store className="w-4 h-4" />
                      <span>Post a Squishy</span>
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Featured Store Catalog Preview on Home */}
            <StoreCatalog
              products={products}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onDirectBuy={(product) => {
                handleAddToCart(product, 1);
                setIsCheckoutOpen(true);
              }}
              onOpenSellModal={() => setActiveTab('seller')}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {/* VIEW 2: STORE PAGE */}
        {activeTab === 'store' && (
          <StoreCatalog
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onDirectBuy={(product) => {
              handleAddToCart(product, 1);
              setIsCheckoutOpen(true);
            }}
            onOpenSellModal={() => setActiveTab('seller')}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* VIEW 3: SELLER DASHBOARD */}
        {activeTab === 'seller' && (
          <SellerDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            currentUser={currentUser}
            setIsAuthOpen={setIsAuthOpen}
          />
        )}

        {/* VIEW 4: ABOUT US */}
        {activeTab === 'about' && (
          <AboutUs onShopClick={() => setActiveTab('store')} />
        )}

        {/* VIEW 5: CONTACTS */}
        {activeTab === 'contacts' && (
          <Contacts />
        )}

      </main>

      {/* Floating AI Chatbot Assistant (Voiceflow / Gemini) */}
      <AiChatbot
        products={products}
        onSelectProduct={setSelectedProduct}
      />

      {/* Product Detail & Review Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
        currentUser={currentUser}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* PayMongo & GCash Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={appliedDiscount}
        onClearCart={() => setCart([])}
        currentUser={currentUser}
        onOrderComplete={handleOrderComplete}
      />

      {/* User Registration & GCash Input Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onSaveProfile={setCurrentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Interactive Website Sitemap Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Full Tech Stack & Vercel/PayMongo Configuration Docs Modal */}
      <DocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Global Footer with Sitemap & PayMongo Badges */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenSellModal={() => setActiveTab('seller')}
      />

    </div>
  );
}
