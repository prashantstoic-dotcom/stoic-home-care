const fs = require('fs');
let c = fs.readFileSync('components/admin/CrawlBudgetWidget.tsx', 'utf8');

// The file has things like: className=\p-4 border...\>
// or className=\lex ...\> where \ is a form-feed character!
// We can just use a regex: className=\\?[\x00-\x1F]?([^>]+?)\\?>
// Actually, it's easier to just recreate the file since it's short, or carefully replace className=...

// Let's replace ALL instances of `className=\` and whatever follows until `\>` with `className="..."`
// Wait, `\>` is just `\>`.
c = c.replace(/className=\\?(?:[\x00-\x1F\\])?(.*?)\\?>/g, 'className="$1">');
// Let's just fix it by replacing the bad chars manually
c = c.replace(/className=\\p-4 border rounded-lg bg-gray-50 animate-pulse mt-6\\>/g, 'className="p-4 border rounded-lg bg-gray-50 animate-pulse mt-6">');
c = c.replace(/className=\\ g-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6\\>/g, 'className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-6">');
c = c.replace(/className=\\\x0Clex justify-between items-center mb-4\\>/g, 'className="flex justify-between items-center mb-4">');
c = c.replace(/className=\\\text-lg font-bold text-gray-800 flex items-center gap-2\\>/g, 'className="text-lg font-bold text-gray-800 flex items-center gap-2">');
c = c.replace(/className=\\\r?elative flex h-3 w-3\\>/g, 'className="relative flex h-3 w-3">');
c = c.replace(/className=\\\x07nimate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75\\>/g, 'className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75">');
c = c.replace(/className=\\\r?elative inline-flex rounded-full h-3 w-3 bg-green-500\\>/g, 'className="relative inline-flex rounded-full h-3 w-3 bg-green-500">');
c = c.replace(/className=\\px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full\\>/g, 'className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">');
c = c.replace(/className=\\\text-sm text-gray-500 mb-4\\>/g, 'className="text-sm text-gray-500 mb-4">');
c = c.replace(/className=\\overflow-x-auto\\>/g, 'className="overflow-x-auto">');
c = c.replace(/className=\\w-full text-left text-sm\\>/g, 'className="w-full text-left text-sm">');
c = c.replace(/className=\\\text-gray-500 border-b border-gray-100\\>/g, 'className="text-gray-500 border-b border-gray-100">');
c = c.replace(/className=\\pb-2 font-semibold\\>/g, 'className="pb-2 font-semibold">');
c = c.replace(/className=\\divide-y divide-gray-50\\>/g, 'className="divide-y divide-gray-50">');
c = c.replace(/className=\\hover:bg-gray-50 transition-colors\\>/g, 'className="hover:bg-gray-50 transition-colors">');
c = c.replace(/className=\\py-3 font-medium text-blue-600\\>/g, 'className="py-3 font-medium text-blue-600">');
c = c.replace(/className=\\py-3 text-gray-700 truncate max-w-xs\\>/g, 'className="py-3 text-gray-700 truncate max-w-xs">');
c = c.replace(/className=\\py-3\\>/g, 'className="py-3">');
c = c.replace(/className=\\px-2 py-1 text-xs rounded-full \\\\>/g, 'className="px-2 py-1 text-xs rounded-full ">');
c = c.replace(/className=\\\x0Cont-semibold \\\\>/g, 'className="font-semibold ">');
c = c.replace(/className=\\py-3 text-gray-400 text-xs\\>/g, 'className="py-3 text-gray-400 text-xs">');
c = c.replace(/className=\\py-4 text-center text-gray-500 italic\\>/g, 'className="py-4 text-center text-gray-500 italic">');

// There are a few others that might have `\n` or `\r`
// It's safer to just overwrite the file entirely with a clean version.
