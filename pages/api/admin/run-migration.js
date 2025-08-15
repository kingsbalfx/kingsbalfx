/**
 * Returns the SQL migration file for manual execution. If Supabase is configured,
 * the endpoint will return the SQL and instruct the admin to run it in Supabase SQL editor.
 */
import fs from 'fs';
import path from 'path';
export default async function handler(req, res){
  const p = path.join(process.cwd(), 'migrations', 'supabase_init.sql');
  if(!fs.existsSync(p)) return res.status(404).json({ error: 'migration file not found' });
  const sql = fs.readFileSync(p,'utf8');
  return res.json({ ok:true, sql });
}