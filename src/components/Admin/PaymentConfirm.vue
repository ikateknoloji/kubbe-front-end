<template>
  <div class="min-h-fit my-10">
    <PdfComponent v-if="state.order?.formatted_order_images['P']?.image_url"
      :src="state.order?.formatted_order_images['P']?.image_url" />
    <br>
    <div v-if="order" class="max-w-3xl bg-blue-300/10 px-10 py-5 flex justify-between mb-5">
      <p>Tutar : {{ order.offer_price }}</p>
      <p>Ödenen Tutar : {{ state.paidAmount }}</p>
      <p>Kalan Tutar : {{ order.offer_price - state.paidAmount }}</p>
    </div>
    <div
      class="max-w-3xl flex-col block xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0 border p-5 rounded-lg mb-10 ">
      <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
        <div class="text-left">
          <div class="flex items-center">
            <div class="font-medium">Sipariş Adı</div>
            <div
              class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              Gerekli
            </div>
          </div>
          <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen bir şipariş adı oluşturun. Bu
            bilgiler gereklidir.</div>
        </div>
      </label>
      <input type="number" v-model="state.paidAmount" placeholder="Ödenen Tutar"
        class="w-full md:w-fit py-3 px-4 border rounded-lg text-sm" />
    </div>
    <div class="max-w-64 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
      <button type="button" @click="verifyPayment(order.id)"
        class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Ödeme Onay
      </button>
      <RejectPayment :order="state.order" />
    </div>
  </div>

</template>

<script setup>
import { reactive } from 'vue';
import { useMangeOrderStore } from '@/stores/orderManage.js';

import PdfComponent from '@/components/Admin/PdfComponent.vue';
import RejectPayment from '@/components/Admin/reject/RejectPayment.vue';

const store = useMangeOrderStore();

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

// Reaktif bir nesne oluşturuyoruz
const state = reactive({
  paidAmount: 0
});

// Ödeme doğrulama fonksiyonunu güncelle
const verifyPayment = async (id) => {
  try {
    await store.verifyPayment(id, state.paidAmount);
    // İşlem başarılı olduğunda değerleri sıfırla
    state.paidAmount = 0;
  } catch (error) {
    console.error(error);
  }
};

</script>
