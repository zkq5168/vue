import Vue from "vue"
import VueRouter from "vue-router"
import AdminHome from "../views/admin/Home"
import AdminIndex from "../views/admin/Index"
import Login from "@/views/Login"
import User from "@/views/admin/User"
import Activity from "@/views/admin/Activity"
import ActivityPeroid from "@/views/admin/ActivityPeroid"
import ActivityDetail from "@/views/admin/ActivityDetail"
import SpecialOffer from "@/views/admin/SpecialOffer"
import Business from '@/views/admin/Business'
import Notice from '@/views/admin/Notice'

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
          path: "/admin/business",
          name: "business",
          component: Business
        },
        {
          path: "/admin/notice",
          name: "notice",
          component: Notice
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