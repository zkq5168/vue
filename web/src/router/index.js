import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/views/Index'
import Discount from '@/views/Discount'
import SimpleHome from '@/views/SimpleHome'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Trader from '@/views/Trader'
import SignUp from '@/views/SignUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      }
    ]
  },
  {
    path: '/',
    name: 'simpleHome',
    component: SimpleHome,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/discount',
        name: 'discount',
        component: Discount
      },
      {
        path: '/trader',
        name: 'trader',
        component: Trader
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignUp
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
