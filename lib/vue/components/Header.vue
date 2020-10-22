<template>
  <header>
    <el-row>
      <!-- S 移动端菜单按钮 -->
      <!-- <el-col :xs="4" class="hidden-sm-and-up">
        <button @click="toggleShowMenu" class="mobile-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
        </button>
      </el-col> -->
      <!-- E 移动端菜单按钮 -->

      <el-col :xs="12" :sm="4">
        <button @click="toggleShowMenu" class="hidden-sm-and-up mobile-menu-btn">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"></path></svg>
        </button>
        <router-link class="logo" to="/">
          <div v-html="logo"></div>
        </router-link>
      </el-col>

      <!-- S 移动端搜索栏 -->
      <el-col :xs="12" class="hidden-sm-and-up">
        <Search />
      </el-col>
      <!-- E 移动端搜索栏 -->

      <el-col :xs="0" :sm="20">
        <nav>
          <Search />
          <div :style="{ marginLeft: '2rem' }">
            <Menu :menus="navs" mode="horizontal" />
          </div>
          <template v-if="$config.locales">
            <el-divider direction="vertical"></el-divider>
            <Locale />
          </template>
        </nav>
      </el-col>

      <!-- S 移动端菜单 -->
      <div :class="['mobile-menu', showMenu ? 'is-show' : '']">
        <Menu :menus="navs" mode="vertical" />
        <template v-if="$config.locales">
          <div :style="{ paddingLeft: '20px' }">
            <Locale />
          </div>
        </template>
      </div>
      <!-- E 移动端菜单 -->
    </el-row>
  </header>
</template>

<script>
import Locale from './Locale'
import Search from './Search.vue'
import Menu from './menu'

export default {
  props: ['logo', 'navs'],

  components: {
    Locale,
    Search,
    Menu
  },

  watch: {
    $route () {
      this.showMenu = false
    }
  },

  data () {
    return {
      showMenu: false,
      locale: ''
    }
  },

  computed: {
    localTitle () {
      let t = Array.isArray(this.$config.locales) ? this.$config.locales.find(locale => this.locale === locale.value) : null
      return t && t.title || ''
    }
  },

  mounted() {
    if (Array.isArray(this.$config.locales)) {
      this.locale = this.$config.locales[0].value
    }
  },

  methods: {
    toggleShowMenu () {
      this.showMenu = !this.showMenu
    },
    changeLocale(_, idx) {
      this.locale = this.$config.locales[idx].value
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);
  border-bottom: 1px solid #e8e8e8;

  .el-row {
    display: flex;
    align-items: stretch;
  }
}

.logo {
  max-width: calc(100% - 40px);
  height: 60px;
  color: #000;
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;

  .el-menu-horizontal {
    border-bottom: 0;
  }
}

.mobile-menu-btn {
  border: 0;
  font-size: 1.5em;
  transform: translateY(4px);
  background: transparent;
  cursor: pointer;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.mobile-menu {
  position: absolute;
  bottom: 0;
  left: -1rem;
  z-index: 1000;
  transform: translateY(-100%);
  padding-bottom: 1.5rem;
  width: 100vw;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);
  transition: transform ease-in-out 0.3s;

  &.is-show {
    transform: translateY(100%);
  }

  .el-menu-vertical {
    border-right: 0;
  }
}

@media (min-width: 768px) {
  .mobile-menu {
    transform: translateY(-100%) !important;
  }
}
</style>
