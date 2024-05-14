<template>
  <li class="hs-accordion " id="register-accordion">
    <button type="button"
      class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-100 whitespace-nowrap">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>



      İptal Edilen Siparişler

      <svg class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 "
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>

      <svg class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 " width="16"
        height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor"
          stroke-width="2" stroke-linecap="round"></path>
      </svg>
    </button>

    <div id="account-accordion"
      class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
      <ul class="pt-2 ps-2">
        <li v-for="(status, code) in statusMap" :key="code">
          <router-link :to="`${code}`"
            class="flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-200">
            {{ status }}
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>

const statusMap = {
  '/dashboard/musteri/orders-reject': 'Reddedilen Siparişler',
  '/dashboard/musteri/orders-cancel-pending': 'İptal Bekleyen Siparişler',
  '/dashboard/musteri/orders-cancel': 'İptal Edilen Siparişler',
};
</script>

<style scoped></style>