const fs = require('fs');
let s = fs.readFileSync('lib/sitemap-parser.ts', 'utf8');
s = s.replace(/fetch\(\\\\/g, "fetch('/");
s = s.replace(/sitemap\.xml\\\\/g, "sitemap.xml'");
s = s.replace(/console\.error\(\\\\Failed to parse sitemap chunk: \\\\\\\\\);/g, "console.error('Failed to parse sitemap chunk:', err);");
fs.writeFileSync('lib/sitemap-parser.ts', s);
