<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <component :is="dynamicComponent" :order="ordersByStatus.data"></component>
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Bu Aşamada Sipariş Bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router';

import { useCustomerOrderStatusStrore } from '@/stores/musteri/userCustomerOrdersStatus.js';
import { storeToRefs } from 'pinia'

import Pagination from '@/components/Admin/Pagination.vue';

import SiparisOnayi from '@/components/Customer/order/SiparisOnayi.vue';
import TasarimBekleyen from '@/components/Customer/order/TasarimBekleyen.vue';
import TasarimOnayiVeOdeme from '@/components/Customer/order/TasarimOnayiVeOdeme.vue';
import OdemeDogrulamasi from '@/components/Customer/order/OdemeDogrulamasi.vue';
import UreticiSecimi from '@/components/Customer/order/UreticiSecimi.vue';
import Uretimde from '@/components/Customer/order/Uretimde.vue';
import UretimAsamasi from '@/components/Customer/order/UretimAsamasi.vue';
import UrunHazir from '@/components/Customer/order/UrunHazir.vue';
import Kargo from '@/components/Customer/order/Kargo.vue';

const route = useRoute();

const id = ref(route.params.status); // rota parametresi 'id' okunur (bu reaktiftir)

const store = useCustomerOrderStatusStrore()
const { ordersByStatus } = storeToRefs(store)

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
}

const dynamicComponent = computed(() => componentsMap[route.params.status])




watchEffect(() => {
  store.fetchOrdersByStatus(route.params.status)
})


</script>

<style scoped></style>