export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST allowed' });

  const { title, amount } = req.body;

  try {
    const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`
      },
      body: JSON.stringify({
        data: {
          attributes: {
            line_items: [{
              name: title,
              amount: amount, // Amount in centavos
              currency: 'PHP',
              quantity: 1
            }],
            payment_method_types: ['gcash', 'paymaya', 'card'],
            description: `Purchase of ${title}`
          }
        }
      })
    });

    const data = await response.json();
    return res.status(200).json({ checkoutUrl: data.data.attributes.checkout_url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
