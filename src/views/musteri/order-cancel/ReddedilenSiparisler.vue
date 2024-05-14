<template>
  <div v-if="allOrders">
    <PageTitle text="Reddedilen Siparişler" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>


</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Customer/Cards.vue';
import Pagination from '@/components/Customer/Pagination.vue';

import { useCustomerAllOrdersStore } from '@/stores/musteri/useCustomerAllOrder.js'



const route = useRoute();

const store = useCustomerAllOrdersStore()

const { allOrders } = storeToRefs(store)

onMounted(() => {
  const id = route.params.id;
  store.fetchRejectedStatusOrders('R');
})
</script>

<style scoped></style>
