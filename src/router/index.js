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
              path: 'notifications',
              name: 'admin-notifications',
              component: () => import('@/views/admin/Notification.vue'),
              meta: { breadcrumb: 'Bildirimler' }
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
              meta: { breadcrumb: 'Fatura Bekleyen Siparişler' }
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
              meta: { breadcrumb: 'Reddedilen Siparişler' }
            },
            {
              path: 'orders-cancel',
              name: 'orders-cancel',
              component: () => import('@/views/admin/order-cancel/IptalEdilenSiparisler.vue'),
              meta: { breadcrumb: 'İptal Edilen Siparişler ' }
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
              component: () => import('@/views/admin/history/UreticiAktif.vue'),
              meta: { breadcrumb: 'Üretici Aktif Siparişler' }
            },
            {
              path: 'uretici-gecmis/:id',
              name: 'manufacturer-history',
              component: () => import('@/views/admin/history/UreticiGecmis.vue'),
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
            {
              path: 'search-results',
              name: 'search-results',
              component: () => import('@/views/admin/search/SearchResults.vue'),
              meta: { breadcrumb: 'Arama Sonuçları' }
            }
          ]
        },
        {
          path: 'musteri',
          name: 'musteri',
          component: () => import('../views/musteri/Musteri.vue'),
          meta: { roles: 'musteri' }, // Yalnızca 'musteri' rolüne izin ver
          children: [
            {
              path: '',
              name: 'customer-page',
              component: () => import('@/views/musteri/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'notifications',
              name: 'customer-notifications',
              component: () => import('@/views/musteri/Notification.vue'),
              meta: { breadcrumb: 'Bildirimler' }
            },
            {
              path: 'user',
              name: 'musteri-user-information',
              component: () => import('@/views/musteri/Profile.vue'),
              meta: { breadcrumb: 'Kullanıcı Bilgileri' }
            },
            {
              path: 'order-create',
              name: 'musteri-order-create',
              component: () => import('@/views/musteri/create/OrderCreate.vue'),
              meta: { breadcrumb: 'Sipariş Oluştur' }
            },
            {
              path: 'order-item-create',
              name: 'musteri-order-create-item',
              component: () => import('@/views/musteri/create/OrderCreateItem.vue'),
              meta: { breadcrumb: 'Şipariş Sepeti' }
            },
            {
              path: 'orders',
              name: 'musteri-orders',
              component: () => import('@/views/musteri/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'orders-delayed',
              name: 'customer-orders-delayed',
              component: () => import('@/views/musteri/order/GecikenSiparisler.vue'),
              meta: { breadcrumb: 'Bekleyen Faturalar' }
            },
            {
              path: 'orders/:status',
              name: 'musteri-order-status',
              component: () => import('@/views/musteri/order/OrderStatus.vue'),
              meta: { breadcrumb: 'Sipariş Durumu' }
            },
            {
              path: 'orders/:status/:id',
              name: 'musteri-order-detail',
              component: () => import('@/views/musteri/order/OrderDetail.vue'),
              meta: { breadcrumb: 'Sipariş Detayı' }
            },
            {
              path: 'orders/:status/:id/edit',
              name: 'musteri-order-edit',
              component: () => import('@/views/musteri/edit/OrderEdit.vue'),
              meta: { breadcrumb: 'Siparişi Düzenle' }
            },
            {
              path: 'orders/:status/:id/request',
              name: 'musteri-order-edit-detail',
              component: () => import('@/views/musteri/order/OrderRequest.vue'),
              meta: { breadcrumb: 'Siparişi Düzenle' }
            },
            {
              path: 'orders-reject',
              name: 'musteri-orders-reject',
              component: () => import('@/views/musteri/order-cancel/ReddedilenSiparisler.vue'),
              meta: { breadcrumb: 'Reddedilen Siparişler' }
            },
            {
              path: 'orders-cancel',
              name: 'musteri-orders-cancel',
              component: () => import('@/views/musteri/order-cancel/IptalEdilenSiparisler.vue'),
              meta: { breadcrumb: 'İptal Edilen Siparişler ' }
            },
            {
              path: 'orders-cancel-pending',
              name: 'musteri-orders-cancel-pending',
              component: () => import('@/views/musteri/order-cancel/IptalBekleyenSiparisler.vue'),
              meta: { breadcrumb: 'İptal Bekleyen Siparişler' }
            },
            {
              path: 'search-results',
              name: 'customer-search-results',
              component: () => import('@/views/musteri/search/SearchResults.vue'),
              meta: { breadcrumb: 'Arama Sonuçları' }
            }
          ]
        },
        {
          path: 'uretici',
          name: 'uretici',
          component: () => import('../views/uretici/Uretici.vue'),
          meta: { roles: 'uretici' }, // Yalnızca 'uretici' rolüne izin ver
          children: [
            {
              path: '',
              name: 'uretici-page',
              component: () => import('@/views/uretici/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'notifications',
              name: 'uretici-notifications',
              component: () => import('@/views/uretici/Notification.vue'),
              meta: { breadcrumb: 'Bildirimler' }
            },
            {
              path: 'user',
              name: 'uretici-user-information',
              component: () => import('@/views/uretici/Profile.vue'),
              meta: { breadcrumb: 'Kullanıcı Bilgileri' }
            },
            {
              path: 'orders',
              name: 'uretici-orders',
              component: () => import('@/views/uretici/order/Orders.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'orders/:status',
              name: 'uretici-order-status',
              component: () => import('@/views/uretici/order/OrderStatus.vue'),
              meta: { breadcrumb: 'Sipariş Durumu' }
            },
            {
              path: 'orders/:status/:id',
              name: 'uretici-order-detail',
              component: () => import('@/views/uretici/order/OrderDetail.vue'),
              meta: { breadcrumb: 'Sipariş Detayı' }
            },
            {
              path: 'orders-delayed',
              name: 'uretici-orders-delayed',
              component: () => import('@/views/uretici/order/GecikenSiparisler.vue'),
              meta: { breadcrumb: 'Geçikmiş Siparişler' }
            },
            {
              path: 'search-results',
              name: 'manufacturer-search-results',
              component: () => import('@/views/uretici/search/SearchResults.vue'),
              meta: { breadcrumb: 'Arama Sonuçları' }
            }
          ]
        },
        {
          path: 'tasarimci',
          name: 'tasarimci',
          component: () => import('../views/tasarimci/Tasarimci.vue'),
          meta: { roles: 'tasarimci' }, // Yalnızca 'uretici' rolüne izin ver
          children: [
            {
              path: '',
              name: 'tasarimci-bekleyen',
              component: () => import('@/views/tasarimci/order/TasarimBekleyen.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'tasarim-bekleyen',
              name: 'tasarimci-bekleyen-add',
              component: () => import('@/views/tasarimci/order/TasarimBekleyen.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'tasarim-bekleyen/:id',
              name: 'tasarimci-ekle',
              component: () => import('@/views/tasarimci/order/TasarimEkle.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'tasarim-guncelle',
              name: 'tasarim-guncelle',
              component: () => import('@/views/tasarimci/order/TasarimGuncelle.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'tasarim-guncelle/:id',
              name: 'tasarim-guncelle-item',
              component: () => import('@/views/tasarimci/order/TasarimGuncelleItem.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'search-results',
              name: 'desinger-search-results',
              component: () => import('@/views/tasarimci/search/SearchResults.vue'),
              meta: { breadcrumb: 'Arama Sonuçları' }
            }
          ]
        },
        {
          path: 'kurye',
          name: 'kurye',
          component: () => import('@/views/kurye/Kurye.vue'),
          meta: { roles: 'kurye' }, // Yalnızca 'kurye' rolüne izin ver
          children: [
            {
              path: '',
              name: 'kargo',
              component: () => import('@/views/kurye/order/Kargo.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'notifications',
              name: 'kurye-notifications',
              component: () => import('@/views/kurye/Notification.vue'),
              meta: { breadcrumb: 'Bildirimler' }
            },
            {
              path: 'kargo-teslim',
              name: 'kargo-teslim',
              component: () => import('@/views/kurye/order/Kargo.vue'),
              meta: { breadcrumb: 'Kargo Teslim' }
            },
            {
              path: 'kargo-guncelle',
              name: 'kargo-güncelle',
              component: () => import('@/views/kurye/order/KargoGuncelle.vue'),
              meta: { breadcrumb: 'Kargo Aşaması' }
            },
            {
              path: 'kargo-kodu/:qrcode',
              name: 'kargo-qr-code',
              component: () => import('@/views/kurye/order-item/KargoQrCode.vue'),
              meta: { breadcrumb: 'Kargo QrCode' }
            },
            {
              path: 'kargo-teslim/:id',
              name: 'kargo-teslim-item',
              component: () => import('@/views/kurye/order/KargoEkle.vue'),
              meta: { breadcrumb: 'Sipariş' }
            },
            {
              path: 'kargo-guncelle/:id',
              name: 'kargo-güncelle-item',
              component: () => import('@/views/kurye/order/KargoGuncelleItem.vue'),
              meta: { breadcrumb: 'Siparişler' }
            },
            {
              path: 'user',
              name: 'kurye-kullaninici-bilgileri',
              component: () => import('@/views/kurye/Profile.vue'),
              meta: { breadcrumb: 'Kullanıcı Bilgileri' }
            },
            {
              path: 'search-results',
              name: 'courier-search-results',
              component: () => import('@/views/kurye/search/SearchResults.vue'),
              meta: { breadcrumb: 'Arama Sonuçları' }
            }
          ]
        },

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


router.beforeEach((to, from, next) => {
  // Kök rotaların başlıklarını bir obje içinde sakla
  const rootRouteTitles = {
    'admin': 'Yönetici Paneli',
    'musteri': 'Müşteri Paneli',
    'uretici': 'Üretici Paneli',
    'tasarimci': 'Tasarımcı Paneli',
    'kurye': 'Kurye Paneli'
  };

  // Mevcut rotanın kök rotasını bul
  let rootPath = to.matched.find(record => rootRouteTitles[record.name]);

  // Eğer kök rota bulunursa ve başlığı varsa
  if (rootPath && rootRouteTitles[rootPath.name]) {
    // Belge başlığını kök rotanın başlığı ile ayarla
    document.title = rootRouteTitles[rootPath.name];
  } else {
    // Kök rota değilse veya başlığı yoksa varsayılan başlığı kullan
    document.title = 'Dashboard';
  }
  next();
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
