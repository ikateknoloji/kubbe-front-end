<template>
  <li>
    <ul class="space-y-2">
      <li>
        <router-link to="/dashboard"
          class="flex items-center  py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Yönetim Paneli
        </router-link>
      </li>

      <li>
        <router-link to="/dashboard/tasarimci/notifications"
          class="flex items-center  py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
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
          class="flex items-center  py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-5 mr-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Kullanıcı İşlemleri
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/tasarimci/tasarim-bekleyen"
          class="flex items-center  py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"
            class="w-6 h-6 mr-2">
            <path
              d="M8.33333 35C7.41667 35 6.63222 34.6739 5.98 34.0217C5.32778 33.3694 5.00111 32.5844 5 31.6667V8.33333C5 7.41667 5.32667 6.63222 5.98 5.98C6.63333 5.32778 7.41778 5.00111 8.33333 5H31.6667C32.5833 5 33.3683 5.32667 34.0217 5.98C34.675 6.63333 35.0011 7.41778 35 8.33333V31.6667C35 32.5833 34.6739 33.3683 34.0217 34.0217C33.3694 34.675 32.5844 35.0011 31.6667 35H8.33333ZM8.33333 31.6667H31.6667V8.33333H8.33333V31.6667ZM10 28.3333H30L23.75 20L18.75 26.6667L15 21.6667L10 28.3333Z"
              fill="#3C4A5D" />
          </svg>
          Tasarım Bekleyen
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/tasarimci/tasarim-guncelle"
          class="flex items-center  py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"
            class="w-6 h-6 mr-2">
            <path
              d="M20.4001 6.56007C27.4601 6.56007 33.2601 11.7801 34.2401 18.5601H38.4001L31.4001 26.5601L24.4001 18.5601H29.0401C28.5927 16.6023 27.4947 14.854 25.9254 13.6008C24.3562 12.3476 22.4084 11.6634 20.4001 11.6601C17.5001 11.6601 14.9401 13.0801 13.3201 15.2201L9.9001 11.3201C11.2091 9.82318 12.8235 8.6239 14.6346 7.80287C16.4457 6.98183 18.4116 6.55807 20.4001 6.56007ZM19.6001 33.4401C12.5601 33.4401 6.7401 28.2201 5.7601 21.4401H1.6001L8.6001 13.4401C10.9401 16.1001 13.2601 18.7801 15.6001 21.4401H10.9601C11.4075 23.3979 12.5055 25.1461 14.0748 26.3993C15.644 27.6526 17.5918 28.3367 19.6001 28.3401C22.5001 28.3401 25.0601 26.9201 26.6801 24.7801L30.1001 28.6801C28.7923 30.1785 27.1782 31.3788 25.3668 32.2C23.5555 33.0211 21.5889 33.444 19.6001 33.4401Z"
              fill="#3C4A5D" />
          </svg>
          Tasarım Güncelle
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/tasarimci/uretim-bekleyen"
          class="flex items-center  py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg class="mr-2 text-slate-700 " xmlns="http://www.w3.org/2000/svg" width="21" height="21"
            viewBox="0 0 21 21" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M3.28125 2.95303H9.51562C9.69685 2.95303 9.84375 3.09992 9.84375 3.28115V9.51553C9.84375 9.69675 9.69685 9.84365 9.51562 9.84365H3.28125C3.10002 9.84365 2.95312 9.69675 2.95312 9.51553V3.28115C2.95312 3.09992 3.10002 2.95303 3.28125 2.95303ZM14.8541 2.4335L18.5664 6.14583C18.6945 6.27396 18.6945 6.4817 18.5664 6.60986L14.8541 10.3222C14.7259 10.4503 14.5182 10.4503 14.39 10.3222L10.6777 6.60984C10.5496 6.4817 10.5496 6.27396 10.6777 6.14581L14.3901 2.4335C14.5182 2.30537 14.7259 2.30537 14.8541 2.4335ZM3.28125 11.1562H9.51562C9.69685 11.1562 9.84375 11.303 9.84375 11.4843V17.7187C9.84375 17.8999 9.69685 18.0468 9.51562 18.0468H3.28125C3.10002 18.0468 2.95312 17.8999 2.95312 17.7187V11.4843C2.95312 11.303 3.10002 11.1562 3.28125 11.1562ZM11.4844 11.1562H17.7188C17.9 11.1562 18.0469 11.303 18.0469 11.4843V17.7187C18.0469 17.8999 17.9 18.0468 17.7188 18.0468H11.4844C11.3031 18.0468 11.1562 17.8999 11.1562 17.7187V11.4843C11.1562 11.303 11.3031 11.1562 11.4844 11.1562Z"
              fill="#444" />
          </svg>
          Üretim Bekleyen
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/tasarimci/uretimde-verilen"
          class="flex items-center  py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-300 ">
          <svg class="mr-2 text-slate-700 " xmlns="http://www.w3.org/2000/svg" width="21" height="21"
            viewBox="0 0 21 21" fill="none">
            <path
              d="M9.84375 1.23047L18.375 5.49609V16.1602L9.84375 20.4155L1.3125 16.1602V5.49609L9.84375 1.23047ZM16.2524 5.90625L9.84375 2.70703L7.37256 3.9375L13.7402 7.15723L16.2524 5.90625ZM9.84375 9.10547L12.2842 7.89551L5.90625 4.67578L3.43506 5.90625L9.84375 9.10547ZM2.625 6.97266V15.3398L9.1875 18.6211V10.2539L2.625 6.97266ZM10.5 18.6211L17.0625 15.3398V6.97266L10.5 10.2539V18.6211Z"
              fill="#090909" />
          </svg>
          Üretimde Verilen Siparişler
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usetasarimciNotificationsStore } from '@/stores/tasarimciNotification';

const store = usetasarimciNotificationsStore();

const { count } = storeToRefs(store)
</script>

<style scoped></style>