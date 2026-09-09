#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, '../templates/admin.html');
if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: templates/admin.html missing');
  process.exit(1);
}
const html = fs.readFileSync(htmlPath, 'utf8');
const fails = [];
const must = (ok, msg) => { if (!ok) fails.push(msg); };

must(html.includes('data-theme'), 'missing data-theme');
must(/admin-theme:/.test(html), 'missing localStorage key prefix admin-theme:');
must(/hashchange|location\.hash/.test(html), 'missing hash router');
must(html.includes('USE_MOCK'), 'missing USE_MOCK');
must(html.includes('--bg-sidebar'), 'missing --bg-sidebar');
must(html.includes('--text-1'), 'missing --text-1');
must(/\[data-theme=["']dark["']\]/.test(html), 'missing dark theme block');
must(/id=["']drawer["']|class=["'][^"']*drawer/.test(html), 'missing drawer');
must(html.includes('sidebar') || html.includes('aside'), 'missing sidebar');
must(!html.includes('#00fffc'), 'dashboard cyan #00fffc leaked');
must(!html.includes('transform: scale'), 'must not use dashboard scale canvas');
must(!/id=["']screen["']/.test(html), 'must not use #screen dashboard canvas id');
must(html.includes('screen.html'), 'example sitemap link to screen.html missing');

if (fails.length) {
  console.error('FAIL:\n' + fails.join('\n'));
  process.exit(1);
}
console.log('OK');
