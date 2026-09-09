#!/usr/bin/env node
/**
 * 校验后台 HTML 是否守住 themes.md 的「脸」与硬性规则。
 *
 *   node scripts/check-template.js                 # 校验 Skill 自带模板
 *   node scripts/check-template.js path/admin.html # 校验实际生成物（Step 5 必跑）
 */
const fs = require('fs');
const path = require('path');

const arg = process.argv[2];
const htmlPath = arg
  ? path.resolve(process.cwd(), arg)
  : path.join(__dirname, '../templates/admin.html');
const isTemplate = !arg;

if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: ' + htmlPath + ' missing');
  process.exit(1);
}
const html = fs.readFileSync(htmlPath, 'utf8');
const fails = [];
const must = (ok, msg) => { if (!ok) fails.push(msg); };

/* ---- 壳与路由 ---- */
must(html.includes('data-theme'), 'missing data-theme');
must(/admin-theme:/.test(html), 'missing localStorage key prefix admin-theme:');
must(/hashchange|location\.hash/.test(html), 'missing hash router');
must(html.includes('USE_MOCK'), 'missing USE_MOCK');
must(/\[data-theme=["']dark["']\]/.test(html), 'missing dark theme block');
must(/id=["']drawer["']|class=["'][^"']*drawer/.test(html), 'missing drawer');
must(html.includes('sidebar') || html.includes('aside'), 'missing sidebar');

/* ---- token 齐备 ---- */
[
  '--bg-sidebar', '--bg-muted', '--bg-hover', '--text-1', '--text-3',
  '--color-primary-hover', '--color-primary-soft', '--ring',
  '--border-strong', '--shadow-1', '--shadow-2',
  '--radius', '--radius-pill', '--dur', '--ease',
  '--fs-title', '--fs-body', '--fs-label', '--fs-micro',
  '--sp-2', '--sp-4', '--ctl-h', '--row-h',
  '--sidebar-accent', '--bg-sidebar-active', '--text-on-sidebar-strong', '--ico',
].forEach((t) => must(html.includes(t), 'missing token ' + t));

/* ---- 精工脸 ---- */
must(html.includes('#3b5bdb'), 'missing craft primary #3b5bdb');
must(html.includes('brand-mark'), 'missing sidebar brand mark');
must(html.includes('theme-seg'), 'missing segmented theme toggle');
must(html.includes('focus-visible'), 'missing :focus-visible ring (keyboard focus invisible)');
must(/\.pill|radius-pill/.test(html), 'missing status pill');
must(html.includes('<symbol'), 'missing svg symbol sprite for menu icons');
must(html.includes('nav-ico'), 'missing .nav-ico on leaf menus');
must(html.includes('nav-label'), 'missing .nav-label (needed for collapsed hover flyout)');
must(html.includes('--sidebar-accent'), 'missing --sidebar-accent (do not use --color-primary on dark sidebar)');
must(html.includes("mode === 'view'") && html.includes('function openDrawer'), 'view must open the same drawer as edit');

/* ---- 禁止项 ---- */
must(!html.includes('#00fffc'), 'dashboard cyan #00fffc leaked');
must(!html.includes('#2f6fed'), 'Element default blue #2f6fed leaked');
must(!html.includes('transform: scale'), 'must not use dashboard scale canvas');
must(!/id=["']screen["']/.test(html), 'must not use #screen dashboard canvas id');
must(!/backdrop-filter/.test(html), 'glassmorphism backdrop-filter not allowed in admin shell');

/* ---- 色值必须走 token：剥掉 token 声明块后不得残留裸色 ---- */
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
must(styles.length > 0, 'no <style> block found');
const outsideTokens = styles
  .replace(/html\[data-theme=[^\]]*\]\s*\{[^}]*\}/g, '')
  .replace(/:root\s*\{[^}]*\}/g, '');
const bareColors = [
  ...outsideTokens.matchAll(/#[0-9a-fA-F]{3,8}\b/g),
  ...outsideTokens.matchAll(/\brgba?\([^)]*\)/g),
].map((m) => m[0]);
must(bareColors.length === 0, 'bare colors outside token blocks: ' + bareColors.slice(0, 6).join(', '));

/* ---- 圆角必须走 token（50% 头像除外） ---- */
const bareRadius = [...outsideTokens.matchAll(/border-radius:\s*([^;}]+)/g)]
  .map((m) => m[1].trim())
  .filter((v) => !v.includes('var(') && v !== '50%');
must(bareRadius.length === 0, 'border-radius must use token: ' + bareRadius.slice(0, 6).join(', '));

/* ---- 表头不得刷回灰底 ---- */
must(!/\bth\s*\{[^}]*background:\s*var\(--bg-muted\)/.test(outsideTokens),
  'table header must not use --bg-muted fill (use --border-strong underline)');

/* ---- 仅模板：站点地图示例 ---- */
if (isTemplate) {
  must(html.includes('screen.html'), 'example sitemap link to screen.html missing');
}

if (fails.length) {
  console.error('FAIL (' + path.basename(htmlPath) + '):\n' + fails.map((f) => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log('OK ' + path.basename(htmlPath));
