<template>
  <div v-if="data" class="font-poppins">
    <div class="p-2 md:p-8 mt-10 relative">

      <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70"> {{
        data.order.order_name }}
      </div>

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
          <OrderTable :order="basket.id">
            <TableColm :columns="columnsData" />
            <OrderTableItem :data="basket.items" />
          </OrderTable>
          <OrderLogos :logos="basket.logos" />
        </div>
      </CoverContent>

      <OrderNote v-if="data.order.note" :note="data.order.note" />

      <div v-if="data.order.is_rejected == 'A'" class="flex space-x-4">
        <button type="button" @click="store.transitionToDesignPhase(data.order.id)"
          class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white     hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Sipariş Onay
        </button>
        <RejectButton :order="data.order" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomerInfo from '@/components/Admin/CustomerInfo.vue';
import Dealer from '@/components/Admin/Dealer.vue';

import OrderTable from '@/components/Admin/OrderTable.vue';
import TableColm from '@/components/Admin/TableColm.vue';
import OrderTableItem from '@/components/Admin/OrderTableItem.vue';
import OrderNote from '@/components/Admin/OrderNote.vue';
import OrderInfo from '@/components/Admin/OrderInfo.vue';
import RejectButton from '@/components/Admin/reject/RejectButton.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Admin/edit/EditButton.vue';
import OrderLogos from '@/components/Admin/OrderLogos.vue';

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';

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