const https = require('https');
require('dotenv').config({ path: '.env' });

const urlStr = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

console.log("URL:", urlStr);
console.log("Key starting with:", apiKey ? apiKey.substring(0, 10) : "MISSING");

const url = new URL(`${urlStr}/rest/v1/stoic_services`);
const options = {
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'GET',
  headers: {
    'apikey': apiKey,
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Body:`, body);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
