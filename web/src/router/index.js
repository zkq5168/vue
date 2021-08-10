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
import News from '@/views/News'
import TraderInfo from '@/views/TraderInfo'
import DiscountInfo from '@/views/DiscountInfo'
import Comment from '@/views/Comment'
import Rank from '@/views/Rank'

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
      },
      {
        path: '/index/info',
        name: 'index',
        component: Index
      },
      {
        path: '/index/rule',
        name: 'index',
        component: Index
      },
      {
        path: '/index/signup',
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
        path: '/discountInfo/:id',
        name: 'discountInfo',
        component: DiscountInfo
      },
      {
        path: '/trader',
        name: 'trader',
        component: Trader
      },
      {
        path: '/traderInfo/:id',
        name: 'traderInfo',
        component: TraderInfo
      },
      {
        path: '/signup',
        name: 'signup',
        component: SignUp
      },
      {
        path: '/news/:id',
        name: 'news',
        component: News
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/rank',
        name: 'rank',
        component: Rank
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
