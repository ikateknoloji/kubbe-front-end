<template>
  <li class="hs-accordion " id="payment-accordion">

    <button type="button"
      class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>


      Ödemeler

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

    <div id="payment-accordion"
      class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
      <ul class="pt-2 ps-2">
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
  'DA': 'Ödeme Bekleyen ',
  'P': 'Ödeme Onayı Ver',
  'PA': 'Onaylanmış Ödemeler ',
};



</script>

<style scoped></style>