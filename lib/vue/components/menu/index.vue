<template>
  <el-menu :mode="mode" :default-active="$route.path" :class="'el-menu-' + mode" router="true">
    <template v-for="(menu, i) in menus.filter(menu => menu.title && menu.path)">
      <template v-if="menu.children">
        <SubMenu :key="menu.path + '-' + i" :menu="menu" />
      </template>
      <el-menu-item 
        v-else
        :key="menu.path + '-' + i" 
        :index="isOutLink(menu.path) ? '' : menu.path"
        :class="{'is-active': isActive(menu.path)}"
      >
        <a v-if="isOutLink(menu.path)" :href="menu.path" target="_blank" :title="menu.title" >{{ menu.title }}</a>
        <router-link v-else :to="menu.path" :title="menu.title">{{ menu.title }}</router-link>
      </el-menu-item>
    </template> 
  </el-menu>
</template>

<script>
import SubMenu from './sub-menu'

export default {
  props: ['menus', "mode"],
  components: {
    SubMenu
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.$forceUpdate()
      next()
    })
  },
  methods: {
    isOutLink(link) {
      return /^http/.test(link)
    },
    isActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-horizontal {
  overflow: hidden;
  border-bottom: 0;
}

.el-menu-vertical {
  overflow: hidden;
  border-right: 0;
}
</style>
