const fs = require('fs');
let c = fs.readFileSync('app/api/sync-bigquery/route.ts', 'utf8');
c = c.replace(/\\Bearer \\\\/, '`Bearer ${secret}`');
fs.writeFileSync('app/api/sync-bigquery/route.ts', c);
