const fs = require('fs');
let c = fs.readFileSync('lib/gemini.ts', 'utf8');

c = c.replace(/\\`/g, (match, offset, str) => {
  const prev = str.substr(offset - 2, 2);
  const next = str.substr(offset + 2, 2);
  if (prev === '\\`' || next === '\\`') return match;
  return '`';
});

c = c.replace(/\\\$/g, '$');

fs.writeFileSync('lib/gemini.ts', c);
