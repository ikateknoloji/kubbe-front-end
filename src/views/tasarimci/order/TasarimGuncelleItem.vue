<template>
  <div v-if="ordersData">
    <CoverContent title="Müşteri Bilgileri">
      <div class="grid grid-cols-12 gap-4 ">
        <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
          <Dealer :info="ordersData.order.customer" />
          <OrderTable>
            <TableColm :columns="columnsData" />
            <OrderTableItem :data="ordersData.order.order_items" />
          </OrderTable>
        </div>
        <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
          <LogoComponent :order="ordersData.order" />
        </div>
      </div>
    </CoverContent>

    <ImageList v-if="ordersData.order">
      <SiparisLogo :url="ordersData.order" />
      <TasarimButton :url="ordersData.order" />
    </ImageList>

    <CoverContent title="Tasarım Güncelle">
      <TasarimGuncelle :orderId="ordersData.order.id" />
    </CoverContent>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute } from 'vue-router';

import CoverContent from '@/components/CoverContent.vue';
import Dealer from '@/components/Desinger/Dealer.vue';
import LogoComponent from '@/components/Desinger/LogoComponent.vue';

import OrderTable from '@/components/Desinger/OrderTable.vue';
import TableColm from '@/components/Desinger/TableColm.vue';
import OrderTableItem from '@/components/Desinger/OrderTableItem.vue';

import TasarimGuncelle from '@/components/Desinger/TasarimGuncelle.vue';

const route = useRoute();

const ordersData = ref(null);

const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
  'Birim Fiyatı'
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