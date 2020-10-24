<template>
  <header>
    <el-row>
      <el-col :xs="12" :sm="4">
        <!-- S 移动端菜单按钮 -->
        <div @click="toggleShowMenu" :class="['hidden-sm-and-up mobile-menu-btn', showMenu ? 'is-active' : '']">
          <div class="stick"></div>
          <div class="stick"></div>
          <div class="stick"></div>
        </div>
        <!-- E 移动端菜单按钮 -->
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

@media (max-width: 768px) {
  header {
    padding: 0 20px;
  }
}

.logo {
  max-width: calc(100% - 40px);
  height: 60px;
  color: #000;
  font-weight: 900;
  font-size: 22px;
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
  display: inline-block;
  margin-right: .5rem;
  transform: translateY(2px);

  .stick {
    width: 25px;
    height: 4px;
    background-color: #000;
    opacity: 1;
    border-radius: 3px;
    transition: all 250ms ease-in-out 0s;

    &:nth-of-type(2) {
      margin: 4px 0;
    }
  }

  &.is-active {
    .stick {
      &:first-of-type {
        transform: translateY(10px) rotate(45deg);
      }

      &:nth-of-type(2) {
        opacity: 0;
      }

      &:last-of-type {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }
}

.mobile-menu {
  position: absolute;
  top: 61px;
  left: 0;
  margin-left: -20px;
  z-index: 1000;
  text-align: center;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);
  transition: height ease-in-out 0.3s, width ease-in-out 0.3s, opacity ease-in-out .3s;

  &.is-show {
    width: 100vw;
    height: calc(100vh - 61px);
    opacity: 1;
    overflow-y: auto;
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
