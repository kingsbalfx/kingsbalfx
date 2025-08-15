import { addVipUser } from '../../lib/storage.js';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { reference, email } = req.body || {};
  if(!reference) return res.status(400).json({ error: 'Missing reference' });

  // If in demo mode (no PAYSTACK_SECRET_KEY) simply mark VIP
  if(!process.env.PAYSTACK_SECRET_KEY){
    try{
      const user = await addVipUser({ email: email || ('demo+'+Date.now()+'@example.com'), plan: 'vip' });
      return res.json({ ok:true, mode: 'demo', user });
    }catch(e){
      return res.status(500).json({ ok:false, error: e.message });
    }
  }

  // Live verify via Paystack API
  try{
    const resp = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });
    const data = await resp.json();
    if(!data || !data.status || !data.data || data.status === false) {
      return res.status(400).json({ ok:false, error: 'Payment verification failed', raw: data });
    }
    // On successful verify, store VIP user
    const user = await addVipUser({ email: email || (data.data.customer && data.data.customer.email) || ('paystack+'+Date.now()+'@example.com'), plan: 'vip' });
    return res.json({ ok:true, mode: 'live', user, raw: data });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message || 'error' });
  }
}