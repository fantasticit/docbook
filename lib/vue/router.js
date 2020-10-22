import Vue from 'vue'
import Router from 'vue-router'
import { resolveUrl } from './utils/resolve-url'
import { generateRouterView } from './utils/generate-router-view'
import { transform2article } from './utils/transform2article'

Vue.use(Router)

const handleRoutes = (routes, prefix = '', depth = 0) => {
  routes = routes || []

  return routes.map(route => {
    route.path = resolveUrl(prefix, route.path)

    if (depth === 0 && Array.isArray(route.children)) {
      route.component = transform2article(
        route.path,
        route.children,
      )
    }

    if (depth > 0 && Array.isArray(route.children)) {
      route.component = generateRouterView(
        route.path,
        route.children
      )
    }

    if (route.children) {
      route.children = handleRoutes(route.children, route.path, depth + 1)
    }

    return route
  })
}

export default function getRouter (routes) {
  const router = new Router({
    mode: 'hash',
    routes: handleRoutes(routes),
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  return router
}
