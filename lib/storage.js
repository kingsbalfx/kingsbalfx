/**
 * storage.js
 * Provides a simple storage adapter: Supabase (server role key) if configured,
 * otherwise falls back to file-based JSON in /data/*.json (demo mode).
 *
 * Tables expected in Supabase (you may create via SQL or Supabase UI):
 * - vip_users (id uuid, email text, plan text, created_at timestamp)
 * - subscribers (id uuid, email text, plan text, created_at timestamp)
 * - settings (id text primary key, value json)
 *
 * NOTE: This file runs server-side in Next API routes.
 */
import fs from 'fs';
import path from 'path';

let useSupabase = false;
let supabase = null;
try {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    // lazy import to avoid requiring it in environments without the package installed
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });
    useSupabase = true;
  }
} catch(e) {
  // if import fails, we fall back to fs
  useSupabase = false;
}

const dataDir = path.join(process.cwd(), 'data');
function readFile(name){
  try{
    const p = path.join(dataDir, name);
    if(!fs.existsSync(p)) return [];
    return JSON.parse(fs.readFileSync(p,'utf8'));
  }catch(e){ return []; }
}
function writeFile(name, obj){
  try{
    const p = path.join(dataDir, name);
    fs.writeFileSync(p, JSON.stringify(obj, null, 2));
    return true;
  }catch(e){ return false; }
}

export async function getVipUsers(){
  if(useSupabase){
    const { data, error } = await supabase.from('vip_users').select('*').order('created_at',{ascending:false}).limit(1000);
    if(error) throw error;
    return data || [];
  } else {
    return readFile('vip_users.json');
  }
}

export async function addVipUser(user){
  if(useSupabase){
    const { data, error } = await supabase.from('vip_users').insert([user]).select();
    if(error) throw error;
    return data && data[0];
  } else {
    const arr = readFile('vip_users.json');
    arr.unshift(Object.assign({created_at: new Date().toISOString()}, user));
    writeFile('vip_users.json', arr);
    return arr[0];
  }
}

export async function getSubscribers(){
  if(useSupabase){
    const { data, error } = await supabase.from('subscribers').select('*').order('created_at',{ascending:false}).limit(2000);
    if(error) throw error;
    return data || [];
  } else {
    return readFile('subscribers.json');
  }
}

export async function addSubscriber(sub){
  if(useSupabase){
    const { data, error } = await supabase.from('subscribers').insert([sub]).select();
    if(error) throw error;
    return data && data[0];
  } else {
    const arr = readFile('subscribers.json');
    arr.unshift(Object.assign({created_at: new Date().toISOString()}, sub));
    writeFile('subscribers.json', arr);
    return arr[0];
  }
}

export async function getSettings(){
  if(useSupabase){
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    if(error) throw error;
    if(data && data.length) return data[0].value || {};
    return {};
  } else {
    const arr = readFile('settings.json');
    return (arr && arr.mode) ? arr : { mode: 'demo' };
  }
}

export async function setSettings(obj){
  if(useSupabase){
    const { data, error } = await supabase.from('settings').upsert([{ id: 'singleton', value: obj}]).select();
    if(error) throw error;
    return data && data[0];
  } else {
    writeFile('settings.json', obj);
    return obj;
  }
}

/* Paystack events storage (idempotency) */
export async function getPaystackEvents(){
  if(useSupabase){
    const { data, error } = await supabase.from('paystack_events').select('*').order('received_at',{ascending:false}).limit(1000);
    if(error) throw error;
    return data || [];
  } else {
    return readFile('paystack_events.json');
  }
}

export async function addPaystackEvent(evt){
  // evt should contain { id, event_type, payload }
  if(!evt || !evt.id) throw new Error('missing id');
  if(useSupabase){
    const { data, error } = await supabase.from('paystack_events').insert([{
      id: evt.id, event_type: evt.event_type || '', payload: evt.payload || {}
    }]).select();
    if(error) throw error;
    return data && data[0];
  } else {
    const arr = readFile('paystack_events.json');
    // prevent duplicates
    if(arr.find(x => x.id === evt.id)) return null;
    arr.unshift(Object.assign({received_at: new Date().toISOString()}, evt));
    writeFile('paystack_events.json', arr);
    return arr[0];
  }
}

export async function hasPaystackEvent(id){
  if(!id) return false;
  if(useSupabase){
    const { data, error } = await supabase.from('paystack_events').select('id').eq('id', id).limit(1);
    if(error) throw error;
    return (data && data.length>0);
  } else {
    const arr = readFile('paystack_events.json');
    return !!arr.find(x => x.id === id);
  }
}