import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import ElementUI, { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import { resolveConfig, resolveRoutes } from './resolve'
import getRouter from './router'
import App from './App.vue'
import BlockDemo from './components/BlockDemo.vue'
import 'highlight.js/styles/xcode.css'
import './styles/theme/index.css';

Vue.config.productionTip = false

const options = {
  color: '#000',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)
Vue.use(ElementUI);
Vue.component('block-demo', BlockDemo)

const loadingInstance = Loading.service({ fullscreen: true, text: '页面正在加载中...' });

if (IS_PROD) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}

Promise.all([resolveConfig(), resolveRoutes()]).then(([config, routes]) => {
  if (config.loadDefaultFavicon) {
    require('./favicon.ico')
  }
  const router = getRouter(config, routes)
  const vm = new Vue({
    render: h => h(App),
    router: router
  })
  Vue.prototype.$config = config
  Vue.prototype.$buildTime = BUILD_TIME
  vm.$mount('#app')
  loadingInstance.close()
}).catch(err => {
  console.log(err)
})
