<template>
  <div class="mx-auto max-w-7xl">
    <component v-if="dynamicComponent" :is="dynamicComponent" :data="ordersData"></component>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

import { useRoute } from 'vue-router';
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

import SiparisOnayiItem from '@/components/Guest/order-item/SiparisOnayiItem.vue'
import TasarimBekleyenItem from '@/components/Guest/order-item/TasarimBekleyenItem.vue'
import TasarimOnayiVeOdeme from '@/components/Guest/order-item/TasarimOnayiVeOdemeItem.vue'
import OdemeDogrulamasiItem from '@/components/Guest/order-item/OdemeDogrulamasiItem.vue'
import UreticiSecimiItem from '@/components/Guest/order-item/UreticiSecimiItem.vue'
import UretimAsamasiItem from '@/components/Guest/order-item/UretimAsamasiItem.vue'
import UretimdeItem from '@/components/Guest/order-item/UretimdeItem.vue'
import UrunHazirItem from '@/components/Guest/order-item/UrunHazirItem.vue'
import KargoItem from '@/components/Guest/order-item/KargoItem.vue'

const route = useRoute();

const ordersData = ref(null);
const loadingStore = useLoadingStore();

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

const dynamicComponent = computed(() => {
  return componentsMap[ordersData.value?.order?.original_status] || null;
});

const getOrder = async () => {
  try {
    loadingStore.setLoading(true); // Yüklenme durumunu başlat
    const response = await apiClient.get(`/order-for-customer-by-code/${route.params.id}`);
    // Gelen veriyi reaktif değere atayın
    ordersData.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingStore.setLoading(false); // Yüklenme durumunu durdur
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
