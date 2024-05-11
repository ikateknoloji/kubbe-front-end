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

import { useAllOrdersStore } from '@/stores/useAllOrdersStore.js';
import { storeToRefs } from 'pinia'

const store = useAllOrdersStore();
const { allOrders } = storeToRefs(store)




onMounted(() => {
  store.fetchDelayedOrders();
});

</script>

<style scoped></style>