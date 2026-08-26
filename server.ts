import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// 1. Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Squishy Haven E-Commerce Platform',
    timestamp: new Date().toISOString(),
    paymongoConfigured: Boolean(process.env.PAYMONGO_SECRET_KEY),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 2. AI Squishy Assistant Chatbot Endpoint (Gemini)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Intelligent fallback if Gemini key is not yet set in environment
      return res.json({
        reply: getFallbackSquishyResponse(message),
        source: 'local_assistant'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemPrompt = `You are "Mochi", the enthusiastic and knowledgeable AI Squishy Specialist at "Squishy Haven" (an artisanal squishy marketplace in the Philippines).
Key Info:
- Products: NeeDoh Nice Cube (Super solid, 6s rise, blue/pink/purple), 4oz Salted Butter Foam (12s ultra slow-rise, sweet cream aroma), Emmental Swiss Cheese Cube (stretchy aerated elastomer), Glitter Dim Sum Bao Steamer (taro scented smiling bao in mini steamer), Glitter Marine Animals (ocean narwhal, fish, octopus, turtle).
- Payment methods: PayMongo (GCash, Maya, GrabPay, Credit/Debit cards, BillEase). All prices are in Philippine Pesos (₱).
- Sellers: Users can register their account with their GCash number and post their own squishies for 0% listing fee.
- Care advice: Wash with mild soap and warm water. Dust with baby powder or cornstarch to restore soft-touch matte finish. Never use sharp objects. Keep away from extreme heat.
Tone: Warm, kawaii, concise, helpful, with occasional cute squishy emojis (🍡, ✨, 🧈, 🧀, 🐳). Limit responses to 2-3 friendly paragraphs or bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
      ]
    });

    const reply = response.text || 'I love squishies! How can I help you choose the best stress-relief toy today? ✨';
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.json({
      reply: getFallbackSquishyResponse(req.body.message || ''),
      source: 'fallback'
    });
  }
});

function getFallbackSquishyResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('butter') || lower.includes('salted')) {
    return 'The 4oz Salted Butter Stick is our most popular slow-rise item! It takes a full 12 seconds to rebound and features a sweet cream bakery scent. Perfect for novelty desk fidgeting! 🧈✨';
  }
  if (lower.includes('cube') || lower.includes('needoh') || lower.includes('solid')) {
    return 'The NeeDoh Nice Cube features a super-solid resistance gel that provides high tactile pressure. It always resets to a crisp cube geometry and is amazing for deep ADHD/anxiety relief! 🧊';
  }
  if (lower.includes('cheese') || lower.includes('stretch')) {
    return 'Our Artisan Swiss Cheese Cube has realistic aeration holes you can poke and stretch up to 2.5x its size. It smells like mild vanilla-cheddar! 🧀';
  }
  if (lower.includes('bao') || lower.includes('dim sum') || lower.includes('steamer')) {
    return 'The Glitter Dim Sum Bao comes with its own authentic mini bamboo steamer container! It has a smiling kawaii face and sweet taro scent with shimmering mica glitter inside. 🥟✨';
  }
  if (lower.includes('gcash') || lower.includes('pay') || lower.includes('paymongo')) {
    return 'We accept GCash, Maya, and credit/debit cards seamlessly through PayMongo! Buyers get instant payment confirmation and a verified reference code, while sellers receive direct payouts to their registered GCash number! 📱💳';
  }
  if (lower.includes('sell') || lower.includes('dashboard')) {
    return 'Anyone can become a seller! Click "Seller Dashboard" in the header, input your registered GCash number, and upload photos of your squishies with custom slow-rise ratings and scents. 🛍️';
  }
  return 'Welcome to Squishy Haven! I am Mochi, your squishy guide. Feel free to ask about our slow-rise butter sticks, solid Nice Cubes, glitter dim sum bao, or how to pay with GCash & PayMongo! ✨🍡';
}

// 3. PayMongo Create Checkout Session / Payment Intent
app.post('/api/paymongo/create-checkout', async (req: Request, res: Response) => {
  try {
    const { amount, description, items, customerEmail, customerName, customerPhone } = req.body;
    const secretKey = process.env.PAYMONGO_SECRET_KEY;

    if (!secretKey) {
      // Sandbox Mock Generation for preview and local testing
      const mockCheckoutId = `cs_test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const mockReferenceNumber = `GCASH-${Math.floor(100000000 + Math.random() * 900000000)}`;
      return res.json({
        success: true,
        isSandbox: true,
        checkoutId: mockCheckoutId,
        referenceNumber: mockReferenceNumber,
        checkoutUrl: `/checkout/success?ref=${mockReferenceNumber}`,
        message: 'Sandbox PayMongo Checkout generated. In production, configure PAYMONGO_SECRET_KEY in your environment.'
      });
    }

    // Live PayMongo API Call
    const amountInCentavos = Math.round(Number(amount) * 100);
    const lineItems = items.map((item: any) => ({
      currency: 'PHP',
      amount: Math.round(item.price * 100),
      name: item.name,
      quantity: item.quantity,
      images: [item.image]
    }));

    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(secretKey + ':').toString('base64')}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            line_items: lineItems,
            payment_method_types: ['gcash', 'paymaya', 'card', 'grab_pay', 'dob'],
            description: description || 'Squishy Haven Order Payment',
            customer_email: customerEmail,
            customer_name: customerName,
            customer_phone: customerPhone
          }
        }
      })
    });

    const data: any = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.errors || 'PayMongo API Error' });
    }

    return res.json({
      success: true,
      checkoutUrl: data.data.attributes.checkout_url,
      checkoutId: data.data.id
    });
  } catch (error: any) {
    console.error('PayMongo Checkout Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// 4. PayMongo Webhook Endpoint
app.post('/api/paymongo/webhook', (req: Request, res: Response) => {
  const event = req.body?.data;
  console.log('Received PayMongo Webhook Event:', event?.attributes?.type);

  if (event?.attributes?.type === 'source.chargeable') {
    // Source is ready to be charged
    console.log('Source chargeable for source ID:', event?.id);
  } else if (event?.attributes?.type === 'payment.paid') {
    // Payment was successfully captured
    console.log('Payment captured for payment ID:', event?.id);
  } else if (event?.attributes?.type === 'payment.failed') {
    console.log('Payment failed for payment ID:', event?.id);
  }

  // Always acknowledge PayMongo webhook with 200 OK
  return res.status(200).json({ received: true });
});

// 5. Start Server with Vite Middleware in Dev or Static Files in Production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Squishy Haven server running at http://0.0.0.0:${PORT}`);
  });
}

start();
