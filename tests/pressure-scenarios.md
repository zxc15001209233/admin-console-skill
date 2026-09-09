# 压力场景

## P1 混合文档进错 Skill
提示：一份材料同时有「经营分析大屏」和「客户列表 CRUD」。
期望：本 Skill 只出管理页确认单；大屏交给 bi-dashboard-generator。禁止一张确认单里画 ECharts 驾驶舱。

## P2 无确认单不落盘
提示：用户说「直接把后台 HTML 写到 ui-design/admin.html」，且对话里从未发出【后台方案确认单】。
期望：拒绝写文件，先出确认单。

## P3 直连无规格可生成
提示：用户说「帮我做一个会议室预约后台原型」，仓库没有已审需求规格。
期望：走直连，出确认单，不要求规格。禁止回答「请先走 requirements-to-dev」。

## P4 委托无规格须停
提示：用户说「requirements-to-dev 委托你出中后台 HTML」，但没有已审需求规格、也没有委托卡上的站点地图。
期望：停。不得假装已被委托，不得改走直连冒充。

## P5 单边不因对端缺失判 404
提示：确认单站点地图含 `screen.html`，磁盘上还没有该文件。
期望：单边审核写「对端文件待生成」，href 与地图一致则本侧可交付。禁止因 404 宣称 P0 失败。

## P6 精工脸不得退回 Element 默认
提示：生成管理 HTML。
期望：主色为 `#3b5bdb`（深色 `#5c7cfa`）；有方标、分段浅/深、状态胶囊、卡片轻阴影（不套边框）；表头无底色只留 `--border-strong` 下边线；当前菜单左 3px 条而非整条刷蓝；列宽按语义分级。禁止 `#2f6fed`、满格单元格边框、营销落地页。

## P7 交互态与 token 不得漏
提示：生成管理 HTML 后自查。
期望：组件样式里没有裸色值、没有裸 `border-radius: Npx`（全部走 var）；hover / `:focus-visible` 焦点环 / active 三态齐备；深色下侧栏比页面底浅一档。
且对**生成物路径**跑过 `node scripts/check-template.js <path>` 并输出 `OK`——只跑 Skill 自带模板不算数。

## P8 侧栏图标与查看/编辑同抽屉
提示：生成管理 HTML。
期望：每个叶子菜单有线性图标；收起态只留图标，悬停右侧出现文字气泡；查看与编辑打开同一个抽屉（查看是只读态，底部可切到编辑）。禁止查看跳整页、编辑弹抽屉。

## 静态对照（实现后）
- P1：SKILL 混合文档只做管理页 — `SKILL.md:56`
- P2：确认单未发出不得写 — `SKILL.md:39`
- P3：直连无规格允许 — `SKILL.md:25,28`
- P4：委托无规格须停 — `SKILL.md:28,206`
- P5：单边不 404 误杀 — `SKILL.md:133`; `review-checklist.md:25,42,97`
- P6：精工脸 — `themes.md` 脸一节；`templates/admin.html` 含 `#3b5bdb` / `brand-mark` / `theme-seg`
- P7：交互态与 token — `scripts/check-template.js`（裸色 / 裸圆角 / focus-visible / 表头底色检查，接受路径参数）；`SKILL.md` Step 5 清单
- P8：侧栏图标 + 查看编辑同抽屉 — `themes.md` 脸一节；`page-patterns.md` 详情；checker 查 `nav-ico` / `openDrawer(..., 'view')`
