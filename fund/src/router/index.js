import Vue from "vue"
import VueRouter from "vue-router"
import AdminHome from "../views/admin/Home"
import AdminIndex from "../views/admin/Index"
import Login from "@/views/Login"
import User from "@/views/admin/User"
import Activity from "@/views/admin/Activity"
import ActivityDetail from '@/views/admin/ActivityDetail'
import Business from '@/views/admin/Business'
import Notice from '@/views/admin/Notice'


Vue.use(VueRouter);

export default new VueRouter({
  routes:[
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
          path: "/admin/activity_detail",
          name: "activity_detail",
          component: ActivityDetail
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
})