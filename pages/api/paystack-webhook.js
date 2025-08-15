/**
 * Enhanced Paystack webhook with idempotency, raw payload storage, and validation.
 */
import crypto from 'crypto';
import { addVipUser } from '../../lib/storage.js';
import { hasPaystackEvent, addPaystackEvent } from '../../lib/storage.js';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET || process.env.PAYSTACK_SECRET_KEY;
  if(!secret){
    return res.status(400).json({ error: 'Webhook secret not configured' });
  }
  const sig = req.headers['x-paystack-signature'] || req.headers['X-Paystack-Signature'];
  const raw = JSON.stringify(req.body || {});
  const hash = crypto.createHmac('sha512', secret).update(raw).digest('hex');
  if(sig !== hash){
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = req.body || {};
  const eventId = (event && event.data && event.data.reference) || (event && event.id) || (event && event.event);
  if(!eventId){
    console.warn('No event id found, skipping idempotency check.');
  } else {
    const seen = await hasPaystackEvent(String(eventId));
    if(seen){
      // idempotent response
      return res.json({ ok:true, message: 'event already processed' });
    }
  }

  try{
    // store event to prevent future duplicates
    await addPaystackEvent({ id: String(eventId || ('evt-'+Date.now())), event_type: event.event || 'unknown', payload: event });

    if(event && event.event === 'charge.success'){
      const email = event.data && (event.data.customer && event.data.customer.email);
      await addVipUser({ email: email || ('paystack+'+Date.now()+'@example.com'), plan: 'vip' });
    }
    return res.json({ ok:true });
  }catch(e){
    console.error(e);
    return res.status(500).json({ ok:false, error: e.message });
  }
}