<template>
  <el-submenu :key="menu.path + '-' + i" :index="menu.path">
    <template slot="title">{{ menu.title }}</template>
    <template v-for="(submenu, i) in menu.children.filter(menu => menu.title && menu.path)">
      <template v-if="submenu.children">
          <SubMenu :key="submenu.path + '-' + i" :menu="submenu" />
        </template>
        <el-menu-item v-else :key="submenu.path + '-' + i" :index="submenu.path">
          <a v-if="isOutLink(submenu.path)" :href="submenu.path" target="_blank">{{ submenu.title }}</a>
          <router-link v-else :to="submenu.path">{{ submenu.title }}</router-link>
        </el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
import SubMenu from './sub-menu'

export default {
  name: 'SubMenu',
  props: ['menu'],
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

