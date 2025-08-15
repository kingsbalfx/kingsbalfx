/**
 * Performs a small write/read test to storage to validate Supabase or FS write access.
 * Warning: writes a transient test record.
 */
import { addSubscriber, getSubscribers } from '../../../lib/storage.js';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try{
    const email = `test+${Date.now()}@example.com`;
    await addSubscriber({ email, plan: 'test' });
    const subs = await getSubscribers();
    return res.json({ ok:true, message: 'write_test_ok', last: subs && subs[0] });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
}