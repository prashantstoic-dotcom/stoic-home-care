const fs = require('fs');

let c = fs.readFileSync('lib/gemini.ts', 'utf8');
c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n  }))\n});');
c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n  }))\r\n});');
fs.writeFileSync('lib/gemini.ts', c);

let s = fs.readFileSync('lib/sitemap-parser.ts', 'utf8');
s = s.replace(/fetch\(\\\/sitemap\.xml\\\)/g, "fetch('/sitemap.xml')");
s = s.replace(/fetch\(\\\$\{loc\}\\\)/g, 'fetch(`${loc}`)');
fs.writeFileSync('lib/sitemap-parser.ts', s);
