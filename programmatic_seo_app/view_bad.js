const fs = require('fs');
const files = [
  'app/api/admin/bot-logs/route.ts',
  'app/api/admin/extract-entities/route.ts',
  'app/api/admin/generate-blog/route.ts',
  'app/api/admin/pr-draft/route.ts',
  'app/api/admin/process-ai-extraction/route.ts',
  'app/api/admin/process-writer/route.ts',
  'app/api/admin/seo-decay-radar/route.ts',
  'app/api/admin/seo-heal/analyze/route.ts',
  'app/api/admin/trigger-writer/route.ts',
  'app/api/sync-bigquery/route.ts',
  'lib/gemini.ts'
];
files.forEach(f => {
  let lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.includes('\\`') || l.includes('\\${') || l.includes('\\Bearer') || l.trim() === 'const query = \\') {
      console.log(f + ':' + (i+1) + ' ' + l.trim());
    }
  });
});
