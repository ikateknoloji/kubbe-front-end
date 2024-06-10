<template>
  <div class="min-h-fit my-10">
    <PdfComponent :src="order?.formatted_order_images['P']?.image_url" />
    <br>
    <div class="max-w-64 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
      <button type="button" @click="store.verifyPayment(order.id)"
        class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white     hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ">
        Ödeme Onay
      </button>
      <RejectPayment :order="order" />
    </div>
  </div>
</template>

<script setup>
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



</script>
