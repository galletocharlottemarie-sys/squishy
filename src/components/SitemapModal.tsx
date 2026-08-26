import React from 'react';
import { X, Map, ArrowRight, ExternalLink, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: 'home' | 'store' | 'about' | 'contacts' | 'seller') => void;
  onOpenDocs: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenDocs,
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Main Pages',
      icon: '🏠',
      links: [
        { label: 'Home Page', tab: 'home', desc: 'Rule of thirds showcase, sensory simulator, featured bestsellers' },
        { label: 'Store Page & Catalog', tab: 'store', desc: 'Browse all squishies, filter by texture, slow-rise duration & scent' },
        { label: 'Seller Dashboard', tab: 'seller', desc: 'Post new squishies, manage stock, view GCash payouts' },
        { label: 'About Us', tab: 'about', desc: 'Brand story, non-toxic safety certifications, sensory therapy guide' },
        { label: 'Contacts & Support', tab: 'contacts', desc: '24/7 customer service, Manila hub address, GCash desk' },
      ]
    },
    {
      title: 'Squishy Categories',
      icon: '🍡',
      links: [
        { label: 'Nice Cube / Super Solid Gel', tab: 'store', desc: 'Super solid high-resistance stress cubes (NeeDoh inspired)' },
        { label: 'Slow-Rise Butter Foam', tab: 'store', desc: '12-second slow rise memory bakery butter sticks' },
        { label: 'Cheese & Novelty Foods', tab: 'store', desc: 'Aerated stretchy swiss cheese blocks' },
        { label: 'Dim Sum Bao Steamers', tab: 'store', desc: 'Shimmering smiling bao buns with mini bamboo steamers' },
        { label: 'Glitter Marine Squad', tab: 'store', desc: 'Sparkling ocean friends (Narwhal, Fish, Octopus, Turtle)' },
      ]
    },
    {
      title: 'Payment & Logistics (Philippines)',
      icon: '💳',
      links: [
        { label: 'PayMongo Gateway Integration', tab: 'store', desc: 'Secure 256-bit encrypted checkout (GCash, Maya, Cards, GrabPay)' },
        { label: 'GCash Instant Payouts', tab: 'seller', desc: 'Zero fee direct seller disbursement to 09XXXXXXXXX numbers' },
        { label: 'Nationwide Delivery', tab: 'contacts', desc: 'Free shipping on orders over ₱1,000 across Metro Manila & provinces' },
      ]
    },
    {
      title: 'Developer & Platform Architecture',
      icon: '🛠️',
      links: [
        { label: 'Vercel Deployment Guide', doc: true, desc: 'Step-by-step instructions for hosting and environment variables' },
        { label: 'Supabase SQL Database Schema', doc: true, desc: 'Full tables, RLS security policies, and seed script' },
        { label: 'PayMongo Webhooks Configuration', doc: true, desc: 'Setup guide for source.chargeable & payment.paid webhooks' },
        { label: 'Voiceflow & Gemini AI Chatbot', doc: true, desc: 'Dual-mode AI assistant for automated customer support' },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl font-serif text-white">Interactive Website Sitemap</h3>
              <p className="text-xs text-slate-400">Complete architectural map of Squishy Haven</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sitemap Sections Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <span className="text-lg">{sec.icon}</span>
                <h4 className="font-bold text-sm text-white font-serif">{sec.title}</h4>
              </div>

              <ul className="space-y-2.5">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => {
                        onClose();
                        if (link.doc) {
                          onOpenDocs();
                        } else if (link.tab) {
                          onNavigate(link.tab as any);
                        }
                      }}
                      className="w-full text-left group p-2 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300 group-hover:text-rose-200 flex items-center gap-1">
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        {link.doc && (
                          <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono">DOC</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{link.desc}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
          >
            Close Sitemap
          </button>
        </div>

      </div>
    </div>
  );
};
