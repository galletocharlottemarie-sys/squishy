import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'needoh-nice-cube',
    name: 'NeeDoh Nice Cube - Super Solid Squish',
    tagline: 'Super solid satisfying resistance that always returns to crisp square form',
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'super-solid',
    categoryLabel: 'Nice Cube / Super Solid',
    texture: 'Super Solid Resistance Gel',
    slowRiseDuration: 6,
    firmness: 'Super Solid',
    scent: 'Fresh Berry Ice',
    dimensions: '6.0 x 6.0 x 6.0 cm',
    weight: '145g',
    stock: 42,
    isBestSeller: true,
    sellerId: 'seller-1',
    sellerName: 'Sensory Haven Manila',
    sellerGcash: '0917-882-9901',
    description:
      'Inspired by the viral NeeDoh Nice Cube! Filled with a super-solid non-toxic sugar-like compound that feels cool to the touch. Provides deep tactile pressure for high anxiety and ADHD focus.',
    sensoryBenefits: [
      'High-resistance tactile feedback for deep pressure therapy',
      'Hypoallergenic, BPA-free durable outer elastomer skin',
      'Resets back to a perfect geometric cube every single squeeze',
      'Washable with mild soap and warm water'
    ],
    reviews: [
      {
        id: 'rev-1',
        productId: 'needoh-nice-cube',
        userName: 'Patricia Santos',
        rating: 5,
        title: 'Best sensory squishy ever!',
        comment:
          'Super solid and stiff at first, but once you squish it in your hands it is so satisfying. Helps me concentrate during long Zoom meetings in BGC! Shipped fast via PayMongo/GCash.',
        createdAt: '2026-08-15',
        verifiedBuyer: true,
        helpfulCount: 24,
        gcashVerified: true
      },
      {
        id: 'rev-2',
        productId: 'needoh-nice-cube',
        userName: 'Mark Anthony R.',
        rating: 5,
        title: 'Authentic feel and no sticky residue',
        comment:
          'The square shape is so aesthetic on my work desk. When you squeeze it, the inside crystal clear gel feels super dense. 10/10 slow shape reset.',
        createdAt: '2026-08-10',
        verifiedBuyer: true,
        helpfulCount: 16,
        gcashVerified: true
      }
    ]
  },
  {
    id: 'salted-butter-stick',
    name: '4oz Salted Butter Slow-Rise Foam Stick',
    tagline: 'Hyper-realistic dairy butter stick with 12-second ultra slow rising memory foam',
    price: 299,
    originalPrice: 380,
    rating: 4.8,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'butter-foam',
    categoryLabel: 'Slow-Rise Butter Foam',
    texture: 'Velvety Microcellular Foam',
    slowRiseDuration: 12,
    firmness: 'Ultra Soft',
    scent: 'Sweet Cream & Warm Brioche',
    dimensions: '13.5 x 3.5 x 3.5 cm',
    weight: '85g',
    stock: 28,
    isBestSeller: true,
    sellerId: 'seller-2',
    sellerName: 'Tokyo Kawaii Manila',
    sellerGcash: '0928-554-1122',
    description:
      'Features authentic embossed 4oz (113g) butter measurement lines with vibrant blue stamping. Crafted from dense memory polyurethane that squishes completely flat and gently rises over 12 seconds.',
    sensoryBenefits: [
      'Delightful sweet butter bakery aroma that lasts for months',
      'Ultra slow-rise memory response (12+ seconds)',
      'Matte soft-touch velvet finish without artificial sheen',
      'Realistic kitchen aesthetic perfect for novelty collectors'
    ],
    reviews: [
      {
        id: 'rev-3',
        productId: 'salted-butter-stick',
        userName: 'Chloe Dela Cruz',
        rating: 5,
        title: 'Smells like fresh baked bread and butter!',
        comment:
          'My coworkers thought it was real butter on my desk! The slow-rise is unreal—takes a whole 12 seconds to bounce back. Very therapeutic.',
        createdAt: '2026-08-18',
        verifiedBuyer: true,
        helpfulCount: 19,
        gcashVerified: true
      }
    ]
  },
  {
    id: 'swiss-cheese-cube',
    name: 'Artisan Emmental Cheese Cube Squishy',
    tagline: 'Soft & stretchy cheese block with realistic aeration holes and bouncy rebound',
    price: 249,
    originalPrice: 320,
    rating: 4.7,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'cheese-cube',
    categoryLabel: 'Cheese & Food Squishy',
    texture: 'Bouncy Aerated Elastomer',
    slowRiseDuration: 5,
    firmness: 'Medium Squish',
    scent: 'Mild Sweet Cheddar & Vanilla',
    dimensions: '7.0 x 7.0 x 7.0 cm',
    weight: '110g',
    stock: 55,
    isNewArrival: true,
    sellerId: 'seller-3',
    sellerName: 'Cheesy Joy Studio',
    sellerGcash: '0995-312-8874',
    description:
      'A cheerful bright yellow Swiss cheese cube featuring tactile aeration indentations that feel amazing to poke and compress. High stretch elasticity allows pulling, twisting, and squashing.',
    sensoryBenefits: [
      'Dynamic multi-finger poking grooves for finger dexterity',
      'Stretchable up to 2.5x original size without tearing',
      'Non-greasy, non-stick clean touch surface',
      'Calming bright yellow dopamine-boosting aesthetic'
    ],
    reviews: [
      {
        id: 'rev-4',
        productId: 'swiss-cheese-cube',
        userName: 'Bea Ramos',
        rating: 5,
        title: 'So stretchy and fun!',
        comment:
          'Poking the cheese holes is addicting! Very durable even when my younger brother stretched it. Great packaging too.',
        createdAt: '2026-08-20',
        verifiedBuyer: true,
        helpfulCount: 11,
        gcashVerified: true
      }
    ]
  },
  {
    id: 'dim-sum-bao-steamer',
    name: 'Glitter Dim Sum Bao Bun with Mini Bamboo Steamer',
    tagline: 'Glittery smiling bao buns nestled in cute steamer cases with mochi dough feel',
    price: 389,
    originalPrice: 480,
    rating: 5.0,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'dim-sum',
    categoryLabel: 'Mochi Steamer Dim Sum',
    texture: 'Glitter Mochi Dough Gel',
    slowRiseDuration: 8,
    firmness: 'Medium Squish',
    scent: 'Steamed Sweet Taro & Coconut',
    dimensions: '8.0 x 8.0 x 6.5 cm (with steamer)',
    weight: '130g',
    stock: 35,
    isBestSeller: true,
    sellerId: 'seller-1',
    sellerName: 'Sensory Haven Manila',
    sellerGcash: '0917-882-9901',
    description:
      'Inspired by authentic dim sum steamers! Each shimmering bao features a joyful kawaii smile, sparkling mica glitter core, and a protective bamboo-textured container.',
    sensoryBenefits: [
      'Includes authentic mini steamer bowl for desk display',
      'Infused with culinary-grade taro and steamed sweet dough scent',
      'Sparkling iridescent glitter suspended in crystal silicone',
      'Delivers smooth, soft dough-kneading stress relief'
    ],
    reviews: [
      {
        id: 'rev-5',
        productId: 'dim-sum-bao-steamer',
        userName: 'Kathryn Bernardo Fan',
        rating: 5,
        title: 'The cutest squishy in my entire collection!',
        comment:
          'The little smiling face makes my day brighter every time I squish it. The steamer container is so handy to keep it clean and dust-free.',
        createdAt: '2026-08-22',
        verifiedBuyer: true,
        helpfulCount: 38,
        gcashVerified: true
      }
    ]
  },
  {
    id: 'glitter-sea-animals',
    name: 'Glitter Aquatic Friends 4-Pack (Narwhal, Fish, Octopus, Turtle)',
    tagline: 'Sparkly translucent ocean creatures with liquid-gel squishiness and floating sparkles',
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'glitter-animals',
    categoryLabel: 'Glitter Marine Squad',
    texture: 'Translucent Jelly Gel',
    slowRiseDuration: 4,
    firmness: 'Jelly Stretch',
    scent: 'Ocean Breeze & Crisp Melon',
    dimensions: '6.5 x 5.0 x 4.5 cm each',
    weight: '240g (Set of 4)',
    stock: 20,
    isBestSeller: true,
    sellerId: 'seller-2',
    sellerName: 'Tokyo Kawaii Manila',
    sellerGcash: '0928-554-1122',
    description:
      'A set of 4 vibrant marine creatures: Glacier Blue Narwhal, Emerald Fish, Golden Yellow Octopus, and Lime Green Sea Turtle. Filled with liquid silicone and floating reflective glitter.',
    sensoryBenefits: [
      'Set of 4 distinct tactile sea creatures for multi-sensory stimulation',
      'Floating micro-glitter creates hypnotic visual calming effects',
      'Ultra soft jelly texture with instant shape recovery',
      'Great for water-play, desk fidgeting, and quiet classroom use'
    ],
    reviews: [
      {
        id: 'rev-6',
        productId: 'glitter-sea-animals',
        userName: 'Daniel Padilla',
        rating: 5,
        title: 'Super glittery and high quality',
        comment:
          'Got all 4 animals and each has its own color scheme. The narwhal is my favorite! Paid with GCash easily.',
        createdAt: '2026-08-24',
        verifiedBuyer: true,
        helpfulCount: 14,
        gcashVerified: true
      }
    ]
  },
  {
    id: 'marshmallow-panda-bun',
    name: 'Giant Marshmallow Panda Bun Squishy',
    tagline: 'Jumbo 15cm dessert bun with ultra slow-rise memory rebound and honey scent',
    price: 320,
    originalPrice: 400,
    rating: 4.8,
    reviewCount: 65,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    category: 'butter-foam',
    categoryLabel: 'Slow-Rise Butter Foam',
    texture: 'Air-Whipped Marshmallow Foam',
    slowRiseDuration: 15,
    firmness: 'Ultra Soft',
    scent: 'Honey Toast & Vanilla Bean',
    dimensions: '15.0 x 15.0 x 10.0 cm',
    weight: '180g',
    stock: 19,
    sellerId: 'seller-3',
    sellerName: 'Cheesy Joy Studio',
    sellerGcash: '0995-312-8874',
    description:
      'A giant slow-rising dessert bun with adorable sleeping panda ears. Takes a massive 15 seconds to rise after a full two-handed squeeze!',
    sensoryBenefits: [
      'Two-handed jumbo size for maximum bilateral stress relief',
      '15-second record slow-rise memory formulation',
      'Delicate honey aroma for olfactory aromatherapy'
    ],
    reviews: []
  }
];

export const initialProducts = INITIAL_PRODUCTS;
