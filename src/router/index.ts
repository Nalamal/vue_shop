import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/login/LoginView.vue') },
  {
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/views/home/welcome/WelcomeCpn.vue') },
      { path: '/users', component: () => import('@/views/home/user/UserCpn.vue') },
      { path: '/rights', component: () => import('@/views/home/power/Rights.vue') },
      { path: '/roles', component: () => import('@/views/home/power/Roles.vue') },
      { path: '/categories', component: () => import('@/views/home/goods/Cate.vue') },
      { path: '/goods', component: () => import('@/views/home/goods/List.vue') },
      { path: '/add', component: () => import('@/views/home/goods/Add.vue') },
      { path: '/params', component: () => import('@/views/home/goods/Params.vue') },
      { path: '/orders', component: () => import('@/views/home/order/OrderCpn.vue') },
      { path: '/reports', component: () => import('@/views/home/report/Report.vue') }
    ]
  },
  // 未匹配到的路由
  { path: '/:pathMatch(.*)', component: () => import('@/views/not-found/NotFoundView.vue') }
]

// 创建路由实例对象
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next() 放行 next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
