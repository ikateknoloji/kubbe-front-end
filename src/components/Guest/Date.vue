<template>
  <div class="max-w-xl border mb-6 mt-5 col-span-6">
    <div class="border-b p-2 text-[#333]  font-source text-[13px] md:text-[15px]">
      Sipariş Tarih Bilgisi
    </div>
    <div class="grid grid-cols-12 gap-4 p-4">
      <div class="col-span-6 flex flex-col space-y-4">
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Şipariş
          Tarihi </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">
          Başlama Tarihi </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Teslim
          Tarihi </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base"
          v-if="order.production_date">
          Üretim Tarihi
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs" v-if="order.delivery_date">
          Teslim Tarihi
        </div>
      </div>
      <div class="col-span-6 flex flex-col space-y-4">
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ formatDate(order.created_at) }}</p>
        <p class=" px-2 py-2 text-xs sm:text-sm md:text-base">{{ formatDate(order.production_start_date) }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ formatDate(order.estimated_production_date) }}</p>
        <p class=" px-2 py-2 text-xs sm:text-sm md:text-base" v-if="order.production_date">{{
          formatDate(order.production_date) }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base" v-if="order.delivery_date">{{
          formatDate(order.delivery_date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// `data` adlı bir props alanı tanımlayın
const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

// Tarih ve saat dönüştürme yöntemi
const formatDate = (value) => {
  if (value) {
    let date = new Date(value);
    let turkeyTime = new Date(date.getTime() + (3 * 60 * 60 * 1000));
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(turkeyTime);
  }
}

</script>

<style scoped></style>