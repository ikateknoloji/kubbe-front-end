<template>
  <div v-if="data" class="font-poppins">

    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70"> {{
        data.order.order_name }}
      </div>

      <CoverContent title="Müşteri Bilgileri">
        <EditButton :order="data.order" />
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <CustomerInfo :customer="data.order.customer_info" />
            <ManufacturerInfo :info="data.order.manufacturer" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <Date :order="data.order" />
          </div>
        </div>
      </CoverContent>


      <ImageList v-if="data.order">
        <button type="button" @click="copyImageUrl(data.order.formatted_order_images.D.image_url)"
          class="text-white bg-[#3150b6] hover:bg-[#FF9119]/80 focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
          Tasarım URL'ini Kopyala
        </button>
        <DekontButton :url="data.order" />
        <button type="button" @click="copyImageUrl(data.order.formatted_order_images.PR.image_url)"
          class="text-white bg-[#b84331] hover:bg-[#b84331]/80 focus:ring-4 focus:ring-[#b84331]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#b84331]/80 dark:focus:ring-[#b84331]/40 mr-2 mb-2">
          Sipariş Resmi Url'ini Kopyala
        </button>
        <button type="button" @click="copyImageUrl(data.order.formatted_order_images.SC.image_url)"
          class="text-white bg-[#0e0e0e] hover:bg-[#0e0e0e]/80 focus:ring-4 focus:ring-[#0e0e0e]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#0e0e0e]/80 dark:focus:ring-[#0e0e0e]/40 mr-2 mb-2">
          Sipariş Resmi Url'ini Kopyala
        </button>
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

      <div class="max-w-7xl grid grid-cols-12 gap-4 mb-10">
        <OrderInfo :order="data.order" />
        <BillInfo v-if="data.order?.invoice_info" :info="data.order.invoice_info" />
      </div>

      <OrderNote v-if="data.order.note" :note="data.order.note" />
      <OrderAddress v-if="data.order?.order_address" :address="data.order.order_address.address" />
    </div>
  </div>
  <pre>
    {{ }}
  </pre>
</template>

<script setup>
import CustomerInfo from '@/components/Customer/CustomerInfo.vue';
import OrderLogos from '@/components/Customer/OrderLogos.vue';
import Date from '@/components/Customer/Date.vue';

import OrderTable from '@/components/Customer/OrderTable.vue';
import TableColm from '@/components/Customer/TableColm.vue';
import OrderTableItem from '@/components/Customer/OrderTableItem.vue';
import OrderNote from '@/components/Customer/OrderNote.vue';
import OrderInfo from '@/components/Customer/OrderInfo.vue';
import BillInfo from '@/components/Customer/BillInfo.vue';
import OrderAddress from '@/components/Customer/OrderAddress.vue';
import ManufacturerInfo from '@/components/Customer/ManufacturerInfo.vue';
import ImageList from '@/components/Customer/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Customer/edit/EditButton.vue';

import InfoReject from '@/components/Customer/reject/InfoReject.vue';
import CanceledOrder from '@/components/Customer/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Customer/reject/PendingCancellation.vue';

import DekontButton from '@/components/Admin/buttons/DekontButton.vue';

import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar



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

const copyImageUrl = (value) => {
  const el = document.createElement('textarea');
  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  toast('Resim URL Kopyalandı', {
    autoClose: 1000
  });
};
</script>

<style scoped></style>
