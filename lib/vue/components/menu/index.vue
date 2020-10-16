<template>
  <el-menu :default-active="$route.path" :mode="mode" :class="'el-menu-' + mode" router="true">
    <template v-for="(menu, i) in menus.filter(menu => menu.title && menu.path)">
      <template v-if="menu.children">
        <SubMenu :key="menu.path + '-' + i" :menu="menu" />
      </template>
      <el-menu-item v-else :key="menu.path + '-' + i" :index="isOutLink(menu.path) ? '' : menu.path">
        <a v-if="isOutLink(menu.path)" :href="menu.path" target="_blank">{{ menu.title }}</a>
        <router-link v-else :to="menu.path">{{ menu.title }}</router-link>
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
  methods: {
    isOutLink(link) {
      return /^http/.test(link)
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
