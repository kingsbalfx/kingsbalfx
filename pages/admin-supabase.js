import { useState } from 'react';

export default function AdminSupabase(){
  const [status, setStatus] = useState(null);
  const [sql, setSql] = useState('');
  const [test, setTest] = useState(null);

  async function fetchStatus(){
    const r = await fetch('/api/admin/supabase-status').then(r=>r.json());
    setStatus(r);
  }
  async function fetchSql(){
    const r = await fetch('/api/admin/run-migration').then(r=>r.json());
    if(r && r.sql) setSql(r.sql);
  }
  async function runTest(){
    const r = await fetch('/api/admin/supabase-test', {method:'POST'}).then(r=>r.json());
    setTest(r);
  }

  return (
    <div style={{maxWidth:900,margin:'24px auto',fontFamily:'system-ui,Segoe UI'}}>
      <h1>Admin — Supabase & Migrations</h1>
      <div style={{marginTop:16}}>
        <button onClick={fetchStatus} style={{padding:8}}>Check Supabase Status</button>
        <pre style={{background:'#f3f4f6',padding:12,marginTop:8}}>{JSON.stringify(status,null,2)}</pre>
      </div>
      <div style={{marginTop:16}}>
        <button onClick={fetchSql} style={{padding:8}}>Get Migration SQL</button>
        <div style={{marginTop:8}}>
          <textarea value={sql} readOnly rows={12} style={{width:'100%'}}></textarea>
        </div>
      </div>
      <div style={{marginTop:16}}>
        <button onClick={runTest} style={{padding:8}}>Run Write Test</button>
        <pre style={{background:'#f3f4f6',padding:12,marginTop:8}}>{JSON.stringify(test,null,2)}</pre>
      </div>
    </div>
  );
}