export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, amount, callback_url } = req.body || {};
  if(!email || !amount) return res.status(400).json({ error: 'email and amount required' });

  // Demo mode: return success URL immediately
  if(!process.env.PAYSTACK_SECRET_KEY){
    const ref = 'DEMO-'+Date.now();
    const authorization_url = `${process.env.PUBLIC_BASE_URL || 'process.env.PUBLIC_BASE_URL || 'http://process.env.PUBLIC_BASE_URL || 'process.env.PUBLIC_BASE_URL || 'localhost:3000''''}/success?ref=${encodeURIComponent(ref)}&email=${encodeURIComponent(email)}`;
    return res.json({ ok:true, mode:'demo', authorization_url, reference: ref });
  }

  try{
    const url = 'https://api.paystack.co/transaction/initialize';
    const body = {
      email,
      amount: Math.round(Number(amount) * 100), // convert NGN to kobo (Paystack expects kobo)
      callback_url: callback_url || (process.env.PUBLIC_BASE_URL ? (process.env.PUBLIC_BASE_URL + '/success') : undefined)
    };
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    if(!j || !j.status) return res.status(400).json({ ok:false, raw: j });
    return res.json({ ok:true, mode:'live', authorization_url: j.data.authorization_url, reference: j.data.reference, raw: j });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message || 'error' });
  }
}