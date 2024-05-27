<template>
  <div v-if="ordersData" class="font-poppins">

    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="ordersData.order.is_rejected === 'R'" :order="ordersData.order" />
      <CanceledOrder v-if="ordersData.order.is_rejected === 'C'" :order="ordersData.order" />
      <PendingCancellation v-if="ordersData.order.is_rejected === 'P'" :order="ordersData.order" />

      <CoverContent title="Müşteri Bilgileri">
        <div class="flex flex-wrap md:space-x-3">
          <Dealer :info="ordersData.order.customer" />
          <ManufacturerInfo :info="ordersData.order.manufacturer" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <Date :order="ordersData.order" />
            <CustomerInfo :customer="ordersData.order.customer_info" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <LogoComponent :order="ordersData.order" />
          </div>
        </div>
      </CoverContent>


      <ImageList v-if="ordersData.order">
        <SiparisLogo :url="ordersData.order" />
        <TasarimButton :url="ordersData.order" />
        <UrunButton :url="ordersData.order" />
      </ImageList>

      <OrderTable>
        <TableColm :columns="columnsData" />
        <OrderTableItem :data="ordersData.order.order_items" />
      </OrderTable>

      <div class="max-w-7xl grid grid-cols-12 gap-4">
        <OrderInfo :order="ordersData.order" />
        <BillInfo v-if="ordersData.order?.invoice_info" :info="ordersData.order.invoice_info" />
      </div>

      <OrderNote v-if="ordersData.order.note" :note="ordersData.order.note" />
      <KargoTeslim :orderId="ordersData.order.id" />

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient';
import { useRoute } from 'vue-router';

import CustomerInfo from '@/components/Admin/CustomerInfo.vue';
import Dealer from '@/components/Admin/Dealer.vue';
import LogoComponent from '@/components/Admin/LogoComponent.vue';
import Date from '@/components/Admin/Date.vue';

import OrderTable from '@/components/Admin/OrderTable.vue';
import TableColm from '@/components/Admin/TableColm.vue';
import OrderTableItem from '@/components/Admin/OrderTableItem.vue';
import OrderNote from '@/components/Admin/OrderNote.vue';
import OrderInfo from '@/components/Admin/OrderInfo.vue';
import BillInfo from '@/components/Admin/BillInfo.vue';
import OrderAddress from '@/components/Admin/OrderAddress.vue';
import ManufacturerInfo from '@/components/Admin/ManufacturerInfo.vue';
import ImageList from '@/components/Admin/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Admin/edit/EditButton.vue';
import KargoTeslim from '@/components/Kurye/KargoTeslim.vue';

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';

import SiparisLogo from '@/components/Admin/buttons/SiparisLogo.vue';
import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import UrunButton from '@/components/Admin/buttons/UrunButton.vue';


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

</script>

<style scoped></style>
