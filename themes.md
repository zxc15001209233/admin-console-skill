# 后台主题 Token

生成时所有色值必须取自本表，禁止自造颜色，禁止使用大屏科技青 `#00fffc`。

CSS：`html[data-theme="light"|"dark"]` 下定义同名变量。默认 `light`。

## 浅色（默认）

| Token | 色值 | 用途 |
|---|---|---|
| `--bg-page` | `#f4f6f8` | 内容区底 |
| `--bg-sidebar` | `#1c2430` | 侧栏底 |
| `--bg-topbar` | `#ffffff` | 顶栏底 |
| `--bg-card` | `#ffffff` | 卡片/表/抽屉 |
| `--bg-input` | `#ffffff` | 输入框 |
| `--bg-overlay` | `rgba(15,20,25,.45)` | 遮罩 |
| `--color-primary` | `#2f6fed` | 主按钮/高亮 |
| `--border` | `#e5e9ef` | 边框 |
| `--text-1` | `#1a1d24` | 主文案（浅色内容区） |
| `--text-2` | `#5c6570` | 次文案 |
| `--text-3` | `#8b939e` | 辅助 |
| `--text-on-sidebar` | `rgba(255,255,255,.85)` | 侧栏文字 |
| `--text-on-primary` | `#ffffff` | 主按钮文字 |
| `--bg-sidebar-hover` | `rgba(255,255,255,.08)` | 侧栏菜单悬停底 |
| `--danger` | `#d92d20` | 删除/错误 |
| `--success` | `#079455` | 成功 |
| `--warning` | `#dc6803` | 警告 |

浅色侧栏上的文字用 `--text-on-sidebar`，不要用 `--text-1`（否则深字叠深底）。

## 深色

| Token | 色值 | 用途 |
|---|---|---|
| `--bg-page` | `#0f1419` | 内容区底 |
| `--bg-sidebar` | `#0b0e13` | 侧栏底 |
| `--bg-topbar` | `#161b22` | 顶栏底 |
| `--bg-card` | `#161b22` | 卡片/表/抽屉 |
| `--bg-input` | `#12171d` | 输入框 |
| `--bg-overlay` | `rgba(0,0,0,.55)` | 遮罩 |
| `--color-primary` | `#4c8dff` | 主按钮 |
| `--border` | `#2a3340` | 边框 |
| `--text-1` | `#e8edf4` | 主文案 |
| `--text-2` | `#9aa8b5` | 次文案 |
| `--text-3` | `#6b7785` | 辅助 |
| `--text-on-sidebar` | `rgba(232,237,244,.9)` | 侧栏文字 |
| `--text-on-primary` | `#ffffff` | 主按钮文字 |
| `--bg-sidebar-hover` | `rgba(255,255,255,.08)` | 侧栏菜单悬停底 |
| `--danger` | `#f97066` | 删除/错误 |
| `--success` | `#3ccb7f` | 成功 |
| `--warning` | `#f7b267` | 警告 |

深色下 `.drawer`、下拉、toast 必须用 `--bg-card` + `--text-1`，禁止残留浅色白底。
