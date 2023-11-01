import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入Element-ui
import ElementUI,{Table} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import '@/assets/normalize.css';

Vue.config.productionTip = false

const fixElTableErr = table => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}
fixElTableErr(Table)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
