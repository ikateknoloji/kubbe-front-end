<template>
  <component :is="dynamicComponent" :data="ordersData"></component>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

import { useRoute } from 'vue-router';


import UretimAsamasiItem from '@/components/Manufacturer/order-item/UretimAsamasiItem.vue'
import UretimdeItem from '@/components/Manufacturer/order-item/UretimdeItem.vue'
import UrunHazirItem from '@/components/Manufacturer/order-item/UrunHazirItem.vue'
import KargoItem from '@/components/Manufacturer/order-item/KargoItem.vue'

const route = useRoute();

const ordersData = ref(null);



const componentsMap = {
  'MS': UretimAsamasiItem,        // Üretici Teklifi Bekleyen Siparişler
  'PP': UretimdeItem,             // Üretim Aşamasında Olan Siparişler
  'PR': UrunHazirItem,            // Hazır Olan Şiparişler.
  'PD': KargoItem,                // Teslim Edilen Şiparişler
}


// Dinamik bileşeni hesapla
const dynamicComponent = computed(() => {
  // ordersData'nın tanımlı olduğundan emin ol
  if (ordersData.value && ordersData.value?.order && ordersData.value?.order?.original_status) {
    return componentsMap[ordersData.value.order?.original_status];
  }
});



const getOrder = async () => {
  try {
    const response = await apiClient.get(`/manufacturer/orders/${route.params.id}`);
    // Gelen veriyi reaktif değere atayın
    ordersData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  await getOrder();
});


watch(() => route.params.status, async (newStatus, oldStatus) => {
  if (newStatus !== oldStatus) {
    await getOrder();
  }
});

</script>

<style scoped></style>