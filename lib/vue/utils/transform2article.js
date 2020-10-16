import Article from '../components/Article.vue'

export function transform2article(parentRoutePath, routes) {
  return {
    template: '<Article :parentRoutePath="parentRoutePath" :routes="routes" />',
    components: {
      Article
    },
    data() {
      return {
        parentRoutePath,
        routes
      }
    }
  }
}
