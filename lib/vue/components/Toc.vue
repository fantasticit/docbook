<script>
export default {
  name: 'Toc',
  props: {
    target: String,
    includeLevel: {
      type: Array,
      required: false,
      default: () => [1, 6],
    },
  },
  data() {
    return {
      headers: []
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => this.findHeaders())
    }
  },
  mounted() {
    this.$nextTick(() => this.findHeaders())
  },
  methods: {
    findHeaders() {
      const minLevel = this.includeLevel[0]
      const maxLevel = this.includeLevel[1]

      const processHeaders = (
        headers,
        rootLevel = minLevel
      )  => {

        const result = []

        for (let i = 0; i !== headers.length; ) {
          const nextRootOffset = headers
            .slice(i + 1)
            .findIndex((h) => h.level === rootLevel)
          const nextRootIndex =
            nextRootOffset === -1 ? headers.length : nextRootOffset + i + 1
          const thisHeader = headers[i]

          if (thisHeader.level >= rootLevel && thisHeader.level <= maxLevel) {
            const childHeaders = headers.slice(i + 1, nextRootIndex)
            const children =
              rootLevel < maxLevel && childHeaders.length > 0
                ? processHeaders(childHeaders, rootLevel + 1)
                : null
            result.push({
              ...thisHeader,
              children,
            })
          }
          i = nextRootIndex
        }
        return result
      }

      const selector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(k => `${this.target} ${k}`).join(', ')
      this.headers = processHeaders(Array.from(document.querySelectorAll(selector)).map(node => ({
        level: +node.tagName.match(/\d/)[0],
        title: node.innerText,
        slug: node.getAttribute('id')
      })))
    }
  },
  render(h) {
    if (!this.headers) {
      return null
    }
    const renderHeaders = (items) => {
      return h(
        'ul',
        items.map((item) =>
          h('li', [
            h(
              'router-link',
              {
                props: { to: `#${item.slug}` },
              },
              item.title
            ),
            item.children ? renderHeaders(item.children) : null,
          ])
        )
      )
    }
    return h('div', [renderHeaders(this.headers)])
  }
}
</script>>