# 转 Vue 对照契约

`admin-console-generator` 只出 HTML。Vue 由 `requirements-to-dev` 在已审开发计划后写。本文件是实现基座的对照清单，不是本 Skill 的生成步骤。

## 必须拷贝

| Skill 模板 | 写入业务仓库 | 作用 |
|---|---|---|
| `templates/element-theme.less` | 管理入口样式（可改后缀 `.css`） | token + EP 控件态 + 同仓大屏隔离 |
| `templates/admin-shell.vue` | 管理壳（改编，勿原样业务名） | 根节点、主题键、个人中心独立抽屉 |

禁止：从零手写输入/下拉/表头/焦点环；禁止只映射 `--el-color-primary` 就算「用过主题」。

HTML 用自建 `.field`；Vue 必须换 Element Plus。布局/菜单/字段跟 HTML。控件交互态以 **拷贝后的 `element-theme.less`** 为准，不要用 EP 出厂默认顶替。规格选 B（组件默认样子）时仍须拷贝该文件作 token 与隔离；不得改用大屏 `element-dark`。

## 根节点与主题

- 所有管理路由（含登录、忘记密码）包在带 `class="admin-root"` 的根上，`:data-theme="light|dark"`。
- 主题键仍是 `admin-theme:<产品名>`。
- **独立管理工程**：可以把 `data-theme` 同步写到 `html`。
- **与大屏同一 document**（同一 Vite、同一 `App.vue`）：`data-theme` 只写在 `.admin-root`；禁止写 `html[data-theme]`；禁止修改大屏的 `element-dark.less` / `element-dark.css`；禁止管理页 `import` 大屏那份深色浮层当皮肤。
- 大屏皮肤用 `!important` 白字青边时，靠 `element-theme.less` 里 `html:has(.admin-root)` 覆盖，不要去改大屏文件。

## 表单与焦点（已在 less 里，页面还要对齐）

| HTML | Vue |
|---|---|
| `.field:focus-visible` 外框主色 + `--ring-w` 环 | 环打在 `.el-input__wrapper.is-focus` / `.el-select__wrapper.is-focused`；内部 `.el-input__inner` 禁止再套一层环 |
| 登录标签在上、框高 `--login-ctl` | `el-form label-position="top"`；登录/验证码高度 `--login-ctl` |
| `<option value="">全部状态` | `el-select` 设 `placeholder` 为该文案（空字符串选项常被 EP 显示成「请选择」） |
| 表头 `--fs-micro` + `--text-3` | 已在 less；不要再给 `th` 套正文色 |
| `.btn` 无边框 | 次按钮 `border: 0`（less 已写） |
| 线性 SVG `--ico` 18px | `viewBox="0 0 24 24"`，宽高 `var(--ico)` |

禁止：`.admin-root :focus-visible { box-shadow: … }` 不排除 `.el-input__inner`。

## 自测（中后台基座完成口径）

浅色/深色各走一遍：登录聚焦、筛选 input/select 聚焦与 hover、下拉/抽屉/确认框字色、表头、登录标签在上且与按钮同高。与大屏同仓时再打开 `/` 确认大屏输入仍是大屏脸。
