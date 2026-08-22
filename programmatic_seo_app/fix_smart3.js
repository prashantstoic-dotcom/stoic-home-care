const fs = require('fs');

function fix(f) {
  let content = fs.readFileSync(f, 'utf8');
  let lines = content.split('\n');
  lines = lines.map(line => {
    // Only replace if it contains \` and \${ and it's NOT a NO ```json line
    if (line.includes('\\`') && !line.includes('NO \\`\\`\\`')) {
      line = line.replace(/\\`/g, '`').replace(/\\\$/g, '$');
    }
    return line;
  });
  fs.writeFileSync(f, lines.join('\n'));
}

fix('app/api/admin/process-writer/route.ts');
fix('app/api/admin/pr-draft/route.ts');
fix('app/api/sync-bigquery/route.ts');
