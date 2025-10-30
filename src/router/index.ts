import { createRouter, createWebHistory } from 'vue-router'
import { loggedIn } from '../globalState/state.ts'
import { auth } from '../tools/tools.ts'

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
            path: '/create',
            name: 'create',
            component: CreateBlog,
            meta: { requiresAuth: true },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView,
        },
        {
            path: '/blog/:id',
            name: 'blog',
            component: BlogView,
        },
    ],
});

router.beforeEach(async (to, from, next) => {
  // Only run auth if the route requires it
  if (to.meta.requiresAuth) {
    try {
      const response = await auth(router);

      if (response?.authenticated) {
        loggedIn.value = true;
        next(); // proceed to the route
      } else {
        loggedIn.value = false;
        next('/login'); // redirect to login if not authenticated
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      loggedIn.value = false;
      next('/login');
    }
  } else {
    // Public route — no auth check
    next();
  }
});

export default router
