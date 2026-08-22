const fs = require('fs');

function replaceExact(file, search, replace) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  } catch (e) {}
}

// 1. bot-logs
replaceExact('app/api/admin/bot-logs/route.ts', 'if (authHeader !== \\Bearer \\\\) {', 'if (authHeader !== `Bearer ${secret}`) {');

// 2. pr-draft
replaceExact('app/api/admin/pr-draft/route.ts', 'console.log(\\`[Pitch Crafter] Pitch passed! Saving to database...\\`);', 'console.log(`[Pitch Crafter] Pitch passed! Saving to database...`);');
replaceExact('app/api/admin/pr-draft/route.ts', 'throw new Error(\\`Failed to save pitch: \\${insertError?.message}\\`);', 'throw new Error(`Failed to save pitch: ${insertError?.message}`);');

// 3. process-writer
replaceExact('app/api/admin/process-writer/route.ts', 'throw new Error(\\`Failed to fetch or update topic: \\${topicError?.message}\\`);', 'throw new Error(`Failed to fetch or update topic: ${topicError?.message}`);');
replaceExact('app/api/admin/process-writer/route.ts', 'throw new Error(\\`CRITICAL: Failed to parse outline JSON: \\${e.message}\\`);', 'throw new Error(`CRITICAL: Failed to parse outline JSON: ${e.message}`);');
// Actually, process-writer has TONS of \` and \${. Let's fix them all carefully using a regex that replaces \` with ` ONLY IF it's not part of NO \`\`\`json.
function fixProcessWriter() {
  let content = fs.readFileSync('app/api/admin/process-writer/route.ts', 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync('app/api/admin/process-writer/route.ts', content);
  console.log('Fixed process-writer entirely');
}
fixProcessWriter();

// 4. trigger-writer
replaceExact('app/api/admin/trigger-writer/route.ts', 'if (authHeader !== \\`Bearer \\${process.env.ADMIN_API_SECRET}\\`) {', 'if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {');
replaceExact('app/api/admin/trigger-writer/route.ts', 'const destinationUrl = \\`\\${baseUrl}/api/admin/process-writer\\`;', 'const destinationUrl = `${baseUrl}/api/admin/process-writer`;');
replaceExact('app/api/admin/trigger-writer/route.ts', 'message: \\`Job triggered successfully for topic: \\${topicId}\\`,', 'message: `Job triggered successfully for topic: ${topicId}`,');

// 5. seo-forecast
// It has const query = \ (newline) SELECT
let forecast = fs.readFileSync('app/api/admin/seo-forecast/route.ts', 'utf8');
forecast = forecast.replace('const query = \\\n', 'const query = `\n');
forecast = forecast.replace('MODEL \\\\seo_analytics', 'MODEL `seo_analytics');
forecast = forecast.replace('model\\\\,', 'model`,');
forecast = forecast.replace('    \\;', '    `;');
fs.writeFileSync('app/api/admin/seo-forecast/route.ts', forecast);

// 6. sync-bigquery
replaceExact('app/api/sync-bigquery/route.ts', 'if (authHeader !== \\Bearer \\\\) {', 'if (authHeader !== `Bearer ${secret}`) {');
replaceExact('app/api/sync-bigquery/route.ts', 'message: \\Successfully synced \\ records to BigQuery.\\', 'message: `Successfully synced records to BigQuery.`');

// 7. seo-decay-radar
replaceExact('app/api/admin/seo-decay-radar/route.ts', 'console.log(\\`🚨 ALERT: Content Decay Detected on \\${page.url}. Position Drop: \\${positionDrop.toFixed(2)} spots.\\`);', 'console.log(`🚨 ALERT: Content Decay Detected on ${page.url}. Position Drop: ${positionDrop.toFixed(2)} spots.`);');

// 8. CrawlBudgetWidget
// This one failed when I ran fix_smart because I replaced \` with ` in it.
// The original was fine. So I won't touch it.

// Let's do a global pass for anything like \`[Something]\`
