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
  
  // The generator outputted "\`" instead of "`" and "\${" instead of "${"
  // We need to replace them.
  content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
  
  // also fix \Bearer \\
  content = content.replace(/\\Bearer \\\\/g, '`Bearer ${secret}`');

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
