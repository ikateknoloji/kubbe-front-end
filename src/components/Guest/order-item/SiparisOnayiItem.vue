<template>
  <div v-if="data" class="font-poppins">

    <div class="p-2 md:p-8 mt-10 relative">

      <CoverContent title="Müşteri Bilgileri">
        <div class="grid grid-cols-12 gap-4 ">
          <div class="flex flex-col col-span-12  lg:col-span-5 min-h-[300px] ">
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

    </div>
  </div>
</template>

<script setup>
import CustomerInfo from '@/components/Guest/CustomerInfo.vue';

import OrderTable from '@/components/Guest/OrderTable.vue';
import TableColm from '@/components/Guest/TableColm.vue';
import OrderTableItem from '@/components/Guest/OrderTableItem.vue';
import OrderInfo from '@/components/Guest/OrderInfo.vue';
import CoverContent from '@/components/CoverContent.vue';
import OrderLogos from '@/components/Guest/OrderLogos.vue';


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