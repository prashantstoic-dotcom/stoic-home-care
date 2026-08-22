const fs = require('fs');
let c = fs.readFileSync('lib/gemini.ts', 'utf8');

c = c.replace('return \\`\n    You are an elite', 'return `\n    You are an elite');
c = c.replace(/\\`\r?\n\}$/m, '`\n}'); // wait, line 383 is just \`;
c = c.replace(/\\\`;/g, '`;');

c = c.replace(/\\\$\{senderName\}/g, '${senderName}');
c = c.replace(/\\\$\{senderTitle\}/g, '${senderTitle}');
c = c.replace(/\\\$\{journalistQuery\}/g, '${journalistQuery}');
c = c.replace(/\\\$\{ragContext\}/g, '${ragContext}');
c = c.replace(/\\\$\{senderBio\}/g, '${senderBio}');

fs.writeFileSync('lib/gemini.ts', c);
