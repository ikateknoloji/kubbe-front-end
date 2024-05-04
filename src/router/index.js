import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Pinia store'unuzu import edin
import { useUserStore } from '../stores/user.js';
import apiClient from '../api/apiClient';

const getUserRole = (roleName) => {
  const userStore = useUserStore();

  // Kullanıcının rollerini alın ve istenen role sahip olup olmadığını kontrol edin
  const hasRole = userStore.user.roles.some(role => role.name === roleName);

  // İstenen role sahipse true, değilse false döndürün
  return hasRole;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { guestOnly: true } // Sadece giriş yapmış kullanıcılar için
    },
    {
      path: '/giris',
      name: 'giris',
      component: () => import('../views/Login.vue'),
      meta: { guestOnly: true } // Sadece giriş yapmış kullanıcılar için
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }, // Kimlik doğrulama gereksinimi ekleyin
      children: [
        {
          path: 'admin',
          name: 'admin',
          component: () => import('../views/admin/Admin.vue'),
          meta: { roles: ['admin'] } // Yalnızca 'admin'  rolüne izin ver
        },
        {
          path: 'musteri',
          name: 'musteri',
          component: () => import('../views/musteri/Musteri.vue'),
          meta: { roles: ['musteri'] } // Yalnızca 'musteri' rolüne izin ver
        },
        {
          path: 'tasarimci',
          name: 'tasarimci',
          component: () => import('../views/tasarimci/Tasarimci.vue'),
          meta: { roles: ['tasarimci'] } // Yalnızca 'tasarimci' rolüne izin ver
        },
        // Diğer uygulamalar için rotalar...
        {
          path: 'kurye',
          name: 'kurye',
          component: () => import('../views/kurye/Kurye.vue'),
          meta: { roles: ['kurye'] } // Yalnızca 'kurye' rolüne izin ver
        },
        {
          path: 'uretici',
          name: 'uretici',
          component: () => import('../views/uretici/Uretici.vue'),
          meta: { roles: ['uretici'] } // Yalnızca 'uretici' rolüne izin ver
        },
        // Diğer alt rotalar...
      ]
    },
    {
      path: '/sifremi-unuttum',
      name: 'sifremi unuttum',
      component: () => import('../views/ForgotPassword.vue'),
      meta: { guestOnly: true } // Sadece giriş yapmış kullanıcılar için
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Korumalı rotaya erişim gerektiğinde token doğrulaması yapın
    apiClient.get('/validate-token')
      .then(() => {
        // Token geçerliyse, istenen rotaya izin ver
        next();
      })
      .catch(() => {
        const store = useUserStore();
        store.clearUserData();
        // Token geçersizse veya bir hata oluşursa, oturum açma sayfasına yönlendir
        next({ path: '/giris' });
      });
  } else {
    // Rota korumalı değilse, doğrudan geçiş yap
    next();
  }
});


router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresRole)) {
    // Fonksiyona istenen rolü parametre olarak geçirin
    const hasRole = getUserRole(to.meta.requiresRole);
    if (hasRole) {
      next();
    } else {
      next({ path: '/login' }); // Uygun olmayan rol için giriş sayfasına yönlendir
    }
  } else {
    next(); // Meta alanı gerektirmeyen rotalar için doğrudan geçiş yap
  }
});

router.beforeEach((to, from, next) => {
  // localStorage'dan 'encryptedToken' alın
  const encryptedToken = localStorage.getItem('encryptedToken');

  if (to.matched.some(record => record.meta.guestOnly)) {
    if (encryptedToken) {
      // Token varsa ve rota 'guestOnly' olarak işaretlenmişse, dashboard'a yönlendir
      next({ path: '/dashboard' });
    } else {
      // Token yoksa, hiçbir yere yönlendirme yapma
      next();
    }
  } else {
    // Diğer durumlarda, rotaya izin ver
    next();
  }
});

export default router
