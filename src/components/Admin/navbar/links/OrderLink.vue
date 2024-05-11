<template>
  <li class="hs-accordion" id="order-accordion">

    <button type="button"
      class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>

      Siparişler

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

    <div id="order-accordion"
      class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
      <ul class="pt-2 ps-2">
        <li>
          <router-link :to="`/dashboard/admin/`"
            class="flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-200">
            Tüm Siparişler
          </router-link>
        </li>
        <li v-for="(status, code) in statusMap" :key="code" class="relative">
          <router-link :to="`/dashboard/admin/orders/${code}`"
            class="flex items-center gap-x-3.5 py-3 pl-4 px-6 text-sm text-slate-700 rounded-lg hover:bg-gray-200">
            {{ status }}
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>

const statusMap = {
  'OC': 'Sipariş Talebleri',
  'DP': 'Tasarım Bekleyen',
  'DA': 'Ödeme Bekleyen',
  'P': 'Ödeme Onayı Ver',
  'PA': 'Üretici Seçimi Yap',
  'MS': 'Üretim Bekleyen',
  'PP': 'Üretim Aşamasında',
  'PR': 'Hazır Olan',
  'PD': 'Teslim Edilen',
};

const props = defineProps({
  statusCounts: Object
});

</script>

<style scoped></style>