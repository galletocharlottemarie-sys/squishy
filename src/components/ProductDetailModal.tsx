import React, { useState } from 'react';
import { X, Star, ShoppingBag, Zap, ShieldCheck, Heart, Sparkles, User, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';
import { Product, Review, UserProfile } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onDirectBuy: (product: Product, e?: React.MouseEvent) => void;
  onAddReview: (productId: string, newReview: Review) => void;
  currentUser: UserProfile | null;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectBuy,
  onAddReview,
  currentUser,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [starRating, setStarRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState(currentUser?.name || '');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  const gallery = [product.image, ...(product.additionalImages || [])];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim() || !reviewerName.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: reviewerName.trim(),
      rating: starRating,
      title: reviewTitle.trim() || 'Wonderful Squishy Experience!',
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      verifiedBuyer: true,
      helpfulCount: 0,
      gcashVerified: true,
    };

    onAddReview(product.id, newRev);
    setReviewSubmitted(true);
    setReviewTitle('');
    setReviewComment('');
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  const reviewsList = product.reviews || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          id="btn-close-product-detail"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Product Gallery & Sensory Metrics */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Slow-Rise Stamp */}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>{product.slowRiseDuration}s Slow-Rise Memory</span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === imgUrl ? 'border-rose-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Sensory Breakdown Specs */}
            <div className="bg-slate-800/60 border border-slate-800 rounded-2xl p-4 space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Sensory Specifications</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><strong className="text-slate-400">Texture:</strong> {product.texture}</div>
                <div><strong className="text-slate-400">Firmness:</strong> {product.firmness}</div>
                <div><strong className="text-slate-400">Aromatherapy:</strong> {product.scent}</div>
                <div><strong className="text-slate-400">Weight / Size:</strong> {product.weight}</div>
              </div>
              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-emerald-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Verified Seller: {product.sellerName}
                </span>
                <span className="text-[11px] text-slate-400">GCash: {product.sellerGcash}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Reviews, and Review Form */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                <span>{product.categoryLabel}</span>
                <span>•</span>
                <span className="text-emerald-400">{product.stock > 0 ? `${product.stock} units in stock` : 'Sold out'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{product.tagline}</p>

              {/* Star Rating Overview */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">{product.rating}</span>
                <span className="text-xs text-slate-400">({reviewsList.length} customer reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="mt-4 p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-sans">Artisanal Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-amber-400 font-serif">₱{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">₱{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold block">✓ PayMongo Checkout</span>
                  <span>GCash • Maya • Cards</span>
                </div>
              </div>
            </div>

            {/* Tab Switches (Details vs Reviews) */}
            <div className="flex items-center gap-2 border-b border-slate-800">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-b-2 border-rose-500 text-rose-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-rose-500 text-rose-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Customer Reviews</span>
                <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-full text-[10px]">
                  {reviewsList.length}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto max-h-56 pr-1 space-y-3 text-xs text-slate-300">
              {activeTab === 'details' ? (
                <div className="space-y-3">
                  <p className="leading-relaxed">{product.description}</p>
                  
                  {product.sensoryBenefits && product.sensoryBenefits.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <h5 className="font-bold text-white text-xs">Sensory &amp; Calming Benefits:</h5>
                      <ul className="list-disc list-inside space-y-1 text-slate-300">
                        {product.sensoryBenefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Reviews List */}
                  {reviewsList.length === 0 ? (
                    <p className="text-slate-400 italic py-2">No reviews yet for this product. Be the first to leave a review below!</p>
                  ) : (
                    reviewsList.map((rev) => (
                      <div key={rev.id} className="bg-slate-800/70 border border-slate-800 p-3 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-200">{rev.userName}</span>
                            {rev.gcashVerified && (
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded-full font-semibold">
                                GCash Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h6 className="font-semibold text-white">{rev.title}</h6>
                        <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                        <span className="text-[10px] text-slate-500 block pt-1">{rev.createdAt}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Write a Review Section */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>Leave a Star Rating &amp; Review</span>
                </h4>
                {reviewSubmitted && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Review Posted!
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-2.5 text-xs">
                {/* 1-5 Star Interactive Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setStarRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-slate-600 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (hoverRating || starRating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="font-bold text-amber-400 ml-1">{starRating} Stars</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Your Name (e.g. Maria C.)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Review Title (e.g. Super Slow Rise!)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with the texture, scent, and slow-rise recovery..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />

                <button
                  type="submit"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Verified Review</span>
                </button>
              </form>
            </div>

            {/* Bottom Actions Row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={(e) => {
                  onAddToCart(product, e);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-rose-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={(e) => {
                  onDirectBuy(product, e);
                  onClose();
                }}
                className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buy with GCash / PayMongo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
