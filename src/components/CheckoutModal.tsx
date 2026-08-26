import React, { useState } from 'react';
import { X, Smartphone, CreditCard, ShieldCheck, CheckCircle2, QrCode, Copy, Check, Download, Printer, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, UserProfile } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  discount: number;
  onClearCart: () => void;
  currentUser: UserProfile | null;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  discount,
  onClearCart,
  currentUser,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'gcash' | 'paymongo_card' | 'maya' | 'grabpay'>('gcash');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.gcashNumber || '09171234567');
  const [shippingAddress, setShippingAddress] = useState('Unit 14B, Tower 2, Bonifacio Global City, Taguig, Metro Manila');
  
  // Checkout Step & Processing States
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment_qr' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<Order | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000 ? 0 : 80;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'gcash' || paymentMethod === 'maya') {
      setCheckoutStep('payment_qr');
    } else {
      executeFinalPayment();
    }
  };

  const executeFinalPayment = async () => {
    setIsProcessing(true);

    try {
      // Call server backend endpoint or simulate
      const response = await fetch('/api/paymongo/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          description: `Squishy Haven Order (${cart.length} items)`,
          items: cart.map(i => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image
          })),
          customerName,
          customerEmail,
          customerPhone
        })
      });

      const data = await response.json();
      const refCode = data.referenceNumber || `GCASH-${Math.floor(100000000 + Math.random() * 900000000)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `SQH-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cart.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image
        })),
        subtotal,
        shippingFee,
        discount,
        totalAmount,
        paymentMethod,
        paymentStatus: 'paid',
        gcashReferenceNumber: refCode,
        paymongoPaymentId: data.checkoutId || `pm_pay_${Date.now()}`,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress: shippingAddress,
        createdAt: new Date().toISOString(),
        estimatedDelivery: '2-3 Business Days'
      };

      setTimeout(() => {
        setIsProcessing(false);
        setGeneratedOrder(newOrder);
        setCheckoutStep('success');
        onClearCart();
        onOrderComplete(newOrder);

        // Confetti celebration
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }, 1200);

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('Unable to process payment gateway. Please verify your connection.');
    }
  };

  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              <span>💳</span>
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl font-serif text-white">PayMongo &amp; GCash Secure Checkout</h3>
              <p className="text-xs text-slate-400">Direct instant Philippine payment processing</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Customer Details & Payment Method Selection */}
        {checkoutStep === 'details' && (
          <form onSubmit={handleStartPayment} className="p-6 sm:p-8 space-y-6">
            
            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Select PayMongo Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gcash')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'gcash'
                      ? 'bg-blue-900/40 border-blue-500 text-blue-300 ring-2 ring-blue-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  <span className="font-bold text-xs">GCash</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Instant App/QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('maya')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'maya'
                      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                  <span className="font-bold text-xs">Maya</span>
                  <span className="text-[10px] text-slate-400">Wallet / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paymongo_card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'paymongo_card'
                      ? 'bg-purple-900/40 border-purple-500 text-purple-300 ring-2 ring-purple-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-purple-400" />
                  <span className="font-bold text-xs">Debit / Credit</span>
                  <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('grabpay')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'grabpay'
                      ? 'bg-teal-900/40 border-teal-500 text-teal-300 ring-2 ring-teal-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-teal-400" />
                  <span className="font-bold text-xs">GrabPay</span>
                  <span className="text-[10px] text-slate-400">Wallet</span>
                </button>

              </div>
            </div>

            {/* Buyer Contact Information */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Buyer Delivery &amp; Contact Info
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">GCash / Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="09171234567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-emerald-400 font-bold placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email Address (For Invoice &amp; Tracking) *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="juan.delacruz@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Philippine Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="House/Unit #, Street, Barangay, City, Province, Postal Code"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Applied Promo Discount</span>
                  <span>-₱{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-300">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₱${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-xl font-extrabold text-amber-400 font-serif">₱{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Next Action */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold py-4 rounded-2xl text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>Continue to Pay ₱{totalAmount.toLocaleString()} ({paymentMethod.toUpperCase()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: GCash / Maya Interactive QR & Reference Verification */}
        {checkoutStep === 'payment_qr' && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Scan or Pay via {paymentMethod === 'gcash' ? 'GCash' : 'Maya'}</span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-white">
              Complete Payment of <span className="text-amber-400">₱{totalAmount.toLocaleString()}</span>
            </h3>
            
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Scan the PayMongo merchant QR code below with your GCash app, or tap the button to simulate instant capture.
            </p>

            {/* Merchant QR Simulation Canvas */}
            <div className="bg-white p-4 rounded-3xl w-56 h-56 mx-auto shadow-2xl flex flex-col items-center justify-center border-4 border-blue-500 relative">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-3 space-y-2">
                <QrCode className="w-24 h-24 text-rose-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300 font-bold">PAYMONGO MERCHANT QR</span>
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold">GCASH / MAYA READY</span>
              </div>
            </div>

            {/* Merchant Reference Information */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs max-w-md mx-auto space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant Account:</span>
                <span className="font-bold text-white">Squishy Haven Official</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Mobile:</span>
                <span className="font-bold text-emerald-400">{customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total PHP:</span>
                <span className="font-bold text-amber-400 text-sm">₱{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCheckoutStep('details')}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Back to Details
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={executeFinalPayment}
                className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                {isProcessing ? (
                  <span>Verifying PayMongo Settlement...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Confirm GCash Payment Received</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* Step 3: Success & Official Invoice Receipt */}
        {checkoutStep === 'success' && generatedOrder && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Top Success Banner */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold font-serif text-white">Payment Confirmed &amp; Order Placed!</h3>
              <p className="text-xs text-slate-300">
                Your payment was successfully settled via PayMongo. A confirmation receipt has been generated.
              </p>
            </div>

            {/* Order Invoice Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs text-slate-300 font-sans">
              
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row justify-between pb-3 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Order Number</span>
                  <p className="font-mono font-bold text-sm text-white">{generatedOrder.orderNumber}</p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">PayMongo / GCash Reference</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono font-bold text-xs text-amber-400">{generatedOrder.gcashReferenceNumber}</span>
                    <button
                      onClick={() => handleCopyReference(generatedOrder.gcashReferenceNumber || '')}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Copy Reference"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Purchased Squishies</span>
                {generatedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-200">
                    <span className="truncate max-w-xs">{item.quantity}x {item.productName}</span>
                    <span className="font-serif font-bold text-white">₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>₱{generatedOrder.subtotal.toLocaleString()}</span>
                </div>
                {generatedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span>-₱{generatedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Shipping:</span>
                  <span>{generatedOrder.shippingFee === 0 ? 'FREE' : `₱${generatedOrder.shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-slate-800">
                  <span>Total Settled:</span>
                  <span className="text-base font-serif font-extrabold text-amber-400">₱{generatedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Recipient info */}
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-0.5">
                <p><strong>Deliver to:</strong> {generatedOrder.customerName} ({generatedOrder.customerPhone})</p>
                <p><strong>Address:</strong> {generatedOrder.customerAddress}</p>
                <p><strong>Estimated Arrival:</strong> {generatedOrder.estimatedDelivery}</p>
              </div>

            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => window.print()}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Done Shopping
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
