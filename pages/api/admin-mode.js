import { getSettings, setSettings } from '../../lib/storage.js';

export default async function handler(req, res){
  if(req.method === 'GET'){
    try{
      const settings = await getSettings();
      return res.json({ ok:true, settings });
    }catch(e){
      return res.status(500).json({ ok:false, error: e.message });
    }
  }

  if(req.method === 'POST'){
    const body = req.body || {};
    if(!body.mode) return res.status(400).json({ error: 'mode required' });
    try{
      const s = await setSettings({ mode: body.mode });
      return res.json({ ok:true, settings: s });
    }catch(e){
      return res.status(500).json({ ok:false, error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}