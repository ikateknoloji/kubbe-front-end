<template>
  <div v-if="ordersData">
    <CoverContent title="Müşteri Bilgileri">
      <div class="grid grid-cols-12 gap-4 ">
        <div class="flex flex-col col-span-12 ">
          <Dealer :info="ordersData.order.customer" />
        </div>
        <div class="col-span-12 ">
          <OrderInfo :order="ordersData.order" />
        </div>
      </div>
    </CoverContent>

    <CoverContent title="Sipariş Sepeti">
      <div v-for="basket in ordersData.order.baskets" :key="basket.id">
        <OrderTable>
          <TableColm :columns="columnsData" />
          <OrderTableItem :data="basket.items" />
        </OrderTable>
        <div class="mx-4">
          <OrderLogos :logos="basket.logos" />
        </div>
      </div>
    </CoverContent>
    <CoverContent title="Tasarım Ekle">
      <TasarimEkle :orderId="ordersData.order.id" />
    </CoverContent>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute } from 'vue-router';

import CoverContent from '@/components/CoverContent.vue';
import Dealer from '@/components/Desinger/Dealer.vue';
import OrderLogos from '@/components/Desinger/OrderLogos.vue';

import OrderTable from '@/components/Desinger/OrderTable.vue';
import TableColm from '@/components/Desinger/TableColm.vue';
import OrderTableItem from '@/components/Desinger/OrderTableItem.vue';

import TasarimEkle from '@/components/Desinger/TasarimEkle.vue';
import OrderInfo from '@/components/Desinger/OrderInfo.vue';


const route = useRoute();

const ordersData = ref(null);

const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
];


const getOrder = async () => {
  try {
    const response = await apiClient.get(`/desinger/orders/${route.params.id}`);
    // Gelen veriyi reaktif değere atayın
    ordersData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  await getOrder();
});


</script>

<style scoped></style>