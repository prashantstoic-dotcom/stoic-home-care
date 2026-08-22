const fs = require('fs');

function replaceInFile(filePath, searchRegex, replaceWith) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    content = content.replace(searchRegex, replaceWith);
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  } catch (e) {
    console.error('Skipping', filePath, e.message);
  }
}

// 1. bot-logs/route.ts
replaceInFile('app/api/admin/bot-logs/route.ts', /\\Bearer \\\\/, '`Bearer ${secret}`');

// 2. pr-draft/route.ts
replaceInFile('app/api/admin/pr-draft/route.ts', /console\.log\(\\`\[Pitch Crafter\] Pitch passed! Saving to database\.\.\.\\`\);/, 'console.log(`[Pitch Crafter] Pitch passed! Saving to database...`);');

// 3. process-writer/route.ts
replaceInFile('app/api/admin/process-writer/route.ts', /throw new Error\(\\`Failed to fetch or update topic: \\\$\{topicError\?\.message\}\\`\);/, 'throw new Error(`Failed to fetch or update topic: ${topicError?.message}`);');

// 4. seo-decay-radar/route.ts
replaceInFile('app/api/admin/seo-decay-radar/route.ts', /console\.log\(\\`🚨 ALERT: Content Decay Detected on \\\$\{page\.url\}\. Position Drop: \\\$\{positionDrop\.toFixed\(2\)\} spots\.\\`\);/, 'console.log(`🚨 ALERT: Content Decay Detected on ${page.url}. Position Drop: ${positionDrop.toFixed(2)} spots.`);');

// 5. seo-forecast/route.ts (the const query = \ is on line 21)
// Let's replace "const query = \\" with "const query = `"
replaceInFile('app/api/admin/seo-forecast/route.ts', /const query = \\/, 'const query = `');
