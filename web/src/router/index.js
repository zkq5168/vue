import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
