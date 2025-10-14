import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Index.vue') },
    { path: '/profile', name: 'profile', component: () => import('@/views/Profile.vue') },
  ],
})
