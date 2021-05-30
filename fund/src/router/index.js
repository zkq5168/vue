import Vue from "vue"
import VueRouter from "vue-router"
import AdminHome from "../views/admin/Home"
import AdminIndex from "../views/admin/Index"
import Login from "@/views/Login"
import User from "@/views/admin/User"
import Activity from "@/views/admin/Activity"
import ActivityRule from '@/views/admin/ActivityRule'
import ActivityPeroid from "@/views/admin/ActivityPeroid"
import ActivityDetail from "@/views/admin/ActivityDetail"
import SpecialOffer from "@/views/admin/SpecialOffer"
import Trader from '@/views/admin/Trader'
import News from '@/views/admin/News'

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/admin",
      name: "adminHome",
      component: AdminHome,
      children: [
        {
          path: "/admin/index",
          name: "adminIndex",
          component: AdminIndex
        },
        {
          path: "/admin/user",
          name: "user",
          component: User
        },
        {
          path: "/admin/activity",
          name: "activity",
          component: Activity
        },
        {
          path: "/admin/activity/rule",
          name: "rule",
          component: ActivityRule
        },
        {
          path: "/admin/activity/peroid",
          name: "activityPeroid",
          component: ActivityPeroid
        },
        {
          path: "/admin/activity/detail",
          name: "activityDetail",
          component: ActivityDetail
        },
        {
          path: "/admin/special/offer",
          name: "specialOffer",
          component: SpecialOffer
        },
        {
          path: "/admin/trader",
          name: "trader",
          component: Trader
        },
        {
          path: "/admin/news",
          name: "news",
          component: News
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next)=>{
  if(to.path === '/login') return next();

  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
});

export default router;