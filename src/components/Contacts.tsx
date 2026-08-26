import React, { useState } from 'react';
import { Mail, Phone, MapPin, Smartphone, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const Contacts: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gcash, setGcash] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Status');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setGcash('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-rose-400" />
            <span>24/7 Manila &amp; Nationwide Support</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Get in Touch with Our Squishy Team
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding your PayMongo checkout, GCash seller verification, or custom bulk orders? We're here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white font-serif">Customer Care &amp; Verification Desk</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-800 text-rose-400 rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block">Manila Logistics Hub</strong>
                    <p className="text-slate-400 mt-0.5">High Street South Corporate Plaza, Bonifacio Global City, Taguig 1634, Philippines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-800 text-emerald-400 rounded-xl">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block">GCash &amp; PayMongo Desk</strong>
                    <p className="text-slate-400 mt-0.5">Hotline: +63 (02) 8876-5432 / 0917-882-9901</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-800 text-purple-400 rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block">Email Inquiries</strong>
                    <p className="text-slate-400 mt-0.5">support@squishyhaven.ph / sellers@squishyhaven.ph</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-slate-800 text-amber-400 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block">Operating Hours</strong>
                    <p className="text-slate-400 mt-0.5">Monday - Saturday: 8:00 AM - 9:00 PM (PHT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl text-xs text-slate-300">
              <h4 className="font-bold text-white text-sm">Frequently Asked Questions</h4>
              <p><strong>Q: When will my GCash order ship?</strong><br />A: Orders paid via PayMongo/GCash are processed within 24 hours with 2-3 day Metro Manila delivery.</p>
              <p><strong>Q: How do sellers receive payouts?</strong><br />A: Direct disbursement to your 11-digit GCash mobile number within 24 hours of successful buyer delivery.</p>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6">Fill out the details below and our team will respond within 2 hours.</p>

            {isSent && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl flex items-center gap-2.5 font-bold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Your message has been sent successfully! Reference ticket #SQH-{Math.floor(1000 + Math.random() * 9000)}.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Patricia Santos"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patricia@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">GCash Number (Optional)</label>
                  <input
                    type="text"
                    value={gcash}
                    onChange={(e) => setGcash(e.target.value)}
                    placeholder="09171234567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Order & Delivery Status">Order &amp; Delivery Status</option>
                    <option value="PayMongo & GCash Payment Question">PayMongo &amp; GCash Payment Question</option>
                    <option value="Seller Onboarding & GCash Payouts">Seller Onboarding &amp; GCash Payouts</option>
                    <option value="Product Defect or Exchange">Product Defect or Exchange</option>
                    <option value="Artisanal Bulk / Wholesale Order">Artisanal Bulk / Wholesale Order</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our squishy customer specialists assist you today?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Ticket</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
