import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/components/Login.vue') },
  {
    path: '/home',
    component: () => import('@/components/Home.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/components/Welcome.vue') },
      { path: '/users', component: () => import('@/components/user/Users.vue') },
      { path: '/rights', component: () => import('@/components/power/Rights.vue') },
      { path: '/roles', component: () => import('@/components/power/Roles.vue') },
      { path: '/categories', component: () => import('@/components/goods/Cate.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
