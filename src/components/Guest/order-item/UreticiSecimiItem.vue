<template>
  <div v-if="data" class="font-poppins">

    <div class="p-4 md:p-8 mt-10">

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

      <ImageList v-if="data.order">
        <TasarimButton :url="data.order" />
      </ImageList>

      <CoverContent title="Sipariş Sepeti">
        <div v-for="basket in data.order.baskets" :key="basket.id">
          <OrderTable>
            <TableColm :columns="columnsData" />
            <OrderTableItem :data="basket.items" />
          </OrderTable>
          <OrderLogos :logos="basket.logos" />
        </div>
      </CoverContent>



      <BillInfo v-if="data.order?.invoice_info" :info="data.order.invoice_info" />
      <OrderAddress v-if="data.order?.order_address" :address="data.order.order_address.address" />

    </div>
  </div>
</template>

<script setup>
import CustomerInfo from '@/components/Guest/CustomerInfo.vue';

import OrderTable from '@/components/Guest/OrderTable.vue';
import TableColm from '@/components/Guest/TableColm.vue';
import OrderTableItem from '@/components/Guest/OrderTableItem.vue';
import OrderInfo from '@/components/Guest/OrderInfo.vue';
import BillInfo from '@/components/Guest/BillInfo.vue';
import OrderAddress from '@/components/Guest/OrderAddress.vue';
import ImageList from '@/components/Guest/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';


import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';



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
