import Vue from 'vue'
// S element
import Row from 'element-ui/lib/row';
import Col from 'element-ui/lib/col';
import Button from 'element-ui/lib/button';
import Divider from 'element-ui/lib/divider';
import Dropdown from 'element-ui/lib/dropdown';
import DropdownMenu from 'element-ui/lib/dropdown-menu';
import DropdownItem from 'element-ui/lib/dropdown-item';
import Input from 'element-ui/lib/input';
import Notification from 'element-ui/lib/notification';
import Autocomplete from 'element-ui/lib/autocomplete';
import Backtop from 'element-ui/lib/backtop';
import Tooltip from 'element-ui/lib/tooltip';
import Icon from 'element-ui/lib/icon';
import Menu from 'element-ui/lib/menu';
import SubMenu from 'element-ui/lib/submenu';
import MenuItem from 'element-ui/lib/menu-item';
import Tabs from 'element-ui/lib/tabs'
import TabPane from 'element-ui/lib/tab-pane'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
// E element
import { resolveConfig, resolveRoutes } from './resolve'
import getRouter from './router'
import App from './App.vue'
import BlockDemo from './components/BlockDemo.vue'
import 'highlight.js/styles/xcode.css'

Vue.config.productionTip = false

// S element
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.use(Divider)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(Autocomplete)
Vue.use(Backtop);
Vue.use(Tooltip);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(SubMenu);
Vue.use(MenuItem);
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$notify = Notification
// E element

Vue.component('block-demo', BlockDemo)

Promise.all([resolveConfig(), resolveRoutes()]).then(([config, routes]) => {
  const router = getRouter(routes)
  const vm = new Vue({
    render: h => h(App),
    router: router
  })
  Vue.prototype.$config = config
  vm.$mount('#app')
}).catch(err => {
  console.log(err)
})
