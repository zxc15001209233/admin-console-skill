<!-- Skill 对照模板。admin-console-generator 不得把本文件写入业务仓库。仅在 requirements-to-dev 已审开发计划后由对方拷贝改编。 -->
<!--
  EP 必须用清单（禁止用原生控件替代）：el-table、el-form、el-drawer、el-pagination
  大屏入口：菜单用 a[href="screen.html"] 整页跳转，禁止 iframe 嵌入 router-view
-->
<template>
  <el-config-provider :locale="zhCn">
    <el-container class="admin-shell">
      <el-aside width="232px" class="admin-shell__aside">
        <div class="admin-shell__brand">{{ productName }}</div>
        <nav class="admin-shell__nav">
          <!-- 菜单：业务页 router-link；大屏用 a[href=screen.html] 整页跳转，禁止 iframe -->
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="admin-shell__link"
          >
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
          <!-- 主题切换：html data-theme；键 admin-theme:产品名 -->
          <el-button text @click="toggleTheme">{{ themeLabel }}</el-button>
          <!-- 演示角色 el-select -->
          <el-select v-model="demoRole" size="small" style="width: 120px">
            <el-option label="员工" value="staff" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-header>
        <el-main class="admin-shell__main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
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

const theme = ref<'light' | 'dark'>('light')
const themeLabel = computed(() => (theme.value === 'light' ? '切换深色' : '切换浅色'))

function applyTheme(next: 'light' | 'dark') {
  theme.value = next
  document.documentElement.dataset.theme = next
  localStorage.setItem(themeStorageKey.value, next)
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light')
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
}

.admin-shell__brand {
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
}

.admin-shell__nav {
  display: flex;
  flex-direction: column;
}

.admin-shell__link {
  display: block;
  padding: 10px 16px;
  color: var(--text-on-sidebar);
  text-decoration: none;

  &:hover {
    background: var(--bg-sidebar-hover);
  }

  &.router-link-active {
    background: rgba(255, 255, 255, 0.12);
  }
}

.admin-shell__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 16px;
  background: var(--bg-topbar);
  border-bottom: 1px solid var(--border);
}

.admin-shell__main {
  padding: 20px 24px;
  background: var(--bg-page);
}
</style>
