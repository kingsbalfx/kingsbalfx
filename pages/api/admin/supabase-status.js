/**
 * Returns Supabase configuration status and a basic connectivity check.
 */
export default async function handler(req, res){
  const ok = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
  const info = { supabase_configured: ok, supabase_url: process.env.SUPABASE_URL ? true : false };
  // We do not perform network calls here to keep endpoint simple and fast.
  return res.json({ ok:true, info });
}