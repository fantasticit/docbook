<template>
  <el-row class="page">
    <el-col :sm="4" :class="{ 'is-show': showMenu, 'sider-menu': 1 }">
      <Menu :menus="routes" mode="vertical" />
    </el-col>

    <div @click="toggleShowMenu" :class="{ 'is-active': showMenu, 'menu-btn': 1, 'hidden-sm-and-up': 1 }">
      <div class="stick"></div>
      <div class="stick"></div>
      <div class="stick"></div>
    </div>

    <el-col :xs="24" :sm="20" class="markdown-container" ref="content">
      <article>
        <div v-if="$config.toc" class="toc-container" :style="{ right: tocRight + 'px' }">
          <Toc target=".markdown-content" />
        </div>
        <router-view class="markdown-content" ref="markdown">
        </router-view>
        <div class="navigation-container">
          <div v-if="prev" class="left" :style="{ width: next ? '45%' : '100%' }">
            <router-link :to="prev.path">
              <i class="el-icon-arrow-left"></i>
              <span>{{ prev.title }}</span>
            </router-link>
          </div>
          <div v-if="next" class="right" :style="{ width: prev ? '45%' : '100%' }">
            <router-link :to="next.path">
              <span>{{ next.title }}</span>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </div>
        </div>
        <footer v-if="$config.renderFooter && typeof $config.renderFooter === 'function'">
          <div v-html="$config.renderFooter($buildTime, current && current.meta && current.meta.location)">
          </div>
        </footer>
        <el-backtop target=".markdown-container"></el-backtop>
      </article>
      
    </el-col>
  </el-row>
</template>

<script>
import { resolveUrl } from '../utils/resolve-url'
import { throttle } from '../utils/throttle'
import Menu from './menu'
import Toc from './Toc'

export default {
  props: ['parentRoutePath', 'routes'],
  components: {
    Menu,
    Toc
  },
  data() {
    return {
      isMobile: false,
      tocRight: 0,
      showMenu: false,
      prev: null,
      current: null,
      next: null,
    }
  },
  watch: {
    '$route'(route) {
      this.calcNavigation()

      if (this.isMobile && this.showMenu) {
        this.showMenu = false
      }

      this.$nextTick(() => {
        if (route.hash) {
          document.querySelector(`${route.hash}`).scrollIntoView()
        } else {
          this.$refs['content'].$el.scrollTop = 0  
        }
      })
    }
  },
  created() {
    this.calcNavigation()
  },
  mounted() {
    const hash = this.$route.hash

    if (hash) {
      this.$nextTick(() => {
        document.querySelector(`${decodeURIComponent(hash)}`).scrollIntoView()
      })
    }

    this.calcTocRight()
    window.addEventListener('resize', this.calcTocRight)
  },
  destroyed() {
    window.removeEventListener('resize', this.calcTocRight)
  },
  methods: {
    calcTocRight() {
      this.isMobile = window.innerWidth <= 768
      const el = this.$refs['content'].$el
      const width = el.offsetWidth
      const o = (width - 750) / 2 - 20
      this.tocRight = o > 200 ? o : -1
    },
    toggleShowMenu() {
      this.showMenu = !this.showMenu
    },
    resolveUrl(...args) {
      return resolveUrl(...args)
    },
    calcNavigation() {
      const currentPath = this.$route.path
      const routes = this.$router.options.routes
      let currentPathIndex = -1
      let parent = null

      const find = (routes) => {
        return routes.forEach(route => {
           if (!route.children) return 
          let idx = route.children.findIndex(item => item.path === currentPath)
          if (idx > -1) {
            currentPathIndex = idx
            parent = route
          } else {
            find(route.children)
          }
        })
      }

      find(routes)

      if (currentPathIndex > -1) {
        this.current = parent.children[currentPathIndex]
        this.prev = parent.children[currentPathIndex - 1]
        this.next = parent.children[currentPathIndex + 1]

        if (!this.prev.title) {
          this.prev = null
        }
      }
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


.markdown-container {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;

  > article {
    position: relative;
    max-width: 750px;
    margin: 0 auto;
    padding: 20px 0 60px;

    .toc-container {
      position: fixed;
      top: 90px;
      right: 40px;
      margin-left: 20px;
      transform: translateX(100%);
    }

    .navigation-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: relative;
      border-top: 1px solid rgba(0,0,0,.07);
      padding: 40px 0 20px;
      margin-top: 40px;

      > div {
        position: relative;
        width: 40%;
        padding: 8px;
        border: 1px solid rgb(230, 236, 241);
        border-radius: 3px;
        box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
        background: #fff;

        > a {
          display: flex;
          align-items: center;
          padding: 1rem .5rem;
          
          span {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: calc(100% - 30px);
          }
        }

        &.right {
          text-align: right;

          > a {
            justify-content: flex-end;
          }
        }
      }
    }

    footer {
      padding: 20px 0 10px;
      text-align: center;
      color: #333;
      font-size: 1rem;

      a {
        text-decoration: underline;
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .menu-btn {
    position: absolute;
    right: 40px;
    bottom: 90px;
    z-index: 1000;
    width: 40px;
    height: 40px;
    font-size: 20px;
    background: #fff;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    border: 0;
    outline: none;
    transition: all .3s ease-in-out;
    transition-delay: .3s;

    .stick {
      width: 20px;
      height: 3px;
      background-color: #000;
      opacity: 1;
      border-radius: 3px;
      transition: all 250ms ease-in-out 0s;
      margin-left: 10px;

      &:nth-of-type(1) {
        margin-top: 10px;
      }

      &:nth-of-type(2),
      &:nth-of-type(3) {
        margin-top: 4px;
      }
    }

    &.is-active {
      .stick {
        &:first-of-type {
          transform: translateY(8px) rotate(45deg);
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

  .sider-menu {
    position: absolute;
    left: 0;
    z-index: 10;
    border-right: 0;
    background: #fff;
    transition: all ease-in-out .3s;
    transition-delay: .3s;

    width: 0;
    height: 0;
    opacity: 0;

    &.is-show {
      width: 100vw;
      height: 100%;
      opacity: 1;
      transition-delay: 0;
    }
  }

  .markdown-container {
    padding: 1rem;
    overflow-x: hidden;
  }
}
</style>
