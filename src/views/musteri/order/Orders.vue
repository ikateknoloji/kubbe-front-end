+<template>
  <div v-if="allOrders">
    <PageTitle text="Tüm Siparişlerin Listesi" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>


</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Customer/Cards.vue';
import Pagination from '@/components/Admin/Pagination.vue';

import { useCustomerAllOrdersStore } from '@/stores/musteri/useCustomerAllOrder.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const store = useCustomerAllOrdersStore()

const { allOrders } = storeToRefs(store)

onMounted(() => {
  store.fetchAllOrders();
})
</script>

<style scoped></style>
q