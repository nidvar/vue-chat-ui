import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateBlog from '../views/CreateBlog.vue'
import BlogView from '../views/BlogView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path:'/create',
      name:'create',
      component: CreateBlog,
      meta: { requiresAuth: true }
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component: DashboardView
    },
    {
      path:'/blog/:id',
      name:'blog',
      component: BlogView
    }
  ],
})

export default router
