<script>
import { throttle } from '../utils/throttle'
export default {
  name: 'Toc',
  props: {
    target: String,
    scrollContainer: String,
    includeLevel: {
      type: Array,
      required: false,
      default: () => [1, 6],
    },
  },
  data() {
    return {
      headers: [],
      offsets: [],
      activeId: ''
    }
  },
  watch: {
    $route() {
      this.$nextTick(() => this.findHeaders())
    },
  },
  mounted() {
    this.activeId = this.$route.hash.replace(/^#/, '')
    this.$nextTick(() => { 
      this.findHeaders();
      const container = document.querySelector(this.scrollContainer)
      container.addEventListener('scroll',  this.sync)
    })
  },
  destroyed() {
    const container = document.querySelector(this.scrollContainer)
    container.addEventListener('scroll',  this.sync)
  },
  methods: {
    sync: throttle(function () {
      const container = document.querySelector(this.scrollContainer)
      const scrollTop = container.scrollTop
      let active = this.offsets.find(o => o.offsetTop >= scrollTop) || this.offsets[this.offsets.length - 1]
      if (active && active.id) {
        this.activeId = active.id
      }
    }, 100),
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

      this.offsets = []
      const selector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(k => `${this.target} ${k}`).join(', ')
      this.headers = processHeaders(Array.from(document.querySelectorAll(selector)).map(node => {
        this.offsets.push({
          offsetTop: node.offsetTop,
          id: node.getAttribute('id')
        })
        
        return ({
          level: +node.tagName.match(/\d/)[0],
          title: node.innerText,
          slug: node.getAttribute('id')
        })
      }))
    }
  },
  render(h) {
    if (!this.headers) {
      return null
    }

    const vm = this

    const renderHeaders = (items) => {
      return h(
        'ul',
        items.map((item) =>
          h('li', {
            on: {
              click(evt) {
                evt.stopPropagation()
                vm.activeId = item.slug
                document.getElementById(item.slug).scrollIntoView()
              }
            },
          }, [
            h(
              'span',
              {
                props: { to: `#${item.slug}` },
                class: this.activeId === item.slug ? 'is-active' : '',
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