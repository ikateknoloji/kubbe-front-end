<template>
  <div v-if="ordersData">

    <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70"> {{
      ordersData.order.order_name }}
    </div>

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

    <OrderNote v-if="ordersData.order.note" :note="ordersData.order.note" />


    <CoverContent title="Tasarım Güncelle">
      <TasarimGuncelle :orderId="ordersData.order.id" />
    </CoverContent>

    <div class="p-2 md:p-4">
      <SelectComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar

import SelectComponent from '@/components/Desinger/SelectComponent.vue';
import CoverContent from '@/components/CoverContent.vue';
import Dealer from '@/components/Desinger/Dealer.vue';

import OrderTable from '@/components/Desinger/OrderTable.vue';
import TableColm from '@/components/Desinger/TableColm.vue';
import OrderTableItem from '@/components/Desinger/OrderTableItem.vue';

import OrderLogos from '@/components/Admin/OrderLogos.vue';
import OrderInfo from '@/components/Desinger/OrderInfo.vue';
import TasarimGuncelle from '@/components/Desinger/TasarimGuncelle.vue';
import OrderNote from '@/components/Admin/OrderNote.vue';


const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;
const getFullUrl = (logoUrl) => { return `${baseURL}${logoUrl}` };

const router = useRouter();

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

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          router.push(`/dashboard/tasarimci/uretim-bekleyen`); // Yönlendirme işlemini gerçekleştir
        }
      });

    } else if (response.data.error) {

      toast(response.data.error, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
      });
    }
  } catch (error) {
    console.error(error);
  }
};

</script>

<style scoped></style>