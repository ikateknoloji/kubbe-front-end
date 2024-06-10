<template>
  <div v-if="allOrders.data.length > 0">
    <PageTitle text="Geçiken Siparişler" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Geçiken Bir Sipariş Bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Manufacturer/Cards.vue';
import Pagination from '@/components/Manufacturer/Pagination.vue';

import { useUreticiAllOrdersStore } from '@/stores/uretici/useUreticiAllOrder.js';
import { storeToRefs } from 'pinia'

const store = useUreticiAllOrdersStore();
const { allOrders } = storeToRefs(store)




onMounted(() => {
  store.fetchDelayedOrders();
});

</script>

<style scoped></style>