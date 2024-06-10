<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <component :is="dynamicComponent" :order="ordersByStatus.data"></component>
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Bu Aşamada Sipariş Bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { useOrderStatusStore } from '@/stores/userOrdersStatus.js'; // Store'un doğru ismi ve yolu
import { storeToRefs } from 'pinia'
import Pagination from '@/components/Admin/Pagination.vue';
import SiparisOnayi from '@/components/Admin/order/SiparisOnayi.vue';
import TasarimBekleyen from '@/components/Admin/order/TasarimBekleyen.vue';
import TasarimOnayiVeOdeme from '@/components/Admin/order/TasarimOnayiVeOdeme.vue';
import OdemeDogrulamasi from '@/components/Admin/order/OdemeDogrulamasi.vue';
import UreticiSecimi from '@/components/Admin/order/UreticiSecimi.vue';
import Uretimde from '@/components/Admin/order/Uretimde.vue';
import UretimAsamasi from '@/components/Admin/order/UretimAsamasi.vue';
import UrunHazir from '@/components/Admin/order/UrunHazir.vue';
import Kargo from '@/components/Admin/order/Kargo.vue';
import PageTitle from '@/components/PageTitle.vue';

const route = useRoute();

const store = useOrderStatusStore();
const { ordersByStatus } = storeToRefs(store);

const componentsMap = {
  'OC': SiparisOnayi,            // Sipariş Onayı Ver *
  'DP': TasarimBekleyen,         // Tasarım Ekle  *
  'DA': TasarimOnayiVeOdeme,     // Tasarım Onayı  ve Ödeme Onayı Bekleyen Siparişler *
  'P': OdemeDogrulamasi,         // Ödeme Doğrulaması Bekleyen Siparişler *
  'PA': UreticiSecimi,           // Üretici Seçimi Yap*
  'MS': Uretimde,                // Üretici üretime başlama onayı*
  'PP': UretimAsamasi,           // Üretimde*
  'PR': UrunHazir,               // Hazır Olan Şiparişler.*
  'PD': Kargo,                   // Kargo Bekleyen Siparişler*
};

const dynamicComponent = computed(() => componentsMap[route.params.status]);

watchEffect(() => {
  store.fetchOrdersByStatus(route.params.status);
});
</script>

<style scoped></style>
