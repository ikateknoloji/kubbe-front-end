+<template>
  <div v-if="allOrders?.data?.length > 0">
    <PageTitle text="Tüm Siparişlerin Listesi" />
    <Cards :order="allOrders.data" />
    <Pagination v-if="allOrders?.last_page > 1" :paginationData="allOrders" :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Bu Aşamda Bir Sipariş Bulunmamaktadır.</p>
    </div>
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