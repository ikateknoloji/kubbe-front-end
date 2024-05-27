<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <PageTitle text="Kargo Güncelle Siparişler" />
    <SecondCard :order="ordersByStatus.data" />
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import SecondCard from '@/components/Kurye/SecondCard.vue';
import Pagination from '@/components/Customer/Pagination.vue';

import { storeToRefs } from 'pinia'

import { useKurye } from '@/stores/kurye/useKurye.js';
import { onMounted } from 'vue';

const store = useKurye();
const { ordersByStatus } = storeToRefs(store)


onMounted(() => {
  store.fetchOrdersByUpdate();
})
</script>

<style scoped></style>
