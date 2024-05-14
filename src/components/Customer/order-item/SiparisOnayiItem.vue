<template>
  <div v-if="data" class="font-poppins">

    <div class="p-2 md:p-8 mt-10 relative">

      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <CoverContent title="Müşteri Bilgileri">
        <EditButton :order="data.order" />
        <div class="grid grid-cols-12 gap-4 ">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <CustomerInfo :customer="data.order.customer_info" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <LogoComponent :order="data.order" />
          </div>
        </div>
      </CoverContent>

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
import CustomerInfo from '@/components/Customer/CustomerInfo.vue';
import LogoComponent from '@/components/Customer/LogoComponent.vue';

import OrderTable from '@/components/Customer/OrderTable.vue';
import TableColm from '@/components/Customer/TableColm.vue';
import OrderTableItem from '@/components/Customer/OrderTableItem.vue';
import OrderNote from '@/components/Customer/OrderNote.vue';
import OrderInfo from '@/components/Customer/OrderInfo.vue';
import BillInfo from '@/components/Customer/BillInfo.vue';
import OrderAddress from '@/components/Customer/OrderAddress.vue';
import RejectButton from '@/components/Customer/reject/RejectButton.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Customer/edit/EditButton.vue';

import InfoReject from '@/components/Customer/reject/InfoReject.vue';
import CanceledOrder from '@/components/Customer/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Customer/reject/PendingCancellation.vue';

import { useMangeOrderStore } from '@/stores/orderManage.js';

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

<style>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>