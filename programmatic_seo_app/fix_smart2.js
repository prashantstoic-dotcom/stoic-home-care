const fs = require('fs');

let c = fs.readFileSync('app/api/admin/seo-forecast/route.ts', 'utf8');
c = c.replace('const query = \\', 'const query = `');
c = c.replace('\\;', '`;');
c = c.replace(/\\\\\\/g, '`');
fs.writeFileSync('app/api/admin/seo-forecast/route.ts', c);

// Let's run my fix_specific.js for the rest
function replaceInFile(filePath, searchRegex, replaceWith) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    content = content.replace(searchRegex, replaceWith);
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  } catch (e) {}
}

replaceInFile('app/api/admin/bot-logs/route.ts', /\\Bearer \\\\/, '`Bearer ${secret}`');
replaceInFile('app/api/admin/pr-draft/route.ts', /console\.log\(\\`\[Pitch Crafter\] Pitch passed! Saving to database\.\.\.\\`\);/, 'console.log(`[Pitch Crafter] Pitch passed! Saving to database...`);');
replaceInFile('app/api/admin/pr-draft/route.ts', /throw new Error\(\\`Failed to save pitch: \\\$\{insertError\?\.message\}\\`\);/, 'throw new Error(`Failed to save pitch: ${insertError?.message}`);');

replaceInFile('app/api/admin/process-writer/route.ts', /throw new Error\(\\`Failed to fetch or update topic: \\\$\{topicError\?\.message\}\\`\);/, 'throw new Error(`Failed to fetch or update topic: ${topicError?.message}`);');
replaceInFile('app/api/admin/process-writer/route.ts', /throw new Error\("suggested_outline is neither a string nor an array\."\);\n      \}\n    \} catch \(e: any\) \{\n      throw new Error\(\\`CRITICAL: Failed to parse outline JSON: \\\$\{e\.message\}\\`\);/g, 'throw new Error("suggested_outline is neither a string nor an array.");\n      }\n    } catch (e: any) {\n      throw new Error(`CRITICAL: Failed to parse outline JSON: ${e.message}`);');
replaceInFile('app/api/admin/seo-decay-radar/route.ts', /console\.log\(\\`🚨 ALERT: Content Decay Detected on \\\$\{page\.url\}\. Position Drop: \\\$\{positionDrop\.toFixed\(2\)\} spots\.\\`\);/, 'console.log(`🚨 ALERT: Content Decay Detected on ${page.url}. Position Drop: ${positionDrop.toFixed(2)} spots.`);');
replaceInFile('app/api/admin/seo-heal/analyze/route.ts', /const url = \\`https:\/\/www\.googleapis\.com\/customsearch\/v1\?key=\\\$\{apiKey\}&cx=\\\$\{cx\}&q=\\\$\{encodeURIComponent\(keyword\)\}&num=5\\`;/, 'const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(keyword)}&num=5`;');
replaceInFile('app/api/admin/trigger-writer/route.ts', /if \(authHeader !== \\`Bearer \\\$\{process\.env\.ADMIN_API_SECRET\}\\`\) \{/, 'if (authHeader !== `Bearer ${process.env.ADMIN_API_SECRET}`) {');
