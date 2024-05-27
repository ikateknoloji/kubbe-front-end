<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <PageTitle text="Kargo Bekleyen Siparişler" />
    <OneCard :order="ordersByStatus.data" />
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import OneCard from '@/components/Kurye/OneCard.vue';
import Pagination from '@/components/Customer/Pagination.vue';

import { storeToRefs } from 'pinia'

import { useKurye } from '@/stores/kurye/useKurye.js';
import { onMounted } from 'vue';

const store = useKurye();
const { ordersByStatus } = storeToRefs(store)


onMounted(() => {
  store.fetchOrdersByStatus();
})
</script>

<style scoped></style>
