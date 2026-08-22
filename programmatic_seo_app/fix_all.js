const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('app');
files.push(...walk('components'), ...walk('lib'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Fix bot-logs
  content = content.replace(/if \(authHeader !== \\Bearer \\\\\) \{/, 'if (authHeader !== `Bearer ${secret}`) {');

  // Fix process-writer and others that use \` but NOT inside NO \`\`\`
  // Because \` was parsed as \f, \t etc when followed by certain letters, wait, in .ts files it literally wrote \` because ` is not an escape character in JSON.
  // Actually, \` is not a valid JSON escape. So JSON.parse("\\`") gives "\`" or throws an error.
  // Let's just fix the known bad lines.
  
  content = content.replace(/throw new Error\(\\`Failed to save pitch: \\\$\{insertError\?\.message\}\\`\);/g, 'throw new Error(`Failed to save pitch: ${insertError?.message}`);');
  content = content.replace(/console\.log\(\\`\[Pitch Crafter\] Pitch passed! Saving to database\.\.\.\\`\);/g, 'console.log(`[Pitch Crafter] Pitch passed! Saving to database...`);');
  content = content.replace(/console\.error\(\\`\[Pitch Crafter\] Pitch saved, but failed to update opportunity status: \\`, updateError\);/g, 'console.error(`[Pitch Crafter] Pitch saved, but failed to update opportunity status: `, updateError);');
  content = content.replace(/console\.log\(\\`\[Pitch Crafter\] Pitch successfully saved to DB\. Ready for review\/dispatch\.\\`\);/g, 'console.log(`[Pitch Crafter] Pitch successfully saved to DB. Ready for review/dispatch.`);');

  content = content.replace(/throw new Error\(\\`Failed to fetch or update topic: \\\$\{topicError\?\.message\}\\`\);/g, 'throw new Error(`Failed to fetch or update topic: ${topicError?.message}`);');
  content = content.replace(/throw new Error\(\\`CRITICAL: Failed to parse outline JSON: \\\$\{e\.message\}\\`\);/g, 'throw new Error(`CRITICAL: Failed to parse outline JSON: ${e.message}`);');
  
  // process-writer linking prompt has DO NOT add markdown like \`\`\`html. 
  // Let's just replace all \` with ` EXCEPT when it's NO \`\`\` or like \`\`\`
  content = content.replace(/\\`/g, (match, offset, str) => {
    if (str.substr(offset - 2, 2) === '\\`' || str.substr(offset + 2, 2) === '\\`') return match;
    if (str.substr(offset - 3, 3) === 'NO ') return match;
    return '`';
  });
  
  // Fix \${
  content = content.replace(/\\\$\{/g, '${');

  // Fix trigger-writer
  content = content.replace(/if \(authHeader !== `Bearer \$\{process\.env\.ADMIN_API_SECRET\}`\) \{/, 'if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {');
  content = content.replace(/const destinationUrl = `\$\{baseUrl\}\/api\/admin\/process-writer`;/, 'const destinationUrl = `${baseUrl}/api/admin/process-writer`;');
  content = content.replace(/message: `Job triggered successfully for topic: \$\{topicId\}`,/, 'message: `Job triggered successfully for topic: ${topicId}`,');

  // Fix seo-forecast const query = \
  content = content.replace(/const query = \\\r?\n/g, 'const query = `\n');
  content = content.replace(/MODEL \\\\seo_analytics/g, 'MODEL `seo_analytics');
  content = content.replace(/model\\\\,/g, 'model`,');
  content = content.replace(/    \\;/g, '    `;');

  // Fix sync-bigquery
  content = content.replace(/if \(authHeader !== \\Bearer \\\\\) \{/, 'if (authHeader !== `Bearer ${secret}`) {');
  content = content.replace(/message: \\Successfully synced \\ records to BigQuery.\\/g, 'message: `Successfully synced records to BigQuery.`');

  // Fix JSX classNames in .tsx files
  if (f.endsWith('.tsx')) {
    // Replace className=\... \> with className="..."
    // The bad characters might be literal control characters.
    // Let's use a regex that captures everything between className=\ and \>
    content = content.replace(/className=\\?([\s\S]*?)\\?>/g, (match, p1) => {
      // p1 might contain weird characters, we need to clean them up.
      let cleaned = p1.replace(/[\x00-\x1F]/g, (char) => {
        if (char === '\f') return 'f';
        if (char === '\t') return 't';
        if (char === '\r') return 'r';
        if (char === '\n') return 'n';
        if (char === '\x07') return 'a'; // \a is bell
        return '';
      });
      // also remove any leading backslashes
      cleaned = cleaned.replace(/^\\/, '');
      return `className="${cleaned}">`;
    });
  }

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
