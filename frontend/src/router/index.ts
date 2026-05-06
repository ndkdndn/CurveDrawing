import { createRouter, createWebHistory } from 'vue-router'
import DrawingView from '../views/DrawingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'drawing',
      component: DrawingView
    },
    {
      path: '/curves',
      name: 'curves',
      component: () => import('../views/CurveListView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    }
  ]
})

export default router
