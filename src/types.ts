export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 - 5 stars
  title: string;
  comment: string;
  createdAt: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  gcashVerified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number; // in PHP (₱)
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  category: 'super-solid' | 'butter-foam' | 'cheese-cube' | 'dim-sum' | 'glitter-animals' | 'custom';
  categoryLabel: string;
  texture: string;
  slowRiseDuration: number; // in seconds (e.g. 8s)
  firmness: 'Ultra Soft' | 'Medium Squish' | 'Super Solid' | 'Jelly Stretch';
  scent: string;
  dimensions: string;
  weight: string;
  stock: number;
  description: string;
  sensoryBenefits: string[];
  sellerId: string;
  sellerName: string;
  sellerGcash: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  gcashNumber: string; // Format: 09XXXXXXXXX
  role: 'buyer' | 'seller' | 'both';
  avatarUrl: string;
  balancePhp: number;
  joinedDate: string;
  isGcashVerified: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'gcash' | 'paymongo_card' | 'maya' | 'grabpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymongoPaymentId?: string;
  gcashReferenceNumber?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
  recommendedProducts?: Product[];
}
