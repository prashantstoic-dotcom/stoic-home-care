const fs = require('fs');
let c = fs.readFileSync('lib/gemini.ts', 'utf8');

c = c.replace('return `\\nYou are a top-tier', 'return `\nYou are a top-tier');
fs.writeFileSync('lib/gemini.ts', c);
