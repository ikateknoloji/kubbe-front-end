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

    <CoverContent title="Sipariş Ürün Resimleri" v-if="ordersData.order.production_images.length > 0">
      <div class=" grid grid-cols-12 gap-4 ">
        <div v-for="image in ordersData.order.production_images" :key="image.id" class="col-span-4">
          <img :src="getFullUrl(image.file_path)" :alt="image.type" class="max-w-xs" />
        </div>
      </div>
    </CoverContent>

    <CoverContent title="Tasarım Güncelle">
      <TasarimGuncelle :orderId="ordersData.order.id" />
    </CoverContent>

    <div class="p-2 md:p-4">
      <button @click="orderCompleted(ordersData.order.id)" target="_blank"
        class="block w-full bg-teal-500 rounded text-white text-center px-4 py-2 hover:bg-teal-700 focus:outline-none focus:shadow-outline-blue active:bg-teal-800">
        Üretime Ekle
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute } from 'vue-router';

import CoverContent from '@/components/CoverContent.vue';
import Dealer from '@/components/Desinger/Dealer.vue';

import OrderTable from '@/components/Desinger/OrderTable.vue';
import TableColm from '@/components/Desinger/TableColm.vue';
import OrderTableItem from '@/components/Desinger/OrderTableItem.vue';

import OrderLogos from '@/components/Admin/OrderLogos.vue';
import OrderInfo from '@/components/Desinger/OrderInfo.vue';
import TasarimGuncelle from '@/components/Desinger/TasarimGuncelle.vue';


const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;
const getFullUrl = (logoUrl) => { return `${baseURL}${logoUrl}` };

const route = useRoute();

const ordersData = ref(null);

const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet'
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

const orderCompleted = async (id) => {
  try {
    const response = await apiClient.post(`/mark-completed-orders/${id}`);

    router.go(0);
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped></style>