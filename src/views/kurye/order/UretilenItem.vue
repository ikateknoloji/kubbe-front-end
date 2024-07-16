<template>
  <div v-if="ordersData" class="font-poppins">

    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="ordersData.order.is_rejected === 'R'" :order="ordersData.order" />
      <CanceledOrder v-if="ordersData.order.is_rejected === 'C'" :order="ordersData.order" />
      <PendingCancellation v-if="ordersData.order.is_rejected === 'P'" :order="ordersData.order" />


      <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70">
        {{ ordersData.order.order_name }}
      </div>

      <CoverContent title="Müşteri Bilgileri">
        <div class="flex flex-wrap md:space-x-3">
          <Dealer :info="ordersData.order.customer" />
          <ManufacturerInfo :info="ordersData.order.manufacturer" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <OrderInfo :order="ordersData.order" />
          </div>
          <div class="col-span-12  lg:order-1 order-0">
            <div class="w-full flex flex-wrap items-center justify-between">
              <CustomerInfo :customer="ordersData.order.customer_info" />
            </div>
          </div>
        </div>
      </CoverContent>


      <ImageList v-if="ordersData.order">
        <TasarimButton :url="ordersData.order" />
        <UrunButton :url="ordersData.order" />
      </ImageList>

      <CoverContent title="Sipariş Sepeti">
        <div v-for="basket in ordersData.order.baskets" :key="basket.id">
          <OrderTable>
            <TableColm :columns="columnsData" />
            <OrderTableItem :data="basket.items" />
          </OrderTable>
          <OrderLogos :logos="basket.logos" />
        </div>
      </CoverContent>


      <OrderNote v-if="ordersData.order.note" :note="ordersData.order.note" />
      <UrunResmi :orderId="ordersData.order.id" />
    </div>

  </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';


import OrderTable from '@/components/Kurye/OrderTable.vue';
import TableColm from '@/components/Kurye/TableColm.vue';
import OrderTableItem from '@/components/Kurye/OrderTableItem.vue';

import OrderInfo from '@/components/Kurye/OrderInfo.vue';
import OrderLogos from '@/components/Kurye/OrderLogos.vue';

import CustomerInfo from '@/components/Admin/CustomerInfo.vue';
import Dealer from '@/components/Admin/Dealer.vue';



import OrderNote from '@/components/Admin/OrderNote.vue';
import ManufacturerInfo from '@/components/Admin/ManufacturerInfo.vue';
import ImageList from '@/components/Admin/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';

import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import UrunButton from '@/components/Admin/buttons/UrunButton.vue';
import UrunResmi from '@/components/Kurye/UrunResmi.vue';


const router = useRouter();
const route = useRoute();


const url = import.meta.env.VITE_APP_BASE_URL_KURYE;

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
    const response = await apiClient.get(`/courier/order/${route.params.id}`);
    // Gelen veriyi reaktif değere atayın
    ordersData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  await getOrder();
});

function printPage() {
  const printContent = document.getElementById('printMe');
  const newWin = window.open('');
  newWin.document.write('<style>.table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } .table th, .table td { border: 1px solid #333; padding: 10px; text-align: left; }</style>');
  newWin.document.write(printContent.innerHTML);
  newWin.print();
  newWin.close();
}

const ofisTeslim = async (id) => {
  const response = await apiClient.post(`/order/teslim-transition/${id}`);
  if (response.data.message) {
    toast(response.data.message, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
      onClose: () => { // Bildirim kapatıldığında tetiklenir
        router.push(`/dashboard/kurye/ofis-teslim`); // Yönlendirme işlemini gerçekleştir
      }
    });
  } else if (response.data.error) {
    toast(response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
}

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  /* İstediğiniz değeri ayarlayın */
}

.table th,
.table td {
  border: 1px solid #333;
  padding: 8px;
  text-align: left;
}
</style>