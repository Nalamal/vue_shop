import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/components/Login.vue') },
  { path: '/home', component: () => import('@/components/Home.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router