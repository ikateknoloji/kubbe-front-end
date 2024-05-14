<template>
  <component :is="dynamicComponent" :data="ordersData"></component>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

import { useRoute } from 'vue-router';


import SiparisOnayiItem from '@/components/Customer/order-item/SiparisOnayiItem.vue'
import TasarimBekleyenItem from '@/components/Customer/order-item/TasarimBekleyenItem.vue'
import TasarimOnayiVeOdeme from '@/components/Customer/order-item/TasarimOnayiVeOdemeItem.vue'
import OdemeDogrulamasiItem from '@/components/Customer/order-item/OdemeDogrulamasiItem.vue'
import UreticiSecimiItem from '@/components/Customer/order-item/UreticiSecimiItem.vue'
import UretimAsamasiItem from '@/components/Customer/order-item/UretimAsamasiItem.vue'
import UretimdeItem from '@/components/Customer/order-item/UretimdeItem.vue'
import UrunHazirItem from '@/components/Customer/order-item/UrunHazirItem.vue'
import KargoItem from '@/components/Customer/order-item/KargoItem.vue'

const route = useRoute();

const ordersData = ref(null);



const componentsMap = {
  'OC': SiparisOnayiItem,         // Sipariş Onayı
  'DP': TasarimBekleyenItem,      // Tasarım Ekle
  'DA': TasarimOnayiVeOdeme,      // Ödeme Bekleyen Siparişler
  'P': OdemeDogrulamasiItem,      // Ödeme Onayı Ver
  'PA': UreticiSecimiItem,        // Üretici Seçimi Yap
  'MS': UretimAsamasiItem,        // Üretici Teklifi Bekleyen Siparişler
  'PP': UretimdeItem,             // Üretim Aşamasında Olan Siparişler
  'PR': UrunHazirItem,            // Hazır Olan Şiparişler.
  'PD': KargoItem,                // Teslim Edilen Şiparişler
}


const dynamicComponent = computed(() => componentsMap[route.params.status])


const getOrder = async () => {
  try {
    const response = await apiClient.get(`/orders/customer/${route.params.id}`);
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