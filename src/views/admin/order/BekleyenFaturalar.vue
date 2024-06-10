<template>
  <div v-if="allOrders?.data?.length > 0">
    <PageTitle text="Faturalandırma Bekleyen Siparişler" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Faturalandıralacak Siparişiniz Bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Admin/Cards.vue';
import Pagination from '@/components/Admin/Pagination.vue';

import { useAllOrdersStore } from '@/stores/useAllOrdersStore.js';
import { storeToRefs } from 'pinia'

const store = useAllOrdersStore();
const { allOrders } = storeToRefs(store)




onMounted(() => {
  store.fetchBillingOrders();
});

</script>

<style scoped></style>