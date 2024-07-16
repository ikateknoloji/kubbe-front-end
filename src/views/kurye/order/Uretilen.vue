<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <PageTitle text="Kargo Güncelle Siparişler" />
    <ThirdCard :order="ordersByStatus.data" />
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Teslim Edilmiş Bir Kargonuz Bulunmamaktadır.</p>
    </div>
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import ThirdCard from '@/components/Kurye/ThirdCard.vue';
import Pagination from '@/components/Customer/Pagination.vue';

import { storeToRefs } from 'pinia'

import { useUretim } from '@/stores/kurye/useUretim.js';
import { onMounted } from 'vue';

const store = useUretim();
const { ordersByStatus } = storeToRefs(store)


onMounted(() => {
  store.fetchOrdersByStatus();
})
</script>

<style scoped></style>
