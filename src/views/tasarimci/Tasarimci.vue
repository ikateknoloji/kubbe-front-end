<template>
  <div class="2xl:grid 2xl:grid-cols-12 gap-4 ">
    <div class="2xl:col-span-2  mt-1 transition-all duration-300 ease-out z-50" :class="{
      'fixed': isFixed || isTranslate,
      'top-32': isFixed || isTranslate,
      'left-0': isFixed || isTranslate,
      '-translate-x-full': isTranslate,
      'translate-x-0': !isTranslate
    }">
      <div class="relative">
        <div @click="toggleSidebar()">
          <NavigationToggle />
        </div>
        <Sidebar />
      </div>
    </div>
    <div class="transition-all duration-300 ease-out px-1 md:px-8 lg:px-16 py-5 " :class="{
      'col-span-12': isTranslate,
      'col-span-10': !isTranslate
    }">
      <ol class="flex items-center whitespace-nowrap ml-12 mb-5" aria-label="Breadcrumb">
        <li class="inline-flex items-center" v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link
            class="flex items-center md:text-md text-xs text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500"
            :to="{ path: crumb.path }">
            {{ crumb.text }}
          </router-link>
          <svg v-if="index !== breadcrumbs.length - 1"
            class="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-600 mx-2" width="16" height="16"
            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round" />
          </svg>
        </li>
      </ol>
      <Search />
      <Geridon />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Geridon from '@/components/GeriDon.vue';
import Sidebar from '@/components/Desinger/navbar/Sidebar.vue';
import NavigationToggle from '@/components/Desinger/navbar/NavigationToggle.vue';
import Search from '@/components/Desinger/search/Search.vue';
import { usetasarimciNotificationsStore } from '@/stores/tasarimciNotification.js';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar

const route = useRoute();
const router = useRouter();
const echo = inject('echo')

const store = usetasarimciNotificationsStore();


// Sidebar'ın durumunu kontrol etmek için reactive bir state
const isTranslate = ref(false);
// Ekran genişliğini izlemek için bir ref oluşturun
const screenWidth = ref(null);
// Sidebar'ın ekran genişliğini kontrol etmek için isFixed değerinin bir ref oluşturun
const isFixed = ref(false);

const toggleSidebar = () => {
  isTranslate.value = !isTranslate.value;
};


onMounted(() => {

  store.fetchTasarimciNotifications();

  if (echo) {
    echo.private('designer-notifications')
      .subscribed(() => {
      })
      .listen('.designer-notifications', (e) => {
        let adminNotification = e.message;
        adminNotification.message = JSON.parse(e.message.message);
        store.addNotification(adminNotification);
        // Yeni bildirim için toast mesajı göster
        toast.info(` ${adminNotification.message.title}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  } else {
    console.error('Echo is not available');
  }

  // Bileşen monte edildikten sonra ekran genişliğini kontrol edin
  screenWidth.value = window.innerWidth;
  isFixed.value = screenWidth.value < 1536;

  // Pencere yeniden boyutlandırıldığında ekran genişliğini ve isFixed değerini güncelleyin
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
    isFixed.value = screenWidth.value < 1536;
  });
});


// isFixed'ın değeri değiştiğinde isTranslate'i güncelleyen bir watcher
watch(isFixed, (newVal) => {
  if (newVal) {
    // Eğer isFixed true ise, isTranslate'i false yap
    isTranslate.value = true;
  }
});


const breadcrumbs = computed(() => {
  let matchedRoutes = route.matched;
  let breadcrumbs = matchedRoutes.map((routeRecord) => {
    return {
      text: routeRecord.meta.breadcrumb,
      path: router.resolve(routeRecord).href
    };
  });
  return breadcrumbs.filter(crumb => crumb.text); // Sadece 'breadcrumb' metası olan rotaları filtreleyin
});

</script>
<style scoped></style>