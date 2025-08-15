export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email } = req.body || {};
  if(!email) return res.status(400).json({ error: 'Missing email' });

  if(!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_LIST_ID){
    return res.status(400).json({ error: 'Mailchimp not configured' });
  }

  try{
    const dc = process.env.MAILCHIMP_API_KEY.split('-').pop();
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;
    const body = { email_address: email, status: 'subscribed' };
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const j = await r.json();
    if(r.status >= 400) return res.status(400).json({ ok:false, error: j });
    return res.json({ ok:true, result: j });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
}