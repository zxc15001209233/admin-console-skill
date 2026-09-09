<!-- Skill 对照模板。admin-console-generator 不得把本文件写入业务仓库。仅在 requirements-to-dev 已审开发计划后由对方拷贝改编。 -->
<!--
  EP 必须用清单（禁止用原生控件替代）：el-table、el-form、el-drawer、el-dialog、el-pagination、el-dropdown
  个人中心用独立 el-drawer，禁止和业务查看共用一个抽屉
  删除确认用 el-dialog，禁止 window.confirm
  大屏入口：菜单用 a[href="screen.html"] 整页跳转，禁止 iframe 嵌入 router-view
-->
<template>
  <el-config-provider :locale="zhCn">
    <el-container class="admin-shell">
      <!-- 宽/高与 themes.md 的 --sidebar-w / --topbar-h 保持一致，改一处要同步改 token -->
      <el-aside width="232px" class="admin-shell__aside">
        <div class="admin-shell__brand">
          <span class="admin-shell__mark">{{ productName.slice(0, 1) }}</span>
          <span>{{ productName }}</span>
        </div>
        <nav class="admin-shell__nav">
          <!-- 菜单：业务页 router-link；大屏用 a[href=screen.html] 整页跳转，禁止 iframe -->
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="admin-shell__link"
          >
            <!-- 叶子菜单必须带图标（拷贝后换成 el-icon）；收起态只留图标 + 悬停气泡 -->
            {{ item.label }}
          </router-link>
          <a
            v-if="screenHref"
            :href="screenHref"
            class="admin-shell__link admin-shell__link--screen"
          >
            {{ screenLabel }}
          </a>
        </nav>
      </el-aside>
      <el-container>
        <el-header height="56px" class="admin-shell__header">
          <!-- 登录页不在本壳内：登录/忘记密码须自带 theme-seg，键仍 admin-theme:产品名 -->
          <el-radio-group :model-value="theme" size="small" @change="applyTheme">
            <el-radio-button value="light" aria-label="浅色" title="浅色">
              <svg class="theme-ico" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M17.99 17.99l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M17.99 6.01l1.06-1.06"/></svg>
            </el-radio-button>
            <el-radio-button value="dark" aria-label="深色" title="深色">
              <svg class="theme-ico" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14.5A8.2 8.2 0 1 1 9.5 4 6.4 6.4 0 0 0 20 14.5z"/></svg>
            </el-radio-button>
          </el-radio-group>
          <!-- 演示角色只改显隐，不改 currentUser / 个人中心 -->
          <label class="demo-role">
            <span>演示</span>
            <el-select v-model="demoRole" size="small" style="width: 120px">
              <el-option label="员工" value="staff" />
              <el-option label="管理员" value="admin" />
            </el-select>
          </label>
          <el-dropdown trigger="click" @command="onUserCommand">
            <span class="admin-shell__user">{{ currentUser.name }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="admin-shell__main">
          <router-view />
          <!-- 列表筛选项应写进路由 query，刷新可复现 -->
        </el-main>
      </el-container>
    </el-container>
    <el-drawer v-model="profileOpen" title="个人中心" :close-on-click-modal="false">
      <el-descriptions :column="1">
        <el-descriptions-item label="姓名">{{ currentUser.name }}</el-descriptions-item>
        <el-descriptions-item label="账号">{{ currentUser.username }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ currentUser.roleLabel }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    <el-dialog v-model="modalOpen" :title="modalTitle" width="420px" :close-on-click-modal="false">
      <p>{{ modalBody }}</p>
      <template #footer>
        <el-button @click="modalOpen = false">取消</el-button>
        <el-button type="danger" @click="onModalOk">确定</el-button>
      </template>
    </el-dialog>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

/** 拷贝后替换为实际产品名，用于 localStorage 键 admin-theme:<产品名> */
const productName = ref('产品名')
const themeStorageKey = computed(() => `admin-theme:${productName.value}`)

const menuItems = ref([
  { path: '/example', label: '示例列表' },
])

const screenHref = ref('screen.html')
const screenLabel = ref('工业分析大屏')

const demoRole = ref<'staff' | 'admin'>('staff')
watch(demoRole, (role) => {
  document.documentElement.dataset.role = role
})

const currentUser = ref({
  name: '张伟',
  username: 'zhangwei',
  role: 'staff',
  roleLabel: '员工',
})
const profileOpen = ref(false)
const modalOpen = ref(false)
const modalTitle = ref('确认')
const modalBody = ref('')

function onUserCommand(cmd: string) {
  if (cmd === 'profile') profileOpen.value = true
  if (cmd === 'logout') {
    profileOpen.value = false
    // 清登录态后 router.push('/login')，不要回跳退出前的页
  }
}

function onModalOk() {
  modalOpen.value = false
}

const theme = ref<'light' | 'dark'>('light')

function applyTheme(next: 'light' | 'dark') {
  theme.value = next
  document.documentElement.dataset.theme = next
  localStorage.setItem(themeStorageKey.value, next)
}

const saved = localStorage.getItem(themeStorageKey.value)
if (saved === 'light' || saved === 'dark') {
  applyTheme(saved)
} else {
  applyTheme('light')
}
</script>

<style lang="less">
@import './element-theme.less';
</style>

<style scoped lang="less">
.admin-shell {
  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-1);
}

.admin-shell__aside {
  background: var(--bg-sidebar);
  color: var(--text-on-sidebar);
  box-shadow: inset -1px 0 0 var(--border);
}

.admin-shell__brand {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-4) var(--sp-3) var(--sp-5);
  font-size: var(--fs-title);
  font-weight: 600;
}

.admin-shell__mark {
  width: var(--ctl-h);
  height: var(--ctl-h);
  border-radius: var(--radius);
  background: var(--sidebar-accent);
  color: var(--text-on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-body);
  flex-shrink: 0;
}

.admin-shell__nav {
  display: flex;
  flex-direction: column;
}

.admin-shell__link {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  position: relative;
  margin: var(--seg-gap) var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  color: var(--text-on-sidebar);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease);

  &:hover {
    background: var(--bg-sidebar-hover);
    color: var(--text-on-sidebar-strong);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 var(--ring-w) var(--ring);
  }

  &.router-link-active {
    background: var(--bg-sidebar-active);
    color: var(--text-on-sidebar-strong);
    font-weight: 500;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: var(--sp-2);
      bottom: var(--sp-2);
      width: var(--accent-bar);
      border-radius: var(--radius-pill);
      background: var(--sidebar-accent);
    }
  }
}

.admin-shell__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--sp-3);
  padding: 0 var(--sp-6);
  background: var(--bg-topbar);
  box-shadow: inset 0 -1px 0 var(--border);
}

.theme-ico {
  width: var(--ico);
  height: var(--ico);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
}

.demo-role {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  height: var(--ctl-h);
  padding: 0 var(--sp-2);
  background: var(--bg-muted);
  border-radius: var(--radius);
  color: var(--text-3);
  font-size: var(--fs-label);
}

.admin-shell__main {
  padding: var(--sp-5) var(--sp-6);
  background: var(--bg-page);
}
</style>
