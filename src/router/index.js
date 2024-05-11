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
      meta: { requiresAuth: true, breadcrumb: 'Dashboard' }, // Kimlik doğrulama gereksinimi ekleyin
      children: [
        {
          path: '',
          name: 'dahsboardIndex',
          component: () => import('../views/DashboardIndex.vue'),
        },
        {
          path: 'admin',
          name: 'admin',
          component: () => import('../views/admin/Admin.vue'),
          meta: { roles: 'admin', breadcrumb: 'Yönetici Paneli' }, // Yalnızca 'admin'  rolüne izin ver
          children: [
            {
              path: '',
              name: 'admin-page',
              component: () => import('@/views/admin/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('@/views/admin/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'orders-invoices',
              name: 'orders-invoices',
              component: () => import('@/views/admin/order/BekleyenFaturalar.vue'),
              meta: { breadcrumb: 'Bekleyen Faturalar' }
            },
            {
              path: 'orders/:status',
              name: 'order-status',
              component: () => import('@/views/admin/order/OrderStatusView.vue'),
              meta: { breadcrumb: 'Sipariş Durumu' }
            },
            {
              path: 'orders/:status/:id',
              name: 'order-detail',
              component: () => import('@/views/admin/order/OrderDetail.vue'),
              meta: { breadcrumb: 'Sipariş Detayı' }
            },
            {
              path: 'orders/:status/:id/edit',
              name: 'order-edit-detail',
              component: () => import('@/views/admin/edit/OrderEdit.vue'),
              meta: { breadcrumb: 'Siparişi Düzenle' }
            },
            {
              path: 'orders/:status/:id/request',
              name: 'order-request-detail',
              component: () => import('@/views/admin/order/OrderRequest.vue'),
              meta: { breadcrumb: 'Siparişi İptal İsteği' }
            },
            {
              path: 'orders-reject',
              name: 'orders-reject',
              component: () => import('@/views/admin/order-cancel/ReddedilenSiparisler.vue'),
              meta: { breadcrumb: 'Bekleyen Faturalar' }
            },
            {
              path: 'orders-cancel',
              name: 'orders-cancel',
              component: () => import('@/views/admin/order-cancel/IptalEdilenSiparisler.vue'),
              meta: { breadcrumb: 'Reddedilen Siparişler ' }
            },
            {
              path: 'orders-cancel-pending',
              name: 'orders-cancel-pending',
              component: () => import('@/views/admin/order-cancel/IptalBekleyenSiparisler.vue'),
              meta: { breadcrumb: 'İptal Bekleyen Siparişler' }
            },
            {
              path: 'orders-delayed',
              name: 'orders-delayed',
              component: () => import('@/views/admin/order/GecikenSiparisler.vue'),
              meta: { breadcrumb: 'Bekleyen Faturalar' }
            },
            {
              path: 'user',
              name: 'user-information',
              component: () => import('@/views/admin/Profile.vue'),
              meta: { breadcrumb: 'Kullanıcı Bilgileri' }
            },
            {
              path: 'uretici',
              name: 'manufacturer-information',
              component: () => import('@/views/admin/user/Uretici.vue'),
              meta: { breadcrumb: 'Üretici Bilgileri' }
            },
            {
              path: 'uretici-aktif/:id',
              name: 'manufacturer-active',
              component: () => import('@/views/admin/history/MusteriAktif.vue'),
              meta: { breadcrumb: 'Üretici Aktif Siparişler' }
            },
            {
              path: 'uretici-gecmis/:id',
              name: 'manufacturer-history',
              component: () => import('@/views/admin/history/MusteriGecmis.vue'),
              meta: { breadcrumb: 'Üretici Geçmiş Siparişler' }
            },
            {
              path: 'musteri',
              name: 'customer-information',
              component: () => import('@/views/admin/user/Musteri.vue'),
              meta: { breadcrumb: 'Üretici Bilgileri' }
            },
            {
              path: 'musteri-aktif/:id',
              name: 'customer-active',
              component: () => import('@/views/admin/history/MusteriAktif.vue'),
              meta: { breadcrumb: 'Müşteri Aktif Siparişler' }
            },
            {
              path: 'musteri-gecmis/:id',
              name: 'customer-history',
              component: () => import('@/views/admin/history/MusteriGecmis.vue'),
              meta: { breadcrumb: 'Müşteri Geçmiş Siparişler' }
            },
          ]
        },
        {
          path: 'musteri',
          name: 'musteri',
          component: () => import('../views/musteri/Musteri.vue'),
          meta: { roles: 'musteri' } // Yalnızca 'musteri' rolüne izin ver
        },
        {
          path: 'tasarimci',
          name: 'tasarimci',
          component: () => import('../views/tasarimci/Tasarimci.vue'),
          meta: { roles: 'tasarimci' } // Yalnızca 'tasarimci' rolüne izin ver
        },
        {
          path: 'kurye',
          name: 'kurye',
          component: () => import('../views/kurye/Kurye.vue'),
          meta: { roles: 'kurye' } // Yalnızca 'kurye' rolüne izin ver
        },
        {
          path: 'uretici',
          name: 'uretici',
          component: () => import('../views/uretici/Uretici.vue'),
          meta: { roles: 'uretici' } // Yalnızca 'uretici' rolüne izin ver
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  // Kullanıcının rollerini bir dizi olarak alın
  const userRoles = userStore.user?.roles.map(role => role.name) || [];

  // Rota için gerekli rolleri kontrol edin
  if (to.matched.some(record => record.meta.roles)) {
    const requiredRoles = Array.isArray(to.meta.roles) ? to.meta.roles : [to.meta.roles];

    // Kullanıcının rolleri içinde gerekli roller varsa, rotaya izin ver
    if (requiredRoles.some(requiredRole => userRoles.includes(requiredRole))) {
      next();
    } else {
      // Kullanıcının rolleri içinde gerekli roller yoksa, erişimi engelle
      next(false);
    }
  } else {
    // Rota için rol kontrolü gerekmiyorsa, rotaya izin ver
    next();
  }
});


export default router
