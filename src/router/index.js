import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/bbs/Index'
import Userinfo from '@/views/bbs/Userinfo'
import Post from '@/views/bbs/Post'
// import Post from "@/components/Post"
import responseTime from '@/views/bbs/responseTime'
import publishedTime from '@/views/bbs/publishedTime'
import SendAnImageArticle from '@/views/bbs/SendAnImageArticle'
import bbs from '@/views/Layout/index'
import demo from "@/components/demo/zipmp4"

Vue.use(VueRouter)

const routes = [
  {
    path: "/sendAnImageArticle",
    component: SendAnImageArticle
  },

  {
    path: "/demo",
    component: demo
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 首页路由
  {
    path: '/bbs',
    name: 'bbs',
    component: bbs,
    redirect: '/bbs/index/responseTime',
    children: [
      { path: 'post', component: Post, props: true },
      {
        path: 'index',
        name: 'Index',
        component: Index,
        children: [
          { path: 'responseTime', component: responseTime, props: true },
          { path: 'publishedTime', component: publishedTime, props: true }
        ]
      }
    ]
  }, ,
  // 个人信息
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: Userinfo
  }, // 帖子

  // {
  //   path: '/images/drawable-mdpi/:id',
  //   redirect: '/src/images/drawable-mdpi/:id'
  // }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, form, next) => {
  // console.log(to.path);
  if (to.path == "/bbs/index/responseTime" || to.path == "/userinfo" || to.path == "/demo" || to.path == "/sendAnImageArticle") {
    const token = localStorage.getItem("token")
    if (token) {
      next();
    } else {
      localStorage.removeItem("token")
      next("/")
    }
  } else {
    next()
  }
  // next()
})

export default router
