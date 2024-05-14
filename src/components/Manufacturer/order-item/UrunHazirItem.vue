<template>
  <div v-if="data" class="font-poppins">

    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <CoverContent title="Sipariş Bilgileri">
        <div class="flex flex-wrap space-x-3">
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <Date :order="data.order" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <LogoComponent :order="data.order" />
          </div>
        </div>
      </CoverContent>

      <ImageList v-if="data.order">
        <SiparisLogo :url="data.order" />
        <TasarimButton :url="data.order" />
        <UrunButton :url="data.order" />
      </ImageList>

      <OrderTable>
        <TableColm :columns="columnsData" />
        <OrderTableItem :data="data.order.order_items" />
      </OrderTable>
      <div class="mt-10">
        <OrderNote v-if="data.order.note" :note="data.order.note" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LogoComponent from '@/components/Manufacturer/LogoComponent.vue';
import Date from '@/components/Manufacturer/Date.vue';

import OrderTable from '@/components/Manufacturer/OrderTable.vue';
import TableColm from '@/components/Manufacturer/TableColm.vue';
import OrderTableItem from '@/components/Manufacturer/OrderTableItem.vue';
import OrderNote from '@/components/Manufacturer/OrderNote.vue';

import Dealer from '@/components/Manufacturer/Dealer.vue';
import ImageList from '@/components/Manufacturer/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';

import InfoReject from '@/components/Manufacturer/reject/InfoReject.vue';
import CanceledOrder from '@/components/Manufacturer/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Manufacturer/reject/PendingCancellation.vue';

import SiparisLogo from '@/components/Admin/buttons/SiparisLogo.vue';
import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import UrunButton from '@/components/Admin/buttons/UrunButton.vue';



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
];

</script>

<style scoped></style>
