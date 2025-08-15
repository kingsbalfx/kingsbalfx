import { getVipUsers, addVipUser } from '../../lib/storage.js';
export default async function handler(req, res){
  if(req.method === 'GET'){
    try{
      const users = await getVipUsers();
      return res.json({ ok:true, users });
    }catch(e){
      return res.status(500).json({ ok:false, error: e.message });
    }
  }
  if(req.method === 'POST'){
    // Demo: accept email and create fake reference, redirect to success page.
    const body = req.body || {};
    const email = body.email || ('demo+'+Date.now()+'@example.com');
    const ref = 'DEMO-'+Date.now();
    if(!process.env.PAYSTACK_SECRET_KEY){
      // create VIP immediately for demo flows
      const u = await addVipUser({ email, plan: 'vip' });
      return res.json({ ok:true, mode:'demo', ref, user: u });
    }
    // Live flow initiation could be implemented here (call Paystack initialize endpoint)
    return res.status(501).json({ error: 'Live Paystack init not implemented in this endpoint. Use client-side Paystack flow.' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}