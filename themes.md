# 后台主题 Token

生成时所有色值、圆角、阴影、字号、间距必须取自本表，禁止散写 px 与自造色。
禁止大屏科技青 `#00fffc`，禁止 Element 默认蓝 `#2f6fed`。

视觉口径：**精工中后台**（飞书 / Linear 那种克制）。层次靠字重、字色、留白，不靠色块和描边。
不是营销落地页，不是大屏玻璃卡。

CSS：`html[data-theme="light"|"dark"]` 下定义同名变量。默认 `light`。

## 浅色（默认）

| Token | 色值 | 用途 |
|---|---|---|
| `--bg-page` | `#f0f2f5` | 内容区底 |
| `--bg-sidebar` | `#171b26` | 侧栏底（带靛味的深墨，不是纯黑） |
| `--bg-topbar` | `#ffffff` | 顶栏底 |
| `--bg-card` | `#ffffff` | 卡片/表/抽屉 |
| `--bg-input` | `#ffffff` | 输入框 |
| `--bg-muted` | `#f7f8fa` | 次按钮底 / 描述列表键列 |
| `--bg-hover` | `#f6f7f9` | 行悬停 / 次按钮悬停 |
| `--bg-overlay` | `rgba(15,20,25,.45)` | 遮罩 |
| `--color-primary` | `#3b5bdb` | 主按钮 / 文字链 / 强调 |
| `--color-primary-hover` | `#324db8` | 主按钮悬停 |
| `--color-primary-active` | `#2b429c` | 主按钮按下 |
| `--color-primary-soft` | `#eef1fc` | 主色浅底（选中项、头像底） |
| `--ring` | `rgba(59,91,219,.18)` | 焦点环 |
| `--border` | `#e8eaef` | 细分割（行线，不要满格） |
| `--border-strong` | `#d8dce4` | 表头下边线、区块收口 |
| `--text-1` | `#1a1d24` | 主文案（浅色内容区） |
| `--text-2` | `#5c6570` | 次文案 |
| `--text-3` | `#8b939e` | 辅助 / 分组标题 |
| `--text-on-sidebar` | `rgba(226,232,246,.70)` | 侧栏文字 |
| `--text-on-sidebar-strong` | `#eef1fb` | 侧栏悬停 / 当前项文字 |
| `--text-on-primary` | `#ffffff` | 主按钮文字 |
| `--bg-sidebar-hover` | `rgba(255,255,255,.06)` | 侧栏菜单悬停底 |
| `--bg-sidebar-active` | `rgba(125,148,248,.16)` | 侧栏当前项底 |
| `--sidebar-accent` | `#7d94f8` | 侧栏当前项左强调条 / 方标底 |
| `--danger` | `#d92d20` | 删除/错误 |
| `--success` | `#079455` | 成功 |
| `--warning` | `#dc6803` | 警告 |
| `--success-soft` | `#edfaf3` | 成功胶囊底 |
| `--warning-soft` | `#fff6ed` | 警告胶囊底 |
| `--muted-soft` | `#f2f4f7` | 中性胶囊底 |
| `--shadow-1` | `0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)` | 卡片（轻） |
| `--shadow-2` | `0 12px 32px rgba(16,24,40,.12)` | 抽屉 / toast（浮层） |

浅色侧栏上的文字用 `--text-on-sidebar`，不要用 `--text-1`（否则深字叠深底）。

## 深色

侧栏必须比页面底**浅一档**，否则壳的层次会糊掉。

| Token | 色值 | 用途 |
|---|---|---|
| `--bg-page` | `#0d1117` | 内容区底（最深） |
| `--bg-sidebar` | `#141926` | 侧栏底 |
| `--bg-topbar` | `#171d26` | 顶栏底 |
| `--bg-card` | `#171d26` | 卡片/表/抽屉 |
| `--bg-input` | `#11161d` | 输入框 |
| `--bg-muted` | `#1e242e` | 次按钮底 / 描述列表键列 |
| `--bg-hover` | `#1c222b` | 行悬停 |
| `--bg-overlay` | `rgba(0,0,0,.55)` | 遮罩 |
| `--color-primary` | `#5c7cfa` | 主按钮 / 文字链 |
| `--color-primary-hover` | `#7189fb` | 主按钮悬停 |
| `--color-primary-active` | `#4c6ef5` | 主按钮按下 |
| `--color-primary-soft` | `rgba(92,124,250,.14)` | 主色浅底 |
| `--ring` | `rgba(92,124,250,.28)` | 焦点环 |
| `--border` | `#262d38` | 细分割 |
| `--border-strong` | `#333c4a` | 表头下边线 |
| `--text-1` | `#e8edf4` | 主文案 |
| `--text-2` | `#9aa8b5` | 次文案 |
| `--text-3` | `#6b7785` | 辅助 / 分组标题 |
| `--text-on-sidebar` | `rgba(232,237,244,.72)` | 侧栏文字 |
| `--text-on-sidebar-strong` | `#eef1fb` | 侧栏悬停 / 当前项文字 |
| `--text-on-primary` | `#ffffff` | 主按钮文字 |
| `--bg-sidebar-hover` | `rgba(255,255,255,.06)` | 侧栏菜单悬停底 |
| `--bg-sidebar-active` | `rgba(125,148,248,.16)` | 侧栏当前项底 |
| `--sidebar-accent` | `#7d94f8` | 侧栏当前项左强调条 / 方标底 |
| `--danger` | `#f97066` | 删除/错误 |
| `--success` | `#3ccb7f` | 成功 |
| `--warning` | `#f7b267` | 警告 |
| `--success-soft` | `rgba(60,203,127,.16)` | 成功胶囊底 |
| `--warning-soft` | `rgba(247,178,103,.16)` | 警告胶囊底 |
| `--muted-soft` | `rgba(107,119,133,.22)` | 中性胶囊底 |
| `--shadow-1` | `0 1px 2px rgba(0,0,0,.28)` | 卡片（轻） |
| `--shadow-2` | `0 12px 32px rgba(0,0,0,.36)` | 抽屉 / toast |

深色下 `.drawer`、下拉、toast 必须用 `--bg-card` + `--text-1`，禁止残留浅色白底。

## 形状 / 动效（两套主题共用，写在 `:root`）

| Token | 值 | 用途 |
|---|---|---|
| `--radius` | `8px` | 卡片 / 按钮 / 输入 |
| `--radius-sm` | `6px` | 侧栏菜单项、分段开关内格 |
| `--radius-pill` | `999px` | 状态胶囊 |
| `--dur` | `.15s` | 悬停 / 焦点过渡 |
| `--dur-panel` | `.28s` | 抽屉滑入 |
| `--ease` | `cubic-bezier(.32,.72,0,1)` | 全部过渡 |

## 字号（禁止散写字号）

| Token | 值 | 用途 |
|---|---|---|
| `--fs-num` | `24px` | 工作台数字 |
| `--fs-brand` | `20px` | 登录页品牌名 |
| `--fs-title` | `16px` | 页标题 / 抽屉标题 / 侧栏产品名 |
| `--fs-body` | `13px` | 正文、表格、控件 |
| `--fs-label` | `12px` | 卡片标签、分页、胶囊 |
| `--fs-micro` | `11px` | 侧栏分组标题、表头 |

字重只用 `400` / `500` / `600`。表头与分组标题用 `--fs-micro` + `letter-spacing:.06em`。

## 间距 / 尺寸（禁止散写 padding）

| Token | 值 | 用途 |
|---|---|---|
| `--sp-1` | `4px` | 图标与文字间隙 |
| `--sp-2` | `8px` | 控件间隙 |
| `--sp-3` | `12px` | 卡片内间距、栅格间隙 |
| `--sp-4` | `16px` | 卡片内边距、区块间距 |
| `--sp-5` | `20px` | 内容区上下内边距 |
| `--sp-6` | `24px` | 内容区左右内边距、抽屉内边距 |
| `--ico` | `18px` | 菜单 / 按钮图标 |
| `--ctl-h` | `32px` | 输入 / 按钮 / 下拉高度（统一） |
| `--row-h` | `44px` | 表格行高 |
| `--sidebar-w` | `232px` | 侧栏展开 |
| `--sidebar-w-collapsed` | `64px` | 侧栏收起 |
| `--topbar-h` | `56px` | 顶栏 |
| `--drawer-w` | `480px` | 抽屉 |
| `--tree-w` | `240px` | 树+表 的左树 |

## 脸（生成时必须遵守）

- **卡片**：`--shadow-1` + `--radius`，**不要再套一圈边框**。悬停可微抬升（`--shadow-2` 或 `translateY(-1px)`），不要放大。
- **表格**：表头**无底色**，只用 `--border-strong` 下边线 + `--fs-micro` 字距；行之间 `--border` 细线，最后一行无线；行高 `--row-h`；禁止每个单元格四边框。
- **列宽按语义分级**，禁止所有列一律 `max-width`：`table-layout: fixed`，除主体列（名称/标题）留 `width:auto` 吸收剩余宽度外，其余列定宽——短码/性别窄列、备注宽列。数值与编号列 `font-variant-numeric: tabular-nums`。列宽平均摊开 = 脸不合格。
- **当前菜单**：左侧 `3px` `--sidebar-accent` 条 + `--bg-sidebar-active`，文字 `--text-on-sidebar-strong`，禁止整条实心主色填充。深底上用 `--sidebar-accent`（亮一档的同色系），**不要**直接搬内容区的 `--color-primary`，那个色在深墨底上会发暗发脏。
- **菜单图标**：每个叶子菜单必配一个 `--ico` 尺寸的线性图标，页面内用内联 `<symbol>` 雪碧图 + `<use>` 复用，`stroke: currentColor` 跟随主题。禁止 emoji、禁止图标字体外链、禁止只有一半菜单有图标。
- **侧栏收起态**：只留图标居中，标签换成悬停气泡（`--bg-card` + `--shadow-2`，`left:100%` 外挂）。收起时分组标题隐藏、改用一条细分割线，且分组一律展开——没有标题就没法再点开。气泡要能溢出侧栏，所以侧栏不能设 `overflow:hidden`，省略号交给菜单项内部的 `.label`。
- **状态**：浅底胶囊（`--success-soft` 等）+ `--radius-pill`，禁止只改字色。
- **按钮**：主按钮实心（含 hover / active 两态）；次按钮 `--bg-muted` 无描边；行内操作用文字链，删除用危险色文字链。
- **交互态必须齐**：hover、`:focus-visible`（`box-shadow: 0 0 0 3px var(--ring)`）、active，过渡 `--dur var(--ease)`。缺交互态 = 脸不合格。
- **工作台数字卡**：靠 `--fs-num` 数值 + `--fs-label` 标签建立层次，**不要每张都挂主色竖条**（重复且廉价）。
- **头像**：`--color-primary-soft` 底 + `--color-primary` 字，禁止白底白圈。
- **空态**：小标题 + 说明 + 主操作三段，禁止只有一行灰字。
- **分页**：`共 N 条` + 页码，弱化上一页/下一页按钮的视觉重量。
- 禁止 `backdrop-filter` 玻璃、禁止营销大留白、禁止 `#00fffc`、禁止 `#2f6fed`。
