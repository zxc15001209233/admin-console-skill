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

function matchBrace(s, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < s.length; i += 1) {
    if (s[i] === '{') depth += 1;
    else if (s[i] === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** 剥掉 html[data-theme] / :root 声明块（括号配对，避免嵌套 {} 误报裸色） */
function stripTokenBlocks(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const brace = css.indexOf('{', i);
    if (brace === -1) {
      out += css.slice(i);
      break;
    }
    const selector = css.slice(i, brace);
    const end = matchBrace(css, brace);
    if (end === -1) {
      out += css.slice(i);
      break;
    }
    const sel = selector.replace(/\/\*[\s\S]*?\*\//g, '');
    if (/html\[data-theme/.test(sel) || /(^|[\s,}])\:root\b/.test(sel)) {
      i = end + 1;
      continue;
    }
    out += css.slice(i, end + 1);
    i = end + 1;
  }
  return out;
}

const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
const hasLogin = /id=["']btnLogout["']/.test(html);
const hasBizCrud = /data-view=/.test(html) || /data-edit=/.test(html);
const hasDestructive = /data-del=/.test(html) || /data-unlock=/.test(html);
const hasFilterBar = html.includes('filter-bar');

/* ---- 壳与路由 ---- */
must(html.includes('data-theme'), 'missing data-theme');
must(/admin-theme:/.test(html), 'missing localStorage key prefix admin-theme:');
must(/hashchange|location\.hash/.test(html), 'missing hash router');
must(html.includes('USE_MOCK'), 'missing USE_MOCK');
must(/\[data-theme=["']dark["']\]/.test(html), 'missing dark theme block');
must(html.includes('sidebar') || html.includes('aside'), 'missing sidebar');

if (hasBizCrud) {
  must(/id=["']drawer["']/.test(html), 'CRUD pages need business #drawer');
  must(html.includes("mode === 'view'") && html.includes('function openDrawer'), 'view must open the same drawer as edit');
} else {
  must(!html.includes('function openDrawer') || /id=["']drawer["']/.test(html), 'openDrawer without #drawer');
}

if (hasLogin) {
  must(/id=["']btnProfile["']/.test(html), 'login shell missing #btnProfile');
  must(/id=["']btnLogout["']/.test(html), 'login shell missing #btnLogout');
  must(/id=["']profileDrawer["']/.test(html), 'personal center must use #profileDrawer, not reuse #drawer');
  must(/function openProfile/.test(html) && /profileDrawer/.test(scripts), 'openProfile must target #profileDrawer');
  must(/pendingHash\s*=\s*['"]{2}/.test(scripts), 'logout must clear pendingHash (do not restore previous page)');
}

if (hasDestructive || isTemplate) {
  must(/id=["']modal["']/.test(html), 'destructive actions need #modal, not window.confirm');
  must(!/\bconfirm\s*\(/.test(scripts), 'native confirm() forbidden; use #modal');
}

if (hasFilterBar) {
  must(/URLSearchParams/.test(scripts), 'filter/page state must round-trip via hash query (URLSearchParams)');
}

if (hasLogin || /currentUser/.test(html)) {
  must(/currentUser[\s\S]{0,500}username/.test(html), 'currentUser.username required');
  must(/currentUser[\s\S]{0,500}roleLabel/.test(html), 'currentUser.roleLabel is the profile display source (not #roleSel)');
}

/* ---- token 齐备 ---- */
[
  '--bg-sidebar', '--bg-muted', '--bg-hover', '--text-1', '--text-3',
  '--color-primary-hover', '--color-primary-soft', '--ring',
  '--border-strong', '--shadow-1', '--shadow-2',
  '--radius', '--radius-pill', '--dur', '--ease',
  '--fs-title', '--fs-body', '--fs-label', '--fs-micro',
  '--sp-2', '--sp-4', '--ctl-h', '--row-h',
  '--sidebar-accent', '--bg-sidebar-active', '--text-on-sidebar-strong', '--ico',
  '--ctl-sm', '--accent-bar', '--ring-w', '--seg-gap', '--modal-w',
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

/* ---- 禁止项 ---- */
must(!html.includes('#00fffc'), 'dashboard cyan #00fffc leaked');
must(!html.includes('#2f6fed'), 'Element default blue #2f6fed leaked');
must(!html.includes('transform: scale'), 'must not use dashboard scale canvas');
must(!/id=["']screen["']/.test(html), 'must not use #screen dashboard canvas id');
must(!/backdrop-filter/.test(html), 'glassmorphism backdrop-filter not allowed in admin shell');

/* ---- 色值必须走 token：剥掉 token 声明块后不得残留裸色 ---- */
must(styles.length > 0, 'no <style> block found');
const outsideTokens = stripTokenBlocks(styles);

/* 回归：token 块内嵌套 {} 不得把裸色漏到组件样式 */
{
  const nested = 'html[data-theme="light"] { --x:#abcabc; .x { color:#000000; } } .a { color: var(--x); }';
  const stripped = stripTokenBlocks(nested);
  must(!/#abcabc|#000000/.test(stripped), 'token strip must use brace matching (nested {})');
}
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

/* ---- 壳几何 28px / 3px 必须走 token（列宽等按语义定宽除外） ---- */
const chromePx = [...outsideTokens.matchAll(/\b(28px|3px)\b/g)].map((m) => m[0]);
must(chromePx.length === 0, 'use --ctl-sm / --accent-bar / --ring-w instead of raw 28px/3px: ' + chromePx.slice(0, 6).join(', '));

/* ---- 表头不得刷回灰底 ---- */
must(!/\bth\s*\{[^}]*background:\s*var\(--bg-muted\)/.test(outsideTokens),
  'table header must not use --bg-muted fill (use --border-strong underline)');

/* ---- 仅模板：站点地图 + 积木示范 ---- */
if (isTemplate) {
  must(html.includes('screen.html'), 'example sitemap link to screen.html missing');
  must(html.includes('batch-bar'), 'template must demo .batch-bar');
  must(html.includes('date-range'), 'template must demo .date-range');
  must(/id=["']modal["']/.test(html), 'template must demo #modal');
  must(/id=["']profileDrawer["']/.test(html), 'template must demo #profileDrawer');
}

if (fails.length) {
  console.error('FAIL (' + path.basename(htmlPath) + '):\n' + fails.map((f) => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log('OK ' + path.basename(htmlPath));
