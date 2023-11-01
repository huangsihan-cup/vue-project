import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import store from '@/store'

Vue.use(VueRouter)

if(localStorage.getItem('token')){
  store.dispatch('getMenuList')
}

const routes = [
  {
    path:'/',
    redirect:'/login',
    component:LoginView
  },
  {
    path:'/login',
    name:'login',
    meta: {title: "登录"},    
    component: () => import('@/views/LoginView.vue')
  },
  {
    path:'/',
    redirect:'/home',
    meta: {title: "管理页面"},    
    component: () => import('@/layout/Layout.vue'),
    children:[
      {
        path:'/home',
        name:'home',
        component: () => import('@/views/HomeView.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
