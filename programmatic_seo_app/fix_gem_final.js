const fs = require('fs');
let c = fs.readFileSync('lib/gemini.ts', 'utf8');

c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\n  }))\n});');
c = c.replace('keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n});', 'keywordsToInclude: z.array(z.string()).describe("List of missing entities/LSI keywords that the writer MUST include in the paragraph under this heading")\r\n  }))\r\n});');

c = c.replace('message: \\`CRITICAL: You claimed to use the keyword "\\${kw}", but it is missing from the html_content. Do not lie.\\`,', 'message: `CRITICAL: You claimed to use the keyword "${kw}", but it is missing from the html_content. Do not lie.`,');

fs.writeFileSync('lib/gemini.ts', c);
