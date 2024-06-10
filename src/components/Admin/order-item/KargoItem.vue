<template>
  <div v-if="data" class="font-poppins">
    <div class="p-4 md:p-8 mt-10">
      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <CoverContent title="Müşteri Bilgileri">
        <EditButton :order="data.order" />
        <div class="flex flex-wrap md:space-x-3">
          <Dealer :info="data.order.customer" />
          <ManufacturerInfo :info="data.order.manufacturer" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7  lg:order-0 order-1">
            <Date :order="data.order" />
            <CustomerInfo :customer="data.order.customer_info" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <LogoComponent :order="data.order" />
          </div>
        </div>
      </CoverContent>

      <ImageList v-if="data.order">
        <SiparisLogo :url="data.order" />
        <TasarimButton :url="data.order" />
        <DekontButton :url="data.order" />
        <UrunButton :url="data.order" />
        <KargoButton :url="data.order" />
        <FaturaButton v-if="data.order.invoice_type == 'Kurumsal'" :url="data.order" />
      </ImageList>



      <OrderTable>
        <TableColm :columns="columnsData" />
        <OrderTableItem :data="data.order.order_items" />
      </OrderTable>

      <div class="max-w-7xl grid grid-cols-12 gap-4">
        <OrderInfo :order="data.order" />
        <BillInfo v-if="data.order?.invoice_info" :info="data.order.invoice_info" />
      </div>

      <OrderNote v-if="data.order.note" :note="data.order.note" />
      <OrderAddress :address="data.order.order_address.address" />

    </div>
  </div>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

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
import ImageList from '@/components/Admin/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';
import ManufacturerInfo from '@/components/Admin/ManufacturerInfo.vue';
import EditButton from '@/components/Admin/edit/EditButton.vue';

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';


import SiparisLogo from '@/components/Admin/buttons/SiparisLogo.vue';
import DekontButton from '@/components/Admin/buttons/DekontButton.vue';
import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import UrunButton from '@/components/Admin/buttons/UrunButton.vue';
import KargoButton from '@/components/Admin/buttons/KargoButton.vue';
import FaturaButton from '@/components/Admin/buttons/FaturaButton.vue';

const store = useMangeOrderStore();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});


const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
  'Birim Fiyatı'
];

</script>

<style scoped></style>
