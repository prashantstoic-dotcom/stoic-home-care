const fs = require('fs');

// 1. Fix lib/gemini.ts
let g = fs.readFileSync('lib/gemini.ts', 'utf8');
// Look for keywordsToInclude...
g = g.replace(/keywordsToInclude: z\.array\(z\.string\(\)\)\.describe\("List of missing entities\/LSI keywords that the writer MUST include in the paragraph under this heading"\)\r?\n\}\);/g, 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n  }))\n});');
fs.writeFileSync('lib/gemini.ts', g);

// 2. Fix sitemap-parser.ts
let s = fs.readFileSync('lib/sitemap-parser.ts', 'utf8');
s = s.replace(/fetch\(\\\/sitemap\.xml\\\)/g, "fetch('/sitemap.xml')");
s = s.replace(/fetch\(\\\$\{loc\}\\\)/g, 'fetch(`${loc}`)');
fs.writeFileSync('lib/sitemap-parser.ts', s);

// 3. Fix PRReviewModal.tsx
let pr = fs.readFileSync('components/admin/PRReviewModal.tsx', 'utf8');
// The regex is: /<br\\s*\\/?>/gi
pr = pr.replace(/\/<br\\\\s\*\\\\\/?>\/gi/g, '/<br\\s*\\/?>/gi');
pr = pr.replace(/\/<\[\^>\]\*\>?\/gm/g, '/<[^>]*>?/gm');
fs.writeFileSync('components/admin/PRReviewModal.tsx', pr);
