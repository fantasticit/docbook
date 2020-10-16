import Vue from 'vue'

export  function generateRouterView(prefix, routes) {
  return Vue.component(
    prefix.replace(/(\/)\w+/g, m => m.toUpperCase()).replace(/\//g, ''),
    {
      prefix,
      routes,
      data() {
        return { prefix, routes }
      },
      render(h) {
        return h('router-view')
      }
    }
  )
}
