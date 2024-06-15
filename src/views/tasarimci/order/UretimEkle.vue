<template>
  <div v-if="ordersByStatus">
    <CoverContent title="Müşteri Bilgileri">
      <div v-for="(order, i) in ordersByStatus" :key="i">
        <OrderTable>
          <TableColm :columns="columnsData2" />
          <TableInfo :data="order.order_items" :order="order" />
        </OrderTable>
        <OrderTable>
          <TableColm :columns="columnsData" />
          <OrderTableItemOrder :data="order.order_items" :order="order" />
        </OrderTable>
      </div>
    </CoverContent>
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Üretim Gidecek Sipariş Bulunmamaktadır.</p>
    </div>
  </div>


</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';


import { storeToRefs } from 'pinia'

import { useDesingerProductionUpdate } from '@/stores/tasarimci/useUretimUpdate.js';
import { onMounted } from 'vue';
import TableColm from '@/components/Desinger/TableColm.vue';
import OrderTableItemOrder from '@/components/Desinger/OrderTableItemOrder.vue';
import OrderTable from '@/components/Desinger/OrderTable.vue';
import TableInfo from '@/components/Desinger/TableInfo.vue';

const store = useDesingerProductionUpdate();
const { ordersByStatus } = storeToRefs(store)

const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
];

const columnsData2 = [
  '#',
  'Ürün Adı',
  'Sipariş Durumu',
  'sipariş notu',
];



onMounted(() => {
  store.fetchOrdersByStatus();
})
</script>

<style scoped></style>
