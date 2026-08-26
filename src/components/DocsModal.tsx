import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Database, CreditCard, Bot, Github, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'vercel' | 'supabase' | 'paymongo' | 'voiceflow' | 'github'>('vercel');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const supabaseSqlScript = `-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR SQUISHY HAVEN MARKETPLACE
-- ==============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Stores Buyer & Seller accounts with GCash Numbers)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  gcash_number VARCHAR(20) NOT NULL,
  is_gcash_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'both', 'admin')),
  avatar_url TEXT,
  balance_php NUMERIC(12, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE (User & Seller posted squishies)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_name TEXT NOT NULL,
  seller_gcash VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  category_label VARCHAR(100) NOT NULL,
  price_php NUMERIC(10, 2) NOT NULL,
  original_price_php NUMERIC(10, 2),
  stock INTEGER NOT NULL DEFAULT 1,
  image_url TEXT NOT NULL,
  texture VARCHAR(100) NOT NULL,
  slow_rise_duration_seconds INTEGER DEFAULT 8,
  firmness VARCHAR(50) DEFAULT 'Ultra Soft',
  scent VARCHAR(100),
  dimensions VARCHAR(100),
  weight VARCHAR(50),
  is_best_seller BOOLEAN DEFAULT FALSE,
  average_rating NUMERIC(3, 2) DEFAULT 5.00,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. REVIEWS TABLE (Product Star Ratings & Comments)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200) NOT NULL,
  comment TEXT NOT NULL,
  verified_buyer BOOLEAN DEFAULT TRUE,
  gcash_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS TABLE (PayMongo & GCash Transactions)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL,
  subtotal_php NUMERIC(10, 2) NOT NULL,
  shipping_fee_php NUMERIC(10, 2) NOT NULL DEFAULT 80.00,
  discount_php NUMERIC(10, 2) DEFAULT 0.00,
  total_amount_php NUMERIC(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'paid',
  paymongo_payment_id TEXT,
  gcash_reference_number VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public Insert Reviews" ON public.reviews FOR INSERT WITH CHECK (true);`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl font-serif text-white">Tech Stack Deployment &amp; Configuration Manual</h3>
              <p className="text-xs text-slate-400">Step-by-step guides for Vercel, Supabase, PayMongo, Voiceflow, and GitHub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/40 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('vercel')}
            className={`py-3 px-4 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'vercel' ? 'border-b-2 border-rose-500 text-rose-400 bg-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" /> Vercel Setup
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 px-4 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'supabase' ? 'border-b-2 border-emerald-500 text-emerald-400 bg-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" /> Supabase SQL
          </button>
          <button
            onClick={() => setActiveTab('paymongo')}
            className={`py-3 px-4 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'paymongo' ? 'border-b-2 border-amber-500 text-amber-400 bg-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" /> PayMongo &amp; Webhooks
          </button>
          <button
            onClick={() => setActiveTab('voiceflow')}
            className={`py-3 px-4 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'voiceflow' ? 'border-b-2 border-purple-500 text-purple-400 bg-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" /> Voiceflow &amp; Gemini AI
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`py-3 px-4 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'github' ? 'border-b-2 border-blue-500 text-blue-400 bg-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" /> GitHub Repo
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300">
          
          {/* TAB 1: VERCEL STEP BY STEP */}
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <span>▲</span> Step-by-Step Vercel Deployment &amp; Server Configuration
              </h4>
              
              <ol className="space-y-3 list-decimal list-inside text-slate-300 leading-relaxed">
                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 1: Push codebase to GitHub repository:</strong>
                  <p className="text-slate-400 text-xs mt-1">Make sure all files including <code>vercel.json</code>, <code>package.json</code>, and <code>src/</code> are committed.</p>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 2: Connect repository in Vercel Dashboard:</strong>
                  <p className="text-slate-400 text-xs mt-1">Go to <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="text-rose-400 underline">vercel.com/dashboard</a> → Click <strong>"Add New Project"</strong> → Select your imported GitHub repository.</p>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 3: Configure Build &amp; Output Settings:</strong>
                  <div className="mt-2 space-y-1 font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-slate-200">
                    <p>• Framework Preset: <strong>Vite</strong></p>
                    <p>• Build Command: <code>npm run build</code></p>
                    <p>• Output Directory: <code>dist</code></p>
                    <p>• Install Command: <code>npm install</code></p>
                  </div>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 4: Add Environment Variables in Vercel:</strong>
                  <p className="text-slate-400 text-xs mt-1">In Project Settings → <strong>Environment Variables</strong>, add:</p>
                  <div className="mt-2 space-y-1 font-mono text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-emerald-400">
                    <p>PAYMONGO_SECRET_KEY=sk_test_...</p>
                    <p>PAYMONGO_PUBLIC_KEY=pk_test_...</p>
                    <p>PAYMONGO_WEBHOOK_SECRET=whsec_...</p>
                    <p>GEMINI_API_KEY=AIzaSy...</p>
                    <p>SUPABASE_URL=https://your-id.supabase.co</p>
                    <p>SUPABASE_ANON_KEY=eyJhbGciOi...</p>
                  </div>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 5: Click "Deploy"</strong>
                  <p className="text-slate-400 text-xs mt-1">Vercel will compile the application and provide a global live URL with automatic HTTPS and Edge caching.</p>
                </li>
              </ol>
            </div>
          )}

          {/* TAB 2: SUPABASE SQL SCHEMA */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" /> Full Supabase SQL Table Schema
                </h4>
                <button
                  onClick={() => handleCopy(supabaseSqlScript, 'sql')}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                >
                  {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sql' ? 'Copied SQL!' : 'Copy Full SQL'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Execute the SQL below in the <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-400 underline">Supabase SQL Editor</a> to initialize <code>profiles</code> (with GCash numbers), <code>products</code>, <code>reviews</code>, and <code>orders</code> tables.
              </p>

              <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-80 scrollbar-thin">
                {supabaseSqlScript}
              </pre>
            </div>
          )}

          {/* TAB 3: PAYMONGO & WEBHOOKS */}
          {activeTab === 'paymongo' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" /> Step-by-Step PayMongo &amp; Webhook Configuration
              </h4>

              <ol className="space-y-3 list-decimal list-inside text-slate-300 leading-relaxed">
                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 1: Sign up at PayMongo Dashboard:</strong>
                  <p className="text-slate-400 text-xs mt-1">Visit <a href="https://dashboard.paymongo.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">dashboard.paymongo.com</a> and complete KYC / Test mode activation.</p>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 2: Obtain API Keys:</strong>
                  <p className="text-slate-400 text-xs mt-1">Go to <strong>Developers → API Keys</strong>. Copy your <code>Secret Key</code> (e.g. <code>sk_test_...</code>) and <code>Public Key</code> (e.g. <code>pk_test_...</code>).</p>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 3: Configure Webhook URL &amp; Events:</strong>
                  <p className="text-slate-400 text-xs mt-1">Navigate to <strong>Developers → Webhooks → Register Webhook</strong>:</p>
                  <div className="mt-2 space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-200">
                    <p>• Webhook URL: <code>https://your-domain.vercel.app/api/paymongo/webhook</code></p>
                    <p className="text-amber-400 font-bold">• Check the following required events:</p>
                    <p className="pl-4">1. <code>source.chargeable</code> (Triggered when buyer approves GCash/Maya source)</p>
                    <p className="pl-4">2. <code>payment.paid</code> (Triggered when payment is captured successfully)</p>
                    <p className="pl-4">3. <code>payment.failed</code> (Triggered when transaction declines or expires)</p>
                  </div>
                </li>

                <li className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <strong className="text-white">Step 4: Copy Signing Secret:</strong>
                  <p className="text-slate-400 text-xs mt-1">After registering the webhook, PayMongo will display a Signing Secret (<code>whsec_...</code>). Set this as <code>PAYMONGO_WEBHOOK_SECRET</code> in your environment.</p>
                </li>
              </ol>
            </div>
          )}

          {/* TAB 4: VOICEFLOW & GEMINI AI */}
          {activeTab === 'voiceflow' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" /> Voiceflow &amp; Gemini AI Chatbot Integration
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                  <h5 className="font-bold text-white text-sm">How Voiceflow is Connected:</h5>
                  <p>1. In your Voiceflow Canvas (<a href="https://creator.voiceflow.com" target="_blank" rel="noreferrer" className="text-purple-400 underline">voiceflow.com</a>), create a Squishy e-commerce assistant.</p>
                  <p>2. Copy your <code>Project ID</code> from the Integrations tab.</p>
                  <p>3. Embed the Voiceflow widget script inside <code>index.html</code> before <code>&lt;/body&gt;</code>:</p>
                  
                  <pre className="bg-slate-900 border border-slate-800 p-3 rounded-xl font-mono text-[10px] text-purple-300 overflow-x-auto">
{`<script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: 'YOUR_VOICEFLOW_PROJECT_ID' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>`}
                  </pre>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1.5">
                  <h5 className="font-bold text-white text-sm">Built-in Gemini AI Engine:</h5>
                  <p>Squishy Haven includes a server-side Gemini 2.5 Flash assistant route (<code>/api/chat</code>) that automatically answers squishy inquiries, slow-rise metrics, and GCash instructions.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GITHUB WORKFLOW */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <Github className="w-4 h-4 text-blue-400" /> GitHub Repository Push Commands
              </h4>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 font-mono text-xs text-slate-200">
                <p className="text-slate-400"># 1. Initialize git repository</p>
                <p className="text-emerald-400">git init</p>
                
                <p className="text-slate-400 pt-2"># 2. Add all files and make initial commit</p>
                <p className="text-emerald-400">git add .</p>
                <p className="text-emerald-400">git commit -m "feat: complete artisanal squishy marketplace with PayMongo, GCash, Supabase and AI"</p>

                <p className="text-slate-400 pt-2"># 3. Link your remote GitHub repository</p>
                <p className="text-emerald-400">git branch -M main</p>
                <p className="text-emerald-400">git remote add origin https://github.com/YOUR_USERNAME/squishy-haven.git</p>

                <p className="text-slate-400 pt-2"># 4. Push to GitHub</p>
                <p className="text-emerald-400">git push -u origin main</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
          >
            Close Tech Guide
          </button>
        </div>

      </div>
    </div>
  );
};
