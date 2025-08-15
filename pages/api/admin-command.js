/**
 * Basic admin command runner kept intentionally small.
 * Accepts POST with ?pw=ADMIN_PASSWORD or header X-ADMIN-PW
 * Commands supported: export-vips (returns CSV), mode-toggle (toggles demo/live)
 */
import { getVipUsers, getSettings, setSettings } from '../../lib/storage.js';

function checkAuth(req){
  const pw = req.headers['x-admin-pw'] || req.query.pw || (req.body && req.body.pw) || '';
  return pw && process.env.ADMIN_PASSWORD && pw === process.env.ADMIN_PASSWORD;
}

function toCsv(arr){
  if(!Array.isArray(arr)) return '';
  const cols = Object.keys(arr[0]||{});
  const lines = [cols.join(',')];
  for(const r of arr){
    lines.push(cols.map(c => `"${String(r[c]||'').replace(/"/g,'""')}"`).join(','));
  }
  return lines.join('\n');
}

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if(!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' });

  const cmd = req.body && req.body.cmd;
  if(!cmd) return res.status(400).json({ error: 'cmd required' });

  try{
    if(cmd === 'export-vips'){
      const vips = await getVipUsers();
      const csv = toCsv(vips);
      res.setHeader('Content-Type','text/csv');
      return res.send(csv);
    }
    if(cmd === 'mode-toggle'){
      const s = await getSettings();
      const next = (s && s.mode === 'live') ? 'demo' : 'live';
      await setSettings({ mode: next });
      return res.json({ ok:true, mode: next });
    }
    return res.status(400).json({ error: 'unknown command' });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
}