import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/giris',
      name: 'giris',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/sifremi-unuttum',
      name: 'sifremi unuttum',
      component: () => import('../views/ForgotPassword.vue')
    }
  ]
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});

export default router
