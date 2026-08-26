import React from 'react';
import { Heart, Sparkles, ShieldCheck, Smile, Award, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutUsProps {
  onShopClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onShopClick }) => {
  return (
    <div className="py-16 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Our Artisanal Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            Crafting Calm Through Tactile Magic
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Squishy Haven was born from a simple belief: in an overwhelming digital world, everyone deserves a tactile outlet for focus, dopamine, and pure sensory joy.
          </p>
        </div>

        {/* 3-Column Pillar Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl font-bold">
              🧘
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Sensory &amp; ADHD Focus</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our slow-rise memory formulations are specifically calibrated with occupational therapists to deliver therapeutic deep pressure tactile feedback that calms the nervous system.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
              🌱
            </div>
            <h3 className="text-xl font-bold text-white font-serif">100% Non-Toxic &amp; Safe</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every squishy model is manufactured from BPA-free, lead-free polyurethane and food-grade silicone elastomers, certified under European EN71 and ASTM safety standards.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl font-bold">
              🛍️
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Empowering Local Crafters</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We empower Filipino creators to post and sell their custom slow-rise squishies with 0% listing fees, receiving direct automated cashouts to their GCash accounts.
            </p>
          </div>

        </div>

        {/* Squishy Care & Maintenance Guide */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-purple-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Care Guide</span>
            </div>
            <h2 className="text-3xl font-extrabold font-serif text-white">How to Keep Your Squishies in Mint Condition</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p><strong>Gentle Bath:</strong> Clean dust with warm water and mild foam soap. Air dry on a microfiber towel.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p><strong>Matte Powder Trick:</strong> Dust lightly with cornstarch or baby powder to restore that velvety, non-sticky matte feel.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p><strong>Avoid Heat:</strong> Keep away from direct sunlight or car dashboards to prevent premature memory foam hardening.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p><strong>No Sharp Objects:</strong> Squeeze with flat palms and fingers rather than fingernails for maximum longevity.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onShopClick}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Our Handcrafted Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
