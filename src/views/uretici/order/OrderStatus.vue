<template>
  <div v-if="ordersByStatus?.data.length > 0">
    <component :is="dynamicComponent" :order="ordersByStatus.data"></component>
    <Pagination v-if="ordersByStatus?.last_page > 1" :paginationData="ordersByStatus"
      :fetchPage="store.fetchAllOrdersByPage" />
  </div>
  <div v-else>
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Üretimde Sipariş Bulunmamaktadır.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router';

import { useUreticiOrderStatusStrore } from '@/stores/uretici/useUreticiOrderStatusStrore.js';
import { storeToRefs } from 'pinia'

import Pagination from '@/components/Admin/Pagination.vue';

import Uretimde from '@/components/Manufacturer/order/Uretimde.vue';
import UretimAsamasi from '@/components/Manufacturer/order/UretimAsamasi.vue';
import UrunHazir from '@/components/Manufacturer/order/UrunHazir.vue';
import Kargo from '@/components/Manufacturer/order/Kargo.vue';

const route = useRoute();

const id = ref(route.params.status); // rota parametresi 'id' okunur (bu reaktiftir)

const store = useUreticiOrderStatusStrore()
const { ordersByStatus } = storeToRefs(store)

const componentsMap = {
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