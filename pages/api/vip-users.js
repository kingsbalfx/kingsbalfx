import { getVipUsers, addVipUser } from '../../lib/storage.js';

export default async function handler(req, res){
  if(req.method === 'GET'){
    try{
      const users = await getVipUsers();
      return res.json({ ok:true, users });
    }catch(e){
      console.error(e);
      return res.status(500).json({ ok:false, error: e.message || 'error' });
    }
  }
  if(req.method === 'POST'){
    try{
      const body = req.body || {};
      if(!body.email) return res.status(400).json({ ok:false, error: 'missing email' });
      const user = await addVipUser({ email: body.email, plan: body.plan || 'vip' });
      return res.json({ ok:true, user });
    }catch(e){
      console.error(e);
      return res.status(500).json({ ok:false, error: e.message || 'error' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}