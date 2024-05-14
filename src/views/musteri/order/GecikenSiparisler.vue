<template>
  <div v-if="allOrders">
    <PageTitle text="Geçiken Siparişler" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Admin/Cards.vue';
import Pagination from '@/components/Admin/Pagination.vue';

import { useCustomerAllOrdersStore } from '@/stores/musteri/useCustomerAllOrder.js';
import { storeToRefs } from 'pinia'

const store = useCustomerAllOrdersStore();
const { allOrders } = storeToRefs(store)




onMounted(() => {
  store.fetchDelayedOrders();
});

</script>

<style scoped></style>