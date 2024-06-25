<template>
  <div v-if="data" class="font-poppins">

    <div class="p-4 md:p-8 mt-10">
      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <CoverContent title="Müşteri Bilgileri">
        <EditButton :order="data.order" />
        <div class="grid grid-cols-12 gap-4 ">
          <div class="flex flex-col col-span-12  lg:col-span-5 min-h-[300px] ">
            <Dealer v-if="data" :info="data.order?.customer" />
            <CustomerInfo :customer="data.order.customer_info" />
          </div>
          <div class="col-span-12 lg:col-span-7 ">
            <OrderInfo :order="data.order" />
          </div>
        </div>
      </CoverContent>


      <CoverContent title="Sipariş Sepeti">
        <div v-for="basket in data.order.baskets" :key="basket.id">
          <OrderTable>
            <TableColm :columns="columnsData" />
            <OrderTableItem :data="basket.items" />
          </OrderTable>
          <OrderLogos :logos="basket.logos" />
        </div>
      </CoverContent>

      <ImageList v-if="data.order">
        <TasarimButton :url="data.order" />
        <DekontButton :url="data.order" />
      </ImageList>



      <div class="max-w-7xl grid grid-cols-12 gap-4">
        <OrderInfo :order="data.order" />
        <BillInfo v-if="data.order?.invoice_info" :info="data.order.invoice_info" />
      </div>

      <OrderNote v-if="data.order.note" :note="data.order.note" />
      <OrderAddress v-if="data.order?.order_address" :address="data.order.order_address.address" />

      <SelectComponent v-if="data.order.is_rejected == 'A'" :orderId="data.order.id">
        <RejectButton />
      </SelectComponent>

    </div>
  </div>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';
import CustomerInfo from '@/components/Admin/CustomerInfo.vue';
import Dealer from '@/components/Admin/Dealer.vue';

import OrderTable from '../OrderTable.vue';
import TableColm from '@/components/Admin/TableColm.vue';
import OrderTableItem from '@/components/Admin/OrderTableItem.vue';
import OrderNote from '@/components/Admin/OrderNote.vue';
import OrderInfo from '@/components/Admin/OrderInfo.vue';
import BillInfo from '@/components/Admin/BillInfo.vue';
import OrderAddress from '@/components/Admin/OrderAddress.vue';
import SelectComponent from '@/components/Admin/SelectComponent.vue';
import ImageList from '@/components/Admin/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Admin/edit/EditButton.vue';
import OrderLogos from '@/components/Admin/OrderLogos.vue';

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';

import DekontButton from '@/components/Admin/buttons/DekontButton.vue';
import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';

import RejectButton from '@/components/Admin/reject/RejectButton.vue';

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
