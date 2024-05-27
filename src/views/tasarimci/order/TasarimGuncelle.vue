<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <PageTitle text="Tasarım Bekleyen Siparişler" />
    <SecondCard :order="ordersByStatus.data" />
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import SecondCard from '@/components/Desinger/SecondCard.vue';
import Pagination from '@/components/Desinger/Pagination.vue';

import { storeToRefs } from 'pinia'

import { useDesingerUpdate } from '@/stores/tasarimci/useDesingerUpdate.js';
import { onMounted } from 'vue';

const store = useDesingerUpdate();
const { ordersByStatus } = storeToRefs(store)


onMounted(() => {
  store.fetchOrdersByStatus();
})
</script>

<style scoped></style>
