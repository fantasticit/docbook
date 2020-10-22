<template>
  <el-row class="page">
    <el-col :xs="20" :sm="4" :class="{ 'is-show': showMenu, 'sider-menu': 1 }">
      <Menu :menus="routes" mode="vertical" />
    </el-col>

    <button :class="{ 'is-show': showMenu, 'menu-btn': 1 }" @click="toggleShowMenu">
      <svg
        viewBox="0 0 1024 1024"
        data-icon="bars"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path>
      </svg>
    </button>

    <el-col :xs="24" :sm="20" class="markdown-container">
      <router-view class="markdown-content"></router-view>
      <el-backtop target=".markdown-container"></el-backtop>
    </el-col>
  </el-row>
</template>

<script>
import { resolveUrl } from '../utils/resolve-url'
import Menu from './menu'

export default {
  props: ['parentRoutePath', 'routes'],
  components: {
    Menu
  },
  data() {
    return {
      showMenu: false,
      showPath: 'pie'
    }
  },
  mounted() {
    const curPath = this.$route.path
    if (curPath) {
      this.showPath = curPath.split('/')[2]
    }
  },
  methods: {
    toggleShowMenu() {
      this.showMenu = !this.showMenu
    },
    menuTitleClick(path) {
      this.showPath = this.showPath === path ? '/' : path
    },
    resolveUrl(...args) {
      return resolveUrl(...args)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  overflow: hidden !important;
  padding: 0 !important;
}

.sider-menu {
  height: 100%;
  border-right: 1px solid #e8e8e8;
  overflow: auto;
}

.menu-btn {
  display: none;
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 1000;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 0 4px 4px 0;
  border: 0;
  font-size: 1.2em;
  padding-top: 6px;
  outline: none;
  transition: left .3s ease-in-out;
  transition-delay: .3s;
}

.markdown-container {
  height: 100%;
  padding: 24px 20px 10px 50px;
  overflow: auto; 
}

@media only screen and (max-width: 767px) {
  .menu-btn {
    display: block;

    &.is-show {
      left: 83.33333%;
      transition-delay: .3s;
    }
  }

  .sider-menu {
    position: absolute;
    left: 0;
    z-index: 1000;
    background: #fff;
    transform: translateX(-100%);
    transition: all ease-in-out .3s;
    transition-delay: .3s;

    &.is-show {
      transform: translateX(0);
      transition-delay: 0;
    }
  }

  .markdown-container {
    padding: 1rem;
    overflow-x: hidden;
  }
}
</style>
