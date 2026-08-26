import React, { useState } from 'react';
import { PlusCircle, Store, DollarSign, Package, Zap, ShieldCheck, Upload, Trash2, Edit3, CheckCircle2, Smartphone, ArrowUpRight } from 'lucide-react';
import { Product, UserProfile } from '../types';

interface SellerDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  currentUser: UserProfile | null;
  setIsAuthOpen: (open: boolean) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
  currentUser,
  setIsAuthOpen,
}) => {
  const [activeTab, setActiveTab] = useState<'post' | 'listings' | 'payouts'>('post');
  
  // Form State for Posting New Squishy
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(299);
  const [originalPrice, setOriginalPrice] = useState<number>(380);
  const [stock, setStock] = useState<number>(25);
  const [category, setCategory] = useState<Product['category']>('butter-foam');
  const [categoryLabel, setCategoryLabel] = useState('Slow-Rise Butter Foam');
  const [texture, setTexture] = useState('Velvety Memory Foam');
  const [slowRiseDuration, setSlowRiseDuration] = useState<number>(8);
  const [firmness, setFirmness] = useState<Product['firmness']>('Ultra Soft');
  const [scent, setScent] = useState('Sweet Vanilla Pastry');
  const [dimensions, setDimensions] = useState('10 x 8 x 6 cm');
  const [weight, setWeight] = useState('120g');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80');
  const [sellerGcash, setSellerGcash] = useState(currentUser?.gcashNumber || '0917-000-1234');
  const [sellerName, setSellerName] = useState(currentUser?.name || 'Artisan Squishy Crafter');
  const [postSuccess, setPostSuccess] = useState(false);

  // Preset images for easy testing & realistic user posting
  const presetImages = [
    { label: 'Butter Stick', url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Nice Cube Solid', url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80' },
    { label: 'Swiss Cheese', url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dim Sum Bao', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Glitter Marine', url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newProduct: Product = {
      id: `custom-squishy-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Handcrafted slow-rising sensory squishy',
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      category,
      categoryLabel,
      texture,
      slowRiseDuration: Number(slowRiseDuration),
      firmness,
      scent,
      dimensions,
      weight,
      image: imageUrl,
      sellerId: currentUser?.id || `seller-${Date.now()}`,
      sellerName: sellerName.trim(),
      sellerGcash: sellerGcash.trim(),
      rating: 5.0,
      reviewCount: 0,
      isNewArrival: true,
      sensoryBenefits: [
        'Stress and anxiety reduction during work or study',
        'Custom tactile rebound formulation',
        'Washable skin and non-toxic safety'
      ],
      reviews: []
    };

    onAddProduct(newProduct);
    setPostSuccess(true);
    setName('');
    setTagline('');
    setDescription('');
    setTimeout(() => {
      setPostSuccess(false);
      setActiveTab('listings');
    }, 2000);
  };

  // Mock Earnings
  const totalSalesPhp = 8450;
  const pendingPayoutPhp = 2450;

  return (
    <div className="py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Store className="w-3.5 h-3.5" />
              <span>Seller Hub &amp; GCash Payout Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Seller Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              List your handcrafted or collectible squishies, manage orders, and receive payouts directly to your GCash number.
            </p>
          </div>

          {/* Quick Seller Profile Indicator */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Registered GCash Payout:</p>
              <p className="text-sm font-bold text-white flex items-center gap-1">
                {currentUser?.gcashNumber || sellerGcash}
                <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">Verified</span>
              </p>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-xs text-rose-400 hover:underline font-semibold ml-2"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 my-8 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('post')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'post'
                ? 'border-b-2 border-amber-500 text-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Squishy</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'border-b-2 border-amber-500 text-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Active Listings ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payouts')}
            className={`pb-3 px-4 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'payouts'
                ? 'border-b-2 border-amber-500 text-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>GCash Payouts &amp; Earnings</span>
          </button>
        </div>

        {/* Tab 1: Post New Squishy Form */}
        {activeTab === 'post' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Create New Squishy Listing</h2>
                  <p className="text-xs text-slate-400">Post items to the marketplace. 0% listing fees for Philippine sellers.</p>
                </div>
                {postSuccess && (
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 className="w-4 h-4" /> Squishy Listed Successfully!
                  </div>
                )}
              </div>

              <form onSubmit={handlePostProduct} className="space-y-5 text-xs sm:text-sm">
                
                {/* Title & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Squishy Product Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jumbo Strawberry Donut Slow-Rise"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Short Tagline *</label>
                    <input
                      type="text"
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. 10-second ultra slow rebound with berry glaze"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Detailed Sensory Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the tactile feel, density, memory foam rebound, and therapeutic benefits..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Price (₱ PHP) *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-bold text-base focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Original / Compare Price (₱)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-400 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Category & Sensory Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => {
                        const val = e.target.value as Product['category'];
                        setCategory(val);
                        if (val === 'super-solid') setCategoryLabel('Nice Cube / Solid Gel');
                        else if (val === 'butter-foam') setCategoryLabel('Slow-Rise Butter Foam');
                        else if (val === 'cheese-cube') setCategoryLabel('Cheese & Food Squishy');
                        else if (val === 'dim-sum') setCategoryLabel('Dim Sum Bao Steamers');
                        else if (val === 'glitter-animals') setCategoryLabel('Glitter Marine Squad');
                        else setCategoryLabel('Artisanal Custom');
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="butter-foam">Slow-Rise Butter Foam</option>
                      <option value="super-solid">Nice Cube / Solid Gel</option>
                      <option value="cheese-cube">Cheese &amp; Food Squishy</option>
                      <option value="dim-sum">Dim Sum Bao Steamers</option>
                      <option value="glitter-animals">Glitter Marine Squad</option>
                      <option value="custom">Custom Artisanal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Slow-Rise Rebound (Seconds)</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={slowRiseDuration}
                      onChange={(e) => setSlowRiseDuration(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-rose-400 font-bold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Firmness Level</label>
                    <select
                      value={firmness}
                      onChange={(e) => setFirmness(e.target.value as Product['firmness'])}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Ultra Soft">Ultra Soft (Memory Foam)</option>
                      <option value="Medium Squish">Medium Squish (Bao/Cheese)</option>
                      <option value="Super Solid">Super Solid (Nice Cube)</option>
                      <option value="Jelly Stretch">Jelly Stretch (Silicone)</option>
                    </select>
                  </div>
                </div>

                {/* Scent, Texture, Dimensions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Scent Profile</label>
                    <input
                      type="text"
                      value={scent}
                      onChange={(e) => setScent(e.target.value)}
                      placeholder="e.g. Vanilla Cream, Sweet Berry"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Texture</label>
                    <input
                      type="text"
                      value={texture}
                      onChange={(e) => setTexture(e.target.value)}
                      placeholder="e.g. Velvety Matte, Soft Jelly"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Dimensions &amp; Weight</label>
                    <input
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="e.g. 10x8x6 cm, 120g"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Image Upload & Presets */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <label className="block text-slate-200 font-bold">Product Photo (Upload or Select Preset)</label>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {presetImages.map((preset, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setImageUrl(preset.url)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          imageUrl === preset.url
                            ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex-1 cursor-pointer bg-slate-900 hover:bg-slate-850 border border-dashed border-slate-700 rounded-xl p-3 text-center transition-colors">
                      <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                      <span className="text-xs text-slate-300 block font-medium">Upload Image File from Device</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>

                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex-shrink-0">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Seller GCash Number Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Seller Display Name</label>
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">GCash Payout Number (09XXXXXXXXX) *</label>
                    <input
                      type="text"
                      required
                      pattern="09[0-9]{9}"
                      value={sellerGcash}
                      onChange={(e) => setSellerGcash(e.target.value)}
                      placeholder="09171234567"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish Squishy to Store Catalog</span>
                </button>
              </form>
            </div>

            {/* Right Column: Live Listing Preview */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl sticky top-28">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Live Card Preview</span>
                
                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative aspect-square w-full bg-slate-900">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 left-2.5 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      New
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded-lg text-[10px] font-bold text-rose-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-rose-400" />
                      <span>{slowRiseDuration}s Rise</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-purple-400 font-medium">
                      <span>{categoryLabel}</span>
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> {sellerName.split(' ')[0]}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base line-clamp-1">{name || 'Your Squishy Name'}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{tagline || 'Your short tagline will appear here...'}</p>
                    
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-400 font-serif">₱{price}</span>
                      <span className="text-xs text-slate-400">{stock} in stock</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: My Active Listings */}
        {activeTab === 'listings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Manage Your Squishy Inventory</h2>
            
            <div className="divide-y divide-slate-800">
              {products.map((p) => (
                <div key={p.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-base">{p.name}</h4>
                      <p className="text-xs text-slate-400">{p.categoryLabel} • {p.slowRiseDuration}s slow-rise • {p.scent}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                        <span className="text-amber-400 font-bold">₱{p.price}</span>
                        <span>Stock: <strong>{p.stock}</strong></span>
                        <span>Rating: <strong>★ {p.rating}</strong> ({p.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Sales & GCash Payouts */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Total Lifetime Earnings</span>
                <p className="text-3xl font-extrabold text-white font-serif mt-1">₱{totalSalesPhp.toLocaleString()}</p>
                <span className="text-xs text-emerald-400 mt-2 block">✓ 100% processed via PayMongo</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Available for GCash Cashout</span>
                <p className="text-3xl font-extrabold text-amber-400 font-serif mt-1">₱{pendingPayoutPhp.toLocaleString()}</p>
                <button
                  onClick={() => alert(`Cashout of ₱${pendingPayoutPhp} requested to GCash number ${currentUser?.gcashNumber || sellerGcash}! Reference: GCASH-OUT-${Date.now()}`)}
                  className="mt-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" /> Request Instant Cashout
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Connected Payout Wallet</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">GCash Verified</p>
                <p className="text-xs text-slate-300 mt-1">{currentUser?.gcashNumber || sellerGcash}</p>
                <span className="text-[11px] text-slate-500 block mt-2">Zero fee instant transfers</span>
              </div>
            </div>

            {/* Payout History Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Recent GCash Payout Records</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="pb-3">Reference Code</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">GCash Destination</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-3 font-mono text-slate-200">GCASH-PO-984210</td>
                      <td className="py-3">2026-08-25</td>
                      <td className="py-3">0917-882-9901</td>
                      <td className="py-3 font-bold text-white">₱3,500.00</td>
                      <td className="py-3"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Processed</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-slate-200">GCASH-PO-872341</td>
                      <td className="py-3">2026-08-18</td>
                      <td className="py-3">0917-882-9901</td>
                      <td className="py-3 font-bold text-white">₱2,500.00</td>
                      <td className="py-3"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Processed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
