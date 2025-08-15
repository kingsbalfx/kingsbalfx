import { addSubscriber, getSubscribers } from '../../lib/storage.js';
export default async function handler(req, res){
  if(req.method === 'POST'){
    const { email, plan } = req.body || {};
    if(!email) return res.status(400).json({ ok:false, error: 'Email required' });
    try{
      // Save to storage
      const sub = await addSubscriber({ email, plan: plan || 'free' });

      // Optionally add to Mailchimp if configured
      if(process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID){
        try{
          const dc = process.env.MAILCHIMP_API_KEY.split('-').pop();
          const url = `https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;
          const body = { email_address: email, status: 'subscribed' };
          await fetch(url, {
            method: 'POST',
            headers: { Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
        }catch(e){
          console.warn('Mailchimp add failed', e.message);
        }
      }

      return res.json({ ok:true, sub });
    }catch(e){
      console.error(e);
      return res.status(500).json({ ok:false, error: e.message || 'error' });
    }
  }

  if(req.method === 'GET'){
    try{
      const subs = await getSubscribers();
      return res.json({ ok:true, subs });
    }catch(e){
      return res.status(500).json({ ok:false, error: e.message || 'error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}