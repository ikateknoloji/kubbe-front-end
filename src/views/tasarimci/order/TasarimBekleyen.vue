<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <PageTitle text="Tasarım Bekleyen Siparişler" />
    <Cards :order="ordersByStatus.data" />
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Tasarım Bekleyen Sipariş Bulunmamaktadır.</p>
    </div>
  </div>


</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Desinger/Cards.vue';
import Pagination from '@/components/Desinger/Pagination.vue';

import { storeToRefs } from 'pinia'

import { useDesinger } from '@/stores/tasarimci/useDesinger.js';
import { onMounted } from 'vue';

const store = useDesinger();
const { ordersByStatus } = storeToRefs(store)


onMounted(() => {
  store.fetchOrdersByStatus();
})
</script>

<style scoped></style>
