<template>
  <li>
    <ul class="space-y-2">
      <li>
        <router-link to="/dashboard"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Yönetim Paneli
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/musteri/notifications"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 mr-3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
              </svg>
              Bildirimler
            </div>
            <div class="relative flex items-center justify-center mr-2">
              <span class="absolute w-8 h-8 p-2 text-xs rounded bg-red-500 text-white "></span>
              <span class="z-10 text-white">{{ count }}</span>
            </div>
          </div>
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/musteri/user"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Kullanıcı İşlemleri
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/musteri/orders-delayed"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          Beklemedeki Siparişler
        </router-link>
      </li>

    </ul>
  </li>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCustomerNotificationsStore } from '@/stores/customerNotification.js';

const store = useCustomerNotificationsStore();

const { count } = storeToRefs(store)

</script>


<style scoped></style>