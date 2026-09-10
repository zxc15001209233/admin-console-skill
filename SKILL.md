---
name: admin-console-generator
description: Use when the user asks to generate a backend admin, 中后台, CRUD, or 管理系统 HTML prototype; when they mention 后台管理, 列表页, 表单, 详情, or admin console; when a requirements document contains management modules; or when requirements-to-dev delegates mid-admin HTML after a reviewed 需求规格. If a document mixes dashboard and admin CRUD, only take the admin pages. Do not use for data visualization dashboards, 看板, or 大屏.
---

# 后台管理生成器

生成风格统一的中后台 HTML 原型。默认产出单文件 `admin.html`。本 Skill **不**在业务仓库创建 Vue/Vite 工程。

## 能力边界

| 层次 | 第一版 |
|---|---|
| 静态展示 | 按本 Skill 统一壳 + token + 页面模板生成。HTML 内用自建控件（侧栏、顶栏、表格、抽屉、弹窗）。禁止套 `design-taste-frontend`、营销落地页、大屏玻璃卡 |
| 页面交互 | HTML 内 mock 假交互 |
| 真实数据 | 字段名 + `USE_MOCK` 开关，不是接口契约 |
| 工程化 | **本 Skill 只出 HTML 原型**。转 Vue 由 `requirements-to-dev` 按选型 §2 写业务工程，控件换 Element Plus。布局/菜单/字段跟 HTML。**控件态必须整份拷贝** [templates/element-theme.less](templates/element-theme.less)，对照 [vue-bridge.md](vue-bridge.md)。禁止用「不承诺 1:1」改吃 EP 出厂默认或大屏 `element-dark` |

## 启动路径

必须先判启动路径，**禁止混用门禁**。

| 路径 | 怎么进来 | 规格门禁 | 可产出 |
|---|---|---|---|
| **直连** | 用户点名做后台原型 / 一句话 / 参考图 / 只丢管理需求 | 不要求已审规格 | 确认单 → HTML（及设计说明、审核） |
| **委托** | `requirements-to-dev` 规格人审并「下一步」后点名本 Skill | 必须已审需求规格 | 同上，且确认单必须引用委托卡上的站点地图 |

**禁止因没有规格拒绝直连。** **禁止无已审规格假装委托。**

用户接着说「转 Vue / 开始开发」：本 Skill 停，交回 `requirements-to-dev`。无已审核开发计划不得在任何 Skill 里建业务工程。

## 工作流程

```
Step 1 识别入口与启动路径 → Step 2 方案确认单 → Step 3 默认浅色、单文件 HTML、目录 ui-design/
→ Step 3.5 灰框（可跳过）→ Step 4 生成 → Step 5 自检 → Step 5.5 review/ → Step 6 交付 HTML
```

确认单未发出不得写生成物。项目已有总规则则跟项目的。

### Step 1：识别入口与启动路径

**先判直连还是委托**（见上表），再判需求入口（四选一，自动判断）：

**入口① 一句话需求**（小白用户）：
用户只说了业务（如「做一个会议室预约后台」）。由 AI 推断菜单、页面、字段包，用人话写确认单。禁止反问「要什么布局框架」类专业问题。确认单须写出「业务识别 + 默认菜单/页面包」，让用户先确认判断本身。此入口默认走**直连**，除非对话里已经是委托上下文。

**入口② 布局/菜单描述**：用户明确写了菜单与页面结构。直接映射到壳 + 模板积木，缺失处才追问。

**入口③ 参考图**：只提取信息架构——菜单结构、字段、分区、操作。色值与几何仍用统一壳和 token。第一版不承诺像素复刻。截图过糊或读不清字段时，列入缺失项，禁止假装已量准。

**入口④ 需求文档**（产品经理主路径）：解析文档提取「页面清单 → 每页积木 → 关键字段 → 交互 → 角色可见性」，输出解析确认单。文档未写明的项进「缺失项」并给建议，禁止静默猜测后直接生成。

- **图片优先于文字还原布局**：文档含嵌入截图时，必须提取原始图片作为布局真相源；文字用于字段口径与交互说明。图文冲突列入疑点清单，禁止静默选边。
- **疑点清单与缺失项并列，缺一不可**：疑点清单列文档内部矛盾/重复/可疑错字；缺失项列文档没写的内容。两类都必须在确认单中列出。
- **混合文档**：同一份材料里既有大屏/看板页、又有中后台或 CRUD 页时，本 Skill **只做管理页**。其余章节交回 `bi-dashboard-generator`。用户只说「按这份文档开始」、未点明只要后台时，先让 `requirements-to-dev` 判定范围，再走**委托**路径分别生成。

可见性：抽出「谁能看见哪颗按钮/哪项菜单」。第一版用顶栏**演示角色**切换显隐，不生成权限配置页。完整权限矩阵、审批流仍进缺失项。

### Step 2：输出方案确认单

生成前必须先给用户看方案。**即使用户先回 `go`，确认单未发出也不得开写。**

见下方「方案确认单格式」。委托路径：站点地图必须与委托卡逐字一致。

混合 + 直连（用户同时要大屏和管理，但没走规格）：先出**一份**联合确认单锁站点地图，再分别委托两个生成器；不得各出互不一致的地图。

### Step 3：确认主题默认值与输出形式

用对话选项确认，**每项都有推荐默认值，用户全选默认也能得到完整后台**：

1. 主题：浅色（推荐）/ 深色 —— token 见 [themes.md](themes.md)
2. 输出形式：单文件 HTML 原型（推荐，双击即看）
3. 生成目录：`ui-design/`（推荐，默认）
4. 表单形态：抽屉（推荐）/ 整页 / 弹窗（文档已写明的不重复问）

用户在需求中已表明的不重复问。

### Step 3.5：灰框骨架（复杂/多页项目建议先做，可跳过）

对于多页项目、或用户对菜单/布局理解没有十足把握时，先产出一版**无配色、无 mock 数据、无真实表单控件**的纯灰框占位页：每个区块只画边框 + 用途标签（如「筛选条」「表格」「抽屉」），让用户先确认区域划分和壳网格，而非等最终版才发现理解偏了。细则见 [layout-patterns.md](layout-patterns.md) 的「Step 3.5 灰框骨架」。

- 灰框骨架的侧栏宽、顶栏高、内容区内边距必须与正式壳完全一致
- 用户确认后再进入 Step 4，按同一套网格套用主题与内容，不重新排布
- 简单单页、或用户已给出精确菜单描述时可跳过，直接进入 Step 4

### Step 4：生成

- 基于 [templates/admin.html](templates/admin.html) 骨架生成**零依赖单文件** HTML
- 壳几何与 hash 路由见 [layout-patterns.md](layout-patterns.md)
- 页面积木见 [page-patterns.md](page-patterns.md)
- mock 按 [mock-data-rules.md](mock-data-rules.md)（量级真实、专名照搬、列表与详情自洽）
- 色值只取自 [themes.md](themes.md) 的 token 表（精工脸，禁止 `#2f6fed`）
- 管理页之间用 hash 路由（`#/rooms`、`#/rooms/new`），刷新停留当前页
- 列表的筛选 / 分页 / 树选中写入 hash query（`#/rooms?q=一号&page=2`），刷新不丢
- 登录页（需求有登录时）：无侧栏；**右上角太阳/月亮开关**；右栏默认淡圆插画，用户有图则写入 `--login-photo` 并关掉 `--login-scene`；未登录深链须回登录页，登录成功后回跳原 hash（含 query）。退出登录清 `pendingHash`，**不**回跳退出前的页
- 未知 hash：已登录渲染「页面不存在」，禁止静默跳首页
- 有登录时：顶栏头像菜单；个人中心用独立 `#profileDrawer`，禁止复用业务 `#drawer`
- 删除 / 解锁等破坏性操作：用 `#modal` 确认，禁止 `window.confirm`
- 混合项目：侧栏大屏项用相对链接整页打开委托卡上的大屏文件（默认 `screen.html`），禁止 iframe 进内容区
- 有管理壳时，每个大屏 HTML 顶栏加「返回管理」→ `admin.html`（由大屏生成器负责，本 Skill 在确认单锁文件名）
- 交互用原生 JS + mock 假交互
- 交付 HTML **零本地依赖**；审核脚本只放生成物旁 `review/`，不进 HTML

**同时交付「设计说明」**（Markdown）：菜单 ↔ 页面 ↔ 积木映射、字段表、mock 口径、交互清单、站点地图（含大屏文件名）、角色显隐表（若有）。须写明：转 Vue 后控件换 Element Plus，实现须整份拷贝 `element-theme.less`（见 `vue-bridge.md`），不要写「皮肤不 1:1 故可用 EP 默认」。审核结论**禁止**写入设计说明正文。

### Step 5：生成后强制自检

逐项核对，不通过就修，修完再进入 5.5：

- [ ] 壳完整：侧栏、顶栏、顶栏下页签条、内容区、当前页高亮；登录/忘记密码无页签
- [ ] 所有色值、圆角、阴影、字号、间距来自 [themes.md](themes.md) token（无裸写 `#fff`、`red`、`#2f6fed`；壳几何无散写 `28px` / `3px`）
- [ ] 精工脸：卡片轻阴影无边框、表头无底色只留下边线、状态胶囊、太阳月亮分段开关、侧栏方标 + 左强调条、列宽按语义分级；页名在页签上（不要内容区再套 `.page-head h1`）；页签与顶栏同底、两条分割线都在、选中只用 `--accent-bar` 底边（不铺 `--bg-page`）
- [ ] 侧栏：每个叶子菜单有图标；收起态只留图标 + 悬停气泡；当前项用 `--sidebar-accent` 左条 + `--bg-sidebar-active`（浅色可与主色同值；深色必须用亮一档强调色，禁止整条实心主色）
- [ ] 查看与编辑同形态（默认都是抽屉），没有「查看跳整页、编辑弹抽屉」
- [ ] 交互态齐：hover / `:focus-visible` 焦点环 / active，过渡走 `--dur` + `--ease`
- [ ] 跑过校验：`node <skill>/scripts/check-template.js <生成物路径>` 输出 `OK`
- [ ] 浅色与深色各过一遍；表头、输入、抽屉、弹窗、下拉随主题变；深色浮层看不清 = P0
- [ ] 破坏性操作用 `#modal`，没有 `window.confirm`
- [ ] 无异常横向滚动条、无组件溢出
- [ ] 长文本有 `text-overflow: ellipsis` 处理
- [ ] 空态与校验：筛空有空态；校验失败保留已填
- [ ] hash 刷新不丢页；列表筛选/分页在 query 里；有登录时深链回登录再回跳（含 query）
- [ ] 有登录时：顶栏头像下拉「个人中心 / 退出登录」；个人中心为独立 `#profileDrawer`；退出回 `#/login` 且不回跳
- [ ] 个人中心字段读 `MOCK.currentUser`（含 `roleLabel`），不读演示角色下拉
- [ ] 演示角色显隐（若有）切换立刻生效
- [ ] 筛选/搜索/分页、新建/编辑/删除后列表与详情数据自洽；只 toast 不变数据 = P0
- [ ] 主题切换写入 `localStorage` 键 `admin-theme:<产品名>`，刷新保持；**登录页/忘记密码页右上角也有 `.theme-seg`（太阳/月亮）**
- [ ] 未知 hash 为「页面不存在」，不是默默跳到首页
- [ ] 站点地图中的 href 字符串正确；混合项目单边自检**不要求**对端文件已存在
- [ ] 无未捕获 JS 报错

Step 5 **不能代替 Step 5.5**。禁止把自检勾选复述成「已完成」。

### Step 5.5：独立审核（生成后立刻做）

对照确认单、站点地图、硬性规则和 [review-checklist.md](review-checklist.md) **找不一致**，不是再打一遍 Step 5 的勾。

**产出（审核结论外置，禁止写入设计说明正文）**
- 目录：生成物**同级** `review/`
- 文件名：`{主文件名}-审核-YYYYMMDD.md`
- 正文：对照范围、P0/P1/P2、证据、结论

**门禁**
- **页面/字段缺失、JS 报错、深色浮层看不清、列表与详情对不上、href 与站点地图不一致、直连/委托门禁用错**：P0，当场修
- **混合单边审核**：只核 href / 返回管理 与站点地图字符串一致；**不得**因对方文件尚未存在判 404 P0；审核里写「对端文件待生成」，不算本侧 P0
- **联合验收**（两边文件都齐，或用户宣布混合原型收口）：实际打开相对链接不 404；管理能进大屏、大屏能回管理；共享实体同名同数。此时 404、对端缺失、实体被改写 = P0。未做联合验收，不得声称「混合项目已完成」
- 有任意 **P0** 修不掉：禁止说「已完成 / 可以交付」
- 用户叫停打磨：停止改观感，进入 Step 6

### Step 6：交付 HTML

- **仅当** Step 5.5 无未清 P0，且该修的 P1 已复审才进入本步
- 告知打开方式：双击 `admin.html`（或 `ui-design/admin.html`）
- 用户口头改菜单/字段：改后重新走 Step 5 + 5.5
- 用户要转 Vue / 开始开发：交回 `requirements-to-dev`，本 Skill 不建工程
- 用户还要数据模型、接口契约或开发计划：交回 `requirements-to-dev`，本 Skill 停在 HTML 原型与对接占位

## 方案确认单格式

```
【后台方案确认单】
启动路径：直连 | 委托
业务识别：
标题/产品名：
生成目录：ui-design/（默认）
站点地图：
积木：
关键字段：
交互：
页签：首页不可关；各叶子 cache（列表默认 true / 表单默认 false）
主题：浅色（默认）
登录右栏图：默认淡圆插画 | 用户提供（写入 --login-photo，--login-scene:0，加深 --login-scrim）
演示角色：无 | 有（列出）
缺失项：
疑点清单：
共享实体：（混合才填）
```

委托路径：站点地图必须与委托卡逐字一致。

站点地图示例（混合项目）：

```
ui-design/
├── admin.html          ← 本 Skill
├── screen.html         ← bi-dashboard-generator（单屏默认名）
└── index.html          ← 可选总入口
```

生成物默认目录：确认单未写时用 **`ui-design/`**。大屏与管理必须同一目录。

## 硬性规则

1. 色值只取自 themes.md（含 `--radius` / `--shadow`）；禁止 Element 默认蓝 `#2f6fed`
2. 禁止营销落地页、大屏玻璃卡、design-taste-frontend、#00fffc、#screen 画布、transform:scale；禁止满格 1px 表格线、禁止当前菜单整条实心主色填充
3. 管理页 hash；大屏整页相对链接；禁止 iframe
4. localStorage 键 admin-theme:<产品名>
5. 只出 HTML、确认单、对接占位（字段名 + USE_MOCK）
6. 用户说转 Vue / 开始开发：交回 requirements-to-dev
7. 混合单边审核不因对端文件不存在判 404
8. 审批流页/权限矩阵页进缺失项，不发明
9. 删除/解锁/批量删除用 `#modal`，禁止 `window.confirm`；个人中心用独立 `#profileDrawer`，禁止复用业务 `#drawer`
10. 列表筛选/分页/树选中写入 hash query；退出登录必须清 `pendingHash`，禁止回跳退出前的页
11. 壳含顶栏下方页签：点侧栏打开/激活；首页不可关；登录无页签；退出 `resetTabs`；顶栏↔页签与页签↔内容各一条分割线；选中不铺灰底；内容区不重复页名 h1

补充细则：

- 禁止把大屏 token 或玻璃卡模板拷进后台壳
- 不把大屏嵌进管理内容区
- 参考图只辅助信息架构，不承诺像素复刻现有后台皮肤
- 转 Vue：对方必须拷贝 `element-theme.less`，见 [vue-bridge.md](vue-bridge.md)；本 Skill 仍不写工程
- 完整权限矩阵页、审批流页不发明；角色按钮显隐用「演示角色」，不算权限配置页。演示角色不改 `MOCK.currentUser`；个人中心角色读 `roleLabel`
- 不写真实路径、错误码、DDL 全文
- 不做移动端适配
- 解析需求文档/参考图时，图片的布局精度高于文字；文档内部矛盾必须列入疑点清单，禁止静默选择
- 混合项目共享实体（组织名、产品名、锚点数字）必须与大屏 HTML 同名同数（联合验收时核）

## 与 requirements-to-dev / bi-dashboard-generator 交接

交回 / 被委托时：先读对方 Skill 根目录的 `SKILL.md`（含该 `name` 与 `SKILL.md` 的目录）再动手。对方未安装则停，请用户安装或点名调用，禁止空口假装已按对方流程做完。

本 Skill 只出确认单、**HTML 原型**与对接占位。占位 = 字段名 + `USE_MOCK` 开关，**不是**路径 / 错误码 / DDL。数据模型、设计契约、开发计划、Vue 业务工程交回 `requirements-to-dev`，不拆开发模块。

被对方委托时：须已有**已审核需求规格**，且用户已确认下一步交给本 Skill。用规格走入口④，不要拿未转换的 PRD 当唯一依据。**HTML 在对方的选型 / 模型 / 契约 / 计划之前生成。** 规格未审不得假装已委托。

规格人审并用户确认「下一步」之后（**委托路径**）：

| 项目类型 | HTML 委托 |
|---|---|
| 纯大屏 | `bi-dashboard-generator` |
| 纯中后台 | `admin-console-generator` |
| 混合 | 一次委托卡锁死站点地图与共享实体，然后两个生成器都委托；允许分先后生成，收口时联合验收 |

**混合委托卡锁地图**：`requirements-to-dev` 在「委托界面原型」确认卡上写出站点地图和共享实体。两个生成器只引用，禁止各写各的文件名或实体名。

| 文件 | 默认名 | 谁生成 |
|---|---|---|
| 管理壳 | `admin.html` | `admin-console-generator` |
| 大屏（单屏） | `screen.html` | `bi-dashboard-generator` |
| 大屏（多屏） | 委托卡列出的文件名清单 | `bi-dashboard-generator` |
| 总入口（可选） | `index.html` | 委托方或本 Skill |

**跳转规则**：
- 管理侧栏的大屏项：相对链接整页打开委托卡上的大屏文件
- 有管理壳时：每个大屏 HTML 顶栏加「返回管理」→ `admin.html`
- 多个大屏仍一屏一文件，彼此相对链接

直连路径见「启动路径」，不走规格门禁。

用户对 HTML 说「转 Vue / 开始开发」：交回 `requirements-to-dev`。无已审核开发计划 → 不得建工程。`templates/admin-shell.vue` 与 `templates/element-theme.less` 只存在于 Skill 目录，由对方实现阶段**整份拷贝**；对照 [vue-bridge.md](vue-bridge.md)。本 Skill 不把它们写入业务仓库。

## 参考文件

- [themes.md](themes.md) —— 浅色/深色 token（色彩、形状/动效、字号、间距）+ 「脸」的唯一口径
- [layout-patterns.md](layout-patterns.md) —— 壳几何、hash 路由、站点地图、灰框骨架（Step 3.5）
- [page-patterns.md](page-patterns.md) —— 页面积木（列表、表单、详情、登录、树+表、弹窗、批量条、身份模型）
- [mock-data-rules.md](mock-data-rules.md) —— mock 规则；混合项目共享实体一致
- [review-checklist.md](review-checklist.md) —— Step 5.5 审核清单（含单边审核 vs 联合验收）
- [templates/admin.html](templates/admin.html) —— HTML 壳骨架模板
- [templates/admin-shell.vue](templates/admin-shell.vue) / [templates/element-theme.less](templates/element-theme.less) / [vue-bridge.md](vue-bridge.md) —— 转 Vue 对照（本 Skill 不写入业务仓库）
