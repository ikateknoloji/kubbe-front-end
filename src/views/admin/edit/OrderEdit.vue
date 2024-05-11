<template>
  <component :is="dynamicComponent" :data="ordersData"></component>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

import { useRoute } from 'vue-router';


import SiparisOnayEdit from '@/components/Admin/edit/SiparisOnayEdit.vue'
import TasarimBekleyenEdit from '@/components/Admin/edit/TasarimBekleyenEdit.vue'
import TasarimOnayiEdit from '@/components/Admin/edit/TasarimOnayiEdit.vue'
import OdemeDogrulamaEdit from '@/components/Admin/edit/OdemeDogrulamaEdit.vue'
import UreticiSecimEdit from '@/components/Admin/edit/UreticiSecimEdit.vue'
import UretimAsamsiEdit from '@/components/Admin/edit/UretimAsamsiEdit.vue'
import UretimdeEdit from '@/components/Admin/edit/UretimdeEdit.vue'
import UrunHazirEdit from '@/components/Admin/edit/UrunHazirEdit.vue'
import KargoEdit from '@/components/Admin/edit/KargoEdit.vue'

const route = useRoute();

const ordersData = ref(null);



const componentsMap = {
  'OC': SiparisOnayEdit,         // Sipariş Onayı
  'DP': TasarimBekleyenEdit,      // Tasarım Ekle
  'DA': TasarimOnayiEdit,      // Ödeme Bekleyen Siparişler
  'P': OdemeDogrulamaEdit,      // Ödeme Onayı Ver
  'PA': UreticiSecimEdit,        // Üretici Seçimi Yap
  'MS': UretimAsamsiEdit,        // Üretici Teklifi Bekleyen Siparişler
  'PP': UretimdeEdit,             // Üretim Aşamasında Olan Siparişler
  'PR': UrunHazirEdit,            // Hazır Olan Şiparişler.
  'PD': KargoEdit,                // Teslim Edilen Şiparişler
}


const dynamicComponent = computed(() => componentsMap[route.params.status])


const getOrder = async () => {
  try {
    const response = await apiClient.get(`/orders/${route.params.id}`);
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