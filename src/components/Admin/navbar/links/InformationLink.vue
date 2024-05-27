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
        <router-link to="/dashboard/admin/notifications"
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
        <router-link to="/dashboard/admin/musteri"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
          </svg>
          Müşteri Bilgileri
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/admin/uretici"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          Üretici Bilgileri
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/admin/user"
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
        <router-link to="/dashboard/admin/orders-delayed"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          Beklemedeki Siparişler
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/admin/orders-invoices"
          class="flex items-center  py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
          </svg>
          Fatura Ekle
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAdminNotificationsStore } from '@/stores/adminNotification.js';

const store = useAdminNotificationsStore();

const { count } = storeToRefs(store)
</script>

<style scoped></style>