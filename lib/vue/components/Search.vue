<template>
  <div class="search-box">
    <el-autocomplete
      size="small"
      popper-class="autocomplete"
      v-model="query"
      :fetch-suggestions="getSuggestions"
      placeholder="搜索..."
      @select="handleSelect">
      <template slot-scope="{ item }">
        <a :href="item.path" @click.prevent>{{ item.title }}</a>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      focused: false,
      focusIndex: null
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes || []
    },
    pages() {
      const ret = []
      const has = []
      const traverse = (routes) => {
        return routes.forEach(route => {
          const key = route.title
          if (!has.includes(key)) {
            ret.push(route)
            has.push(key)
          }

          if (Array.isArray(route.children)) {
            traverse(route.children)
          }
        })
      }

      traverse(this.routes)
      console.log(ret)
      return ret
    },
  },
  methods: {
    getSuggestions(query, cb) {
      const matches = query ? this.pages.filter(
        page =>
          ((page.title && page.title.includes(query)) ||
            (page.path && page.path.includes(query))) &&
          page.path !== this.$router.currentRoute.path
      ) : []
      cb(matches.length ? matches : this.pages)
    },
    handleSelect(item) {
      this.$router.push(item.path)
    },
  }
}
</script>

<style>
.search-box {
  height: 100%;
  display: inline-flex;
  align-items: center;
}
</style>
