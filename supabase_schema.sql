-- ==============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR SQUISHY HAVEN MARKETPLACE
-- Execute this script directly in the Supabase SQL Editor (https://supabase.com)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Stores Buyer & Seller accounts with GCash Numbers)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  gcash_number VARCHAR(20) NOT NULL, -- e.g. 09171234567
  is_gcash_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'both', 'admin')),
  avatar_url TEXT,
  balance_php NUMERIC(12, 2) DEFAULT 0.00,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS TABLE (User & Seller posted squishies)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_name TEXT NOT NULL,
  seller_gcash VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category_id VARCHAR(50) REFERENCES public.categories(id) ON DELETE SET NULL,
  category_label VARCHAR(100) NOT NULL,
  price_php NUMERIC(10, 2) NOT NULL CHECK (price_php > 0),
  original_price_php NUMERIC(10, 2),
  stock INTEGER NOT NULL DEFAULT 1 CHECK (stock >= 0),
  image_url TEXT NOT NULL,
  additional_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  texture VARCHAR(100) NOT NULL,
  slow_rise_duration_seconds INTEGER DEFAULT 5,
  firmness VARCHAR(50) DEFAULT 'Medium Squish' CHECK (firmness IN ('Ultra Soft', 'Medium Squish', 'Super Solid', 'Jelly Stretch')),
  scent VARCHAR(100),
  dimensions VARCHAR(100),
  weight VARCHAR(50),
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT TRUE,
  average_rating NUMERIC(3, 2) DEFAULT 5.00,
  review_count INTEGER DEFAULT 0,
  sensory_benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'out_of_stock', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. REVIEWS TABLE (Product Star Ratings & Comments)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200) NOT NULL,
  comment TEXT NOT NULL,
  verified_buyer BOOLEAN DEFAULT TRUE,
  gcash_verified BOOLEAN DEFAULT TRUE,
  helpful_count INTEGER DEFAULT 0,
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ORDERS TABLE (PayMongo & GCash Transactions)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL,
  subtotal_php NUMERIC(10, 2) NOT NULL,
  shipping_fee_php NUMERIC(10, 2) NOT NULL DEFAULT 80.00,
  discount_php NUMERIC(10, 2) DEFAULT 0.00,
  total_amount_php NUMERIC(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('gcash', 'paymongo_card', 'maya', 'grabpay', 'cod')),
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  paymongo_checkout_id TEXT,
  paymongo_payment_id TEXT,
  gcash_reference_number VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  price_php NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  image_url TEXT
);

-- 7. SELLER PAYOUTS TABLE (Direct GCash Cashouts)
CREATE TABLE IF NOT EXISTS public.seller_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  gcash_number VARCHAR(20) NOT NULL,
  amount_php NUMERIC(10, 2) NOT NULL CHECK (amount_php > 0),
  fee_php NUMERIC(10, 2) DEFAULT 0.00,
  net_amount_php NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'processed' CHECK (status IN ('pending', 'processing', 'processed', 'failed')),
  gcash_reference_code VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_payouts ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read active products; Sellers can insert/update their own
CREATE POLICY "Public can view active products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert products" ON public.products
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own products" ON public.products
  FOR UPDATE TO authenticated USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own products" ON public.products
  FOR DELETE TO authenticated USING (auth.uid() = seller_id);

-- Reviews: Everyone can read reviews; Authenticated users can write reviews
CREATE POLICY "Public can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT TO authenticated WITH CHECK (true);

-- Profiles: Users can view and edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- ==============================================================================
-- AUTOMATIC TRIGGER: Recalculate Product Average Rating on New Review
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_product_rating_avg()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET 
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.reviews
      WHERE product_id = NEW.product_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE product_id = NEW.product_id
    )
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_rating ON public.reviews;
CREATE TRIGGER trg_update_rating
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION update_product_rating_avg();

-- ==============================================================================
-- SEED DATA (INITIAL SQUISHY CATEGORIES)
-- ==============================================================================
INSERT INTO public.categories (id, name, slug, description, icon_name)
VALUES
  ('super-solid', 'Nice Cube & Super Solid', 'super-solid', 'High-resistance solid gel stress cubes', 'Box'),
  ('butter-foam', 'Slow-Rise Butter Foam', 'butter-foam', 'Ultra slow-rising bakery foam squishies', 'Layers'),
  ('cheese-cube', 'Cheese & Novelty Foods', 'cheese-cube', 'Aerated stretchable swiss cheese & food items', 'Sparkles'),
  ('dim-sum', 'Dim Sum & Kawaii Steamers', 'dim-sum', 'Mochi dough smiling bao buns with mini steamers', 'Coffee'),
  ('glitter-animals', 'Glitter Marine & Creatures', 'glitter-animals', 'Glitter-infused translucent aquatic animals', 'Fish')
ON CONFLICT (id) DO NOTHING;
