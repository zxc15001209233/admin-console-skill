# admin-console-generator

通用 Agent Skill：**把后台管理需求变成风格统一的可点 HTML 原型**。不绑定某一 IDE。

- 自建侧栏 + 顶栏 + 内容区，浅色 / 深色两套 token，页内切换（记在 `localStorage`）
- 支持从**一句话需求、布局/菜单描述、参考图、需求文档**四种输入生成
- 先产出**单文件 `admin.html`**（mock 假数据 + 筛选/表单/分页等假交互，双击浏览器即可看）
- 页面由需求决定；Skill 只提供积木（列表、抽屉表单、详情、登录、树表等）
- **本 Skill 不创建 Vue/Vite 工程**。转工程交回 `requirements-to-dev`（须已审核开发计划）

仓库：

- Gitee：https://gitee.com/zxc19890923/admin-console-skill
- GitHub：https://github.com/zxc15001209233/admin-console-skill

和大屏 Skill 对称：大屏走 `bi-dashboard-generator`，中后台走本 Skill。混合项目同目录整页跳转（`admin.html` ↔ `screen.html`），不把大屏嵌进管理内容区。

## 效果预览

> 示例：对 AI 说「帮我做一个会议室预约后台原型」，先给【后台方案确认单】，确认后再生成可打开的 `admin.html`（列表、抽屉新建、浅/深切换）。

也可先双击本仓库 `templates/admin.html` 看默认壳。

## 安装

```bash
# Gitee（国内推荐）
npx skills add https://gitee.com/zxc19890923/admin-console-skill.git
npx skills add https://gitee.com/zxc19890923/admin-console-skill.git -g

# GitHub
npx skills add zxc15001209233/admin-console-skill
npx skills add zxc15001209233/admin-console-skill -g
```

第一条装到当前项目，带 `-g` 的为全局安装（所有项目可用）。

不支持 `skills add` 的编辑器（部分 Copilot、Trae、CodeBuddy 等）：把**本目录整份**放进项目（不要只拷 `SKILL.md`），在该产品的项目指令里写明：做中后台原型时先读本目录 `SKILL.md`，细则读同目录附件。常见落点包括项目根 `AGENTS.md`、`.github/copilot-instructions.md` 或产品自己的自定义指令。

脚本路径一律相对 **本 Skill 根目录**（与 `SKILL.md` 同级），例如 `scripts/check-template.js`。不要写死 `~/.cursor/skills`。

## 使用方式

Agent 能读到本 Skill 后即可描述需求，例如：

- 「帮我做一个会议室预约后台」（一句话，AI 会主动提菜单和页面）
- 「侧栏：工作台、客户列表；客户页要筛选和新建抽屉」（自己描述菜单）
- 发一张旧系统截图：「字段按这个来，脸用统一后台壳」
- 发需求文档：「按这份规格里的管理页生成 HTML 原型」

之后 AI 会按固定流程走：

```
识别入口与启动路径（直连 / 被 requirements-to-dev 委托）
   ↓
方案确认单（站点地图、积木、缺失项/疑点，确认后再动手）
   ↓
（复杂/多页可先出灰框骨架）
   ↓
生成单文件 HTML（mock + 假交互 + 浅/深切换）
   ↓
自检 + 独立审核（结论写入生成物旁 review/）
   ↓
交付 admin.html；转 Vue 交回 requirements-to-dev
```

小白用户只需要说清楚「给谁用、管什么数据」，壳、主题、列表/表单形态由 Skill 兜底。

## 启动路径

| 路径 | 何时 | 规格 |
|---|---|---|
| **直连** | 用户点名做后台原型 | 不要求已审规格 |
| **委托** | `requirements-to-dev` 规格人审并「下一步」后 | 必须已审规格；确认单抄委托卡上的站点地图 |

禁止用直连冒充「已被委托」。禁止因为没有规格而拒绝一句话需求。

## 和其它 Skill 怎么配合

| 材料 | 谁做 HTML |
|---|---|
| 纯大屏 / 看板 | `bi-dashboard-generator` |
| 纯中后台 / CRUD | 本 Skill |
| 混合 | `requirements-to-dev` 出一张委托卡锁死站点地图和共享实体，然后两个生成器都做；允许分先后生成，两边齐了再联合验收 |

本 Skill 只出确认单、HTML、字段名 + `USE_MOCK` 占位。数据模型、设计契约、开发计划、Vue 业务工程交回 `requirements-to-dev`。对方未安装则停。

文档要了审批流页 / 权限矩阵页：进确认单缺失项，第一版不发明页面。角色按钮显隐用顶栏「演示角色」。

## 输出格式

| 格式 | 说明 | 适合场景 |
|------|------|----------|
| HTML 单文件 `admin.html` | 零本地构建，双击即看；默认目录 `ui-design/` | 产品评审、演示、对齐字段和菜单 |
| Vue 工程 | **不由本 Skill 生成**；对照模板仅留在 `templates/admin-shell.vue` | 已审开发计划后由 `requirements-to-dev` 按选型 §2 写 |

HTML 自建控件；转 Vue 后换 Element Plus。布局/菜单/字段保持，**不承诺控件皮肤 1:1**。

## 文件说明

| 文件 | 作用 |
|------|------|
| `SKILL.md` | 主指令：路径、流程、硬性规则、交接 |
| `产品使用指南.md` | 给产品/业务同学的用法 |
| `themes.md` | 浅/深 token（禁止自造色、禁止大屏科技青） |
| `layout-patterns.md` | 壳、hash 路由、站点地图、灰框骨架 |
| `page-patterns.md` | 列表/表单/详情等积木 |
| `mock-data-rules.md` | mock 口径与一致性 |
| `review-checklist.md` | Step 5.5：单边审核 vs 混合联合验收 |
| `templates/admin.html` | 单文件壳示例 |
| `templates/admin-shell.vue` | 实现阶段对照用，禁止本 Skill 写入业务仓库 |
| `templates/element-theme.less` | Element Plus 浅/深 token 映射 |
| `scripts/check-template.js` | 校验 HTML 是否踩大屏脸、token 是否齐、有无裸色/裸圆角；可传生成物路径 |

## 主题

**浅色（默认）**

浅底 `#f0f2f5` + 白侧栏 `#ffffff` + 靛主色 `#3b5bdb`。当前菜单用主色左条 + 浅蓝底，不要整条刷实心蓝。每个叶子菜单有线性图标；收起后只留图标，悬停弹出名称。

**深色**

三层递进：页面 `#0d1117` < 侧栏 `#141926` < 卡片 `#171d26`。弹出层必须一起变，禁止白底下拉。

两套主题共用一份形状 / 动效 / 字号 / 间距 token（`--radius`、`--dur`、`--fs-*`、`--sp-*`），生成物里禁止散写 px 与自造色。

色值只取自 `themes.md`。切到大屏会换脸，这是预期。

## License

木兰宽松许可证第 2 版（Mulan PSL v2），见 [LICENSE](./LICENSE)。

## 更新

| 时间 | 说明 |
|---|---|
| 2026-09-09 | 精工脸：靛主色、方标、分段主题、状态胶囊、卡片阴影 |
| 2026-09-09 | 侧栏靛墨底 + 图标 + 收起悬停气泡；查看/编辑同抽屉 |
| 2026-09-09 | 浅色侧栏改为白底深字，去掉默认深墨墙 |
