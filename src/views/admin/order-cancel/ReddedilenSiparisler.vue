<template>
  <div v-if="allOrders?.data?.length > 0">
    <PageTitle text="Reddedilen Siparişler" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Reddedilen Sipariş Bulunmamaktadır.</p>
    </div>
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
  store.fetchRejectedStatusOrders('R');
})
</script>

<style scoped></style>
