<template>
  <div class="w-full lg:max-w-2xl border mb-6 mt-10 col-span-12 lg:col-span-6">
    <div class="border-b p-2 text-[#333]  font-source text-[13px] md:text-[15px]">
      Sipariş Bilgileri
    </div>
    <div class="grid grid-cols-12 gap-4 px-2 py-4 md:p-4">
      <div class="col-span-4 md:col-span-3 flex flex-col space-y-4">
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Şipariş Kodu
        </div>
        <div v-if="order.invoice_type"
          class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Fatura Tipi
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Teklif Tutarı
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Durum
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Sipariş Tarihi
        </div>
      </div>
      <div class="col-span-8 md:col-span-9 flex flex-col space-y-4 md:space-y-4">
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ order.order_code }}</p>
        <p v-if="order.invoice_type" class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ order.invoice_type }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ order.offer_price }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ order.status }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ formatDate(order.created_at) }}</p>
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