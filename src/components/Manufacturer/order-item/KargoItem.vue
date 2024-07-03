<template>
  <div v-if="data" class="font-poppins">

    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="data.order.is_rejected === 'R'" :order="data.order" />
      <CanceledOrder v-if="data.order.is_rejected === 'C'" :order="data.order" />
      <PendingCancellation v-if="data.order.is_rejected === 'P'" :order="data.order" />

      <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70">
        {{ data.order.order_name }}
      </div>

      <CoverContent title="Sipariş Bilgileri">
        <div class="flex flex-wrap space-x-3">
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 ">
            <Dealer v-if="data" :info="data.order?.customer" />
            <Date :order="data.order" />
          </div>
        </div>
      </CoverContent>

      <CoverContent title="Sipariş Listesi">
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
      </ImageList>


      <div class="mt-10">
        <OrderNote v-if="data.order.note" :note="data.order.note" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter, useRoute } from 'vue-router';

import apiClient from '@/api/apiClient';

import Date from '@/components/Manufacturer/Date.vue';

import OrderTable from '@/components/Manufacturer/OrderTable.vue';
import TableColm from '@/components/Manufacturer/TableColm.vue';
import OrderTableItem from '@/components/Manufacturer/OrderTableItem.vue';
import OrderNote from '@/components/Manufacturer/OrderNote.vue';
import OrderLogos from '@/components/Manufacturer/OrderLogos.vue';

import Dealer from '@/components/Manufacturer/Dealer.vue';
import ImageList from '@/components/Manufacturer/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';

import InfoReject from '@/components/Manufacturer/reject/InfoReject.vue';
import CanceledOrder from '@/components/Manufacturer/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Manufacturer/reject/PendingCancellation.vue';

import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';



const route = useRoute();
const router = useRouter();



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

const siparisOnay = async (orderId) => {
  try {
    // HTTP POST isteği gönder
    const response = await apiClient.post(`/orders/${orderId}/start-production`);

    // İsteğin başarılı olup olmadığını kontrol et
    if (response.status === 200) {

      toast('Şiparişin Üretime Başlandı.', {
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          router.push(`/dashboard/uretici/orders/${route.params.status}`); // Yönlendirme işlemini gerçekleştir
        }
      });

    } else {
      console.error('Şipariş durumu güncelleme hatası:', response.statusText);
    }
  } catch (error) {
    console.error('Şipariş durumu güncelleme hatası:', error.message);
  }
};

</script>

<style scoped></style>
