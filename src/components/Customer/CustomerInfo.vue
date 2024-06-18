<template>
  <div class="w-full lg:max-w-lg border  py-3">
    <div class="border-b p-2 text-[#333]  font-source text-[13px] md:text-[15px]">
      Müşteri Bilgileri
    </div>
    <div class="grid grid-cols-12 gap-4 px-4 md:px-8 py-4 md:py-8">
      <div class="col-span-4 md:col-span-3 flex flex-col space-y-4">
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs   text-xs sm:text-sm md:text-base"> Ad Soyad
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs   text-xs sm:text-sm md:text-base">Telefon
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs   text-xs sm:text-sm md:text-base">Email </div>
      </div>
      <div class="col-span-8 md:col-span-9 flex flex-col space-y-4 md:space-y-4">
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ customer.name }} {{ customer.surname }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ customer.phone }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ customer.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// `data` adlı bir props alanı tanımlayın
const props = defineProps({
  customer: {
    type: Object,
    default: () => ({}),
  },
});

</script>

<style scoped></style>