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
期望：主色为 `#3b5bdb`（深色 `#5c7cfa`）；有方标、分段浅/深、状态胶囊、卡片轻阴影（不套边框）；表头无底色只留 `--border-strong` 下边线；当前菜单左 `--accent-bar` 条而非整条刷蓝；列宽按语义分级。禁止 `#2f6fed`、满格单元格边框、营销落地页。

## P7 交互态与 token 不得漏
提示：生成管理 HTML 后自查。
期望：组件样式里没有裸色值、没有裸 `border-radius: Npx`（全部走 var）；hover / `:focus-visible` 焦点环 / active 三态齐备；深色下侧栏比页面底浅一档。
且对**生成物路径**跑过 `node scripts/check-template.js <path>` 并输出 `OK`——只跑 Skill 自带模板不算数。

## P8 侧栏图标与查看/编辑同抽屉
提示：生成带列表的管理 HTML。
期望：每个叶子菜单有线性图标；收起态只留图标，悬停右侧出现文字气泡；查看与编辑打开同一个业务抽屉（查看是只读态，底部可切到编辑）。禁止查看跳整页、编辑弹抽屉。登录-only、没有列表的页**不要**为过检去造空的 `openDrawer`。

## P9 确认弹窗不是系统框
提示：生成带删除或解锁的管理 HTML。
期望：破坏性操作用 `#modal`。禁止 `window.confirm` / `alert`。

## P10 个人中心与业务抽屉隔离
提示：生成带登录和列表的管理 HTML。先打开一条「查看」，再点头像「个人中心」。
期望：业务抽屉内容不被覆盖；关掉个人中心后查看态仍在。个人中心角色读 `currentUser.roleLabel`，改演示角色下拉后个人中心文案不变。

## P11 退出不回跳，深链要回跳
提示：未登录打开 `#/rooms?q=一号`，登录后应回到该 hash。登录后再退出。
期望：退出到 `#/login`，再登录进入默认首页，**不是**刚才退出的列表。`pendingHash` 在退出时被清空。

## P12 筛选进 hash；浅色侧栏与范围条
提示：生成带筛选的列表（若有树+表且节点有摘要则带范围条）。
期望：查询/分页后刷新，筛选项仍在。浅色侧栏白底。范围条仅节点有摘要时出现，标签与值同一行、靠左。

## P13 登录页也能切深色
提示：生成带登录的管理 HTML。打开 `#/login`（及忘记密码若有）。
期望：右上角有太阳/月亮分段开关（读屏名浅色/深色），写入同一个 `admin-theme:<产品名>`。禁止只有壳顶栏能切、登录页只能看浅色。右栏默认淡圆 `.login-scene`，卡片仍可读。登录标题「欢迎回来」。左栏垂直居中。

## P14 未知路由是 404
提示：已登录后打开一个不存在的 hash。
期望：空态「页面不存在」+ 返回首页。禁止偷偷 `navigate` 到工作台。

## P15 转 Vue 必须拷贝 element-theme，禁止跟大屏共用 element-dark
提示：已审 `admin.html`，规格选 A。仓库已有大屏 Vue，`src/styles/element-dark.css` 全局 `!important` 白字青边。用户 `go` 实现中后台，并说「尽量贴 HTML」。
期望：
- 基座第一件事拷贝 `templates/element-theme.less`（或等价 CSS）并在管理根启用；禁止从零手写一套输入皮肤
- 管理根节点 class 含 `admin-root`，`data-theme` 写在该节点；与大屏同 document 时**禁止**写 `html[data-theme]`，**禁止**改大屏 `element-dark`
- EP 焦点环打在 `.el-input__wrapper` / `.el-select__wrapper`，禁止 `.admin-root :focus-visible` 打到 `.el-input__inner`（框里套框）
- 登录/忘记密码 `label-position="top"`，登录输入高度 `--login-ctl`；空状态下拉 `placeholder` 为「全部状态」一类选项文案
- SVG 图标有 `viewBox="0 0 24 24"`，尺寸走 `--ico`
禁止借口：「不承诺 1:1 所以用 EP 默认」「element-theme 只映射 token，控件态现写」「大屏已经有 element-dark，管理页共用即可」。

## P16 多页签：顶栏下可关、可配缓存，两条线都在
提示：生成带至少两个叶子菜单的管理 HTML。登录后点侧栏打开第二页，再点回第一页。
期望：
- 页签在**顶栏正下方**，不在侧栏里；首页（工作台或第一个业务页）没有 ×；其它页有 ×，关掉当前页切到相邻页签
- 登录 / 忘记密码看不到页签；退出登录后再进，先前打开的页签清空
- 列表默认 `cache: true`：筛选项输入后不点查询、切到另一页再回来，输入还在。表单页 `cache: false`
- 顶栏与页签之间、页签与内容之间**各一条**分割线，禁止删中间那条
- 选中页签不铺 `--bg-page`、不做圆角卡片，只用底部 `--accent-bar` 主色细条
- 内容区没有与页签重复的 `.page-head h1`；「新建」在筛选条里
禁止：「页签做在侧栏」「选中铺灰底显得像文件夹」「中间那条线多余就删了」「内容区再写一遍大标题」。

## 静态对照（实现后）
- P1：SKILL 混合文档只做管理页 — `SKILL.md` 混合文档条
- P2：确认单未发出不得写 — `SKILL.md` 工作流程
- P3：直连无规格允许 — `SKILL.md` 启动路径
- P4：委托无规格须停 — `SKILL.md` 启动路径与交接
- P5：单边不 404 误杀 — `SKILL.md` Step 5.5；`review-checklist.md`
- P6：精工脸 — `themes.md` 脸一节；`templates/admin.html` 含 `#3b5bdb` / `brand-mark` / `theme-seg`
- P7：交互态与 token — `scripts/check-template.js`（括号配对剥 token、裸色 / 裸圆角 / 28px·3px / focus-visible）；`SKILL.md` Step 5 清单
- P8：侧栏图标 + 查看编辑同抽屉 — `page-patterns.md` 详情；checker 仅在有 `data-view`/`data-edit` 时查 `openDrawer`
- P9：`#modal` — `page-patterns.md` 确认弹窗；checker 禁 `confirm(`
- P10：`#profileDrawer` — `page-patterns.md` 登录用户区
- P11：退出清 `pendingHash` — `layout-patterns.md` Hash 路由
- P12：`URLSearchParams` + 浅色侧栏 + 范围条按需 — `layout-patterns.md`；`page-patterns.md` 树+表
- P13：登录 `.theme-seg` — `page-patterns.md` 登录壳；checker 查 `themeSegHtml`
- P14：`renderNotFound` — `page-patterns.md` 404
- P15：转 Vue 拷贝 `element-theme.less` + `admin-root` 隔离 — `vue-bridge.md`；`templates/element-theme.less` 控件态；`requirements-to-dev` 实现基座
- P16：多页签 — `layout-patterns.md` 壳；`page-patterns.md` 列表；`themes.md` 页名/页签；`vue-bridge.md` keep-alive；checker 查 `#tabs` / `TAB_META` / `resetTabs` / `.tab.active::after`
