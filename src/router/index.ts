import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/slider'
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/admins',
      name: 'admins',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/leaderboards',
      name: 'leaderboards',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/photo-gallery',
      name: 'photo-gallery',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/video-gallery',
      name: 'video-gallery',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/slider',
      name: 'slider',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/SliderView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/SliderView.vue')
    },
  ]
})

export default router
