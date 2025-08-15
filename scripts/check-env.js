const required = ['ADMIN_PASSWORD','PAYSTACK_SECRET_KEY','MAILCHIMP_API_KEY','MAILCHIMP_LIST_ID','PUBLIC_BASE_URL'];
const missing = required.filter(k => !process.env[k] || process.env[k] === '');
if(missing.length){
  console.error('Missing required env vars:', missing.join(', '));
  process.exit(1);
}
console.log('All required env vars present.');