import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 0 ? (subtotal >= 1000 ? 0 : 80) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SQUISH15') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try SQUISH15 for 15% off!');
      setDiscountPercent(0);
      setCouponApplied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Your Squishy Bag</h3>
                <p className="text-xs text-slate-400">{cart.length} unique squishy item(s)</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl">🛍️</div>
                <h4 className="font-bold text-white text-base">Your cart is currently empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore our artisanal slow-rise butter sticks, Nice Cubes, and dim sum bao to fill your bag!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-white truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-slate-400">{item.product.categoryLabel}</p>
                    <span className="text-sm font-extrabold text-amber-400 font-serif">₱{item.product.price}</span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo Code (e.g. SQUISH15)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
              {couponApplied && <p className="text-[11px] text-emerald-400 font-semibold">✓ 15% discount applied!</p>}

              {/* Price Calculation Table */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">₱{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (15% OFF)</span>
                    <span>-₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Nationwide PH)</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE (Orders &gt; ₱1,000)</strong> : `₱${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-xl font-extrabold text-amber-400 font-serif">₱{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                id="btn-checkout-drawer"
                onClick={() => onProceedToCheckout(discountAmount, couponCode)}
                className="w-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <span>Proceed to PayMongo &amp; GCash</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by PayMongo 256-bit SSL Payment Gateway</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
