const https = require('https');

const urlStr = 'https://idlmeduwekczlizgpvcx.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbG1lZHV3ZWtjemxpemdwdmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTUxODQsImV4cCI6MjEwMjEzMTE4NH0.oEULTKL9tE94c6vNp8vZtHGzQG0CFZG9nrHDuER9jvo';

function fetchTable(table) {
  const url = new URL(`${urlStr}/rest/v1/${table}`);
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
      console.log(`--- Table: ${table} ---`);
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Body: ${body.substring(0, 100)}...`);
    });
  });

  req.on('error', (e) => console.error(e));
  req.end();
}

fetchTable('stoic_home_care');
fetchTable('stoic_blogs');
fetchTable('stoic_services');
fetchTable('stoic_equipment');
