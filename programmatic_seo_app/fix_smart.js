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
  
  // Replace \` with ` ONLY if it's not part of a sequence of \`
  content = content.replace(/\\`/g, (match, offset, string) => {
    // check if it's part of \`\`\`
    const prev = string.substr(offset - 2, 2);
    const next = string.substr(offset + 2, 2);
    if (prev === '\\`' || next === '\\`') {
      return match; // keep it as \`
    }
    return '`';
  });
  
  // Replace \${ with ${
  content = content.replace(/\\\${/g, '${');
  
  // Replace \Bearer \\ with `Bearer ${secret}`
  content = content.replace(/\\Bearer \\\\/g, '`Bearer ${secret}`');

  // Fix seo-forecast const query = \
  content = content.replace(/const query = \\\n/g, 'const query = `\n');

  // Also fix seo-forecast EOF issue if we replace const query = \ with const query = `
  // The query string never closes if it was missing the closing backtick.
  // Let's check if seo-forecast has a closing backtick for the query.
  if (f.includes('seo-forecast')) {
    // If we opened a backtick, we need to ensure it closes at the end of the query block.
    // The original file ends the query block with:
    //     `;
    // Wait, let's see what seo-forecast looks like. 
    // If the generator emitted \ at the start, maybe it emitted \ at the end.
    content = content.replace(/    \\;/g, '    `;');
  }

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
