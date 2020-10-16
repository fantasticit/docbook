<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ localTitle }} <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item 
        v-for="(local, i) in $config.locales" :key="local.value" 
        v-on:click.native="changeLocale($event, i)"
      >
        {{local.title}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data () {
    return {
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
    changeLocale(_, idx) {
      this.locale = this.$config.locales[idx].value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
