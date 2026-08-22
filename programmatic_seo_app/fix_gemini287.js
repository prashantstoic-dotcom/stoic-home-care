const fs = require('fs');
let c = fs.readFileSync('lib/gemini.ts', 'utf8');

c = c.replace('errors: \\`CRITICAL: Invalid JSON structure. Failed to parse string. Details: \\${error.message}\\` };', 'errors: `CRITICAL: Invalid JSON structure. Failed to parse string. Details: ${error.message}` };');

fs.writeFileSync('lib/gemini.ts', c);
