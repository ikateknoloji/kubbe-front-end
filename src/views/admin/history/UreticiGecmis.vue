<template>
  <div v-if="allOrders">
    <PageTitle text="Müşteri Sipariş Geçmişi" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>


</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Admin/Cards.vue';
import Pagination from '@/components/Admin/Pagination.vue';

import { useAllOrdersStore } from '@/stores/useAllOrdersStore.js'



const route = useRoute();

const store = useAllOrdersStore()

const { allOrders } = storeToRefs(store)

onMounted(() => {
  const id = route.params.id;
  store.fetchManufacturerHistoryOrders(id);
})
</script>

<style scoped></style>
