<template>
  <li class="hs-accordion " id="register-accordion">
    <button type="button"
      class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
      </svg>

      Kullanıcı İşlemleri

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

    <div id="register-accordion"
      class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
      <ul class="pt-2 ps-2">
        <li v-for="(status, code) in statusMap" :key="code">
          <router-link :to="`/orders/${code}`"
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
  'OC': 'Müşteri Kaydı Oluştur',
  'DP': 'Üretici Kaydı Oluştur',
  'DA': 'Çalışan Kaydı Oluştur',
  'cc': 'Şifre Sıfırla',
  'cs': 'Şifre Değiştir',
};

</script>

<style scoped></style>