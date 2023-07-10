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
      { path: '/users', component: () => import('@/views/home/user/UserCpn.vue') }
      // { path: '/rights', component: () => import('@/views/home/power/Rights.vue') },
      // { path: '/roles', component: () => import('@/views/home/power/Roles.vue') },
      // { path: '/categories', component: () => import('@/views/home/goods/Cate.vue') },
      // { path: '/goods', component: () => import('@/views/home/goods/List.vue') },
      // { path: '/add', component: () => import('@/views/home/goods/Add.vue') },
      // { path: '/params', component: () => import('@/views/home/goods/Params.vue') },
      // { path: '/orders', component: () => import('@/views/home/order/Order.vue') },
      // { path: '/reports', component: () => import('@/views/home/report/Report.vue') }
    ]
  },
  { path: '/:pathMatch(.*)', component: () => import('@/components/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
