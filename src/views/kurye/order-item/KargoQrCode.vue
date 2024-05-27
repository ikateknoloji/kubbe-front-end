<template>
  <div v-if="orderData">
    <component :is="dynamicComponent" :data="orderData" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import KargoItem from './KargoItem.vue'; // PR durum kodu için bileşen
import KargoKodu from './KargoKodu.vue'; // PD durum kodu için bileşen

import { useRoute } from 'vue-router'; // Import useRoute from Vue Router
import apiClient from '@/api/apiClient';

// API'den gelen durum kodunu saklamak için bir ref oluşturun
const statusCode = ref('');
const orderData = ref(null);

// Use the useRoute composable to access the route parameters
const route = useRoute();
const qrCode = route.params.qrcode; // Replace 'qrcode' with the actual route parameter name

// Dinamik bileşeni hesaplamak için bir computed property kullanın
const dynamicComponent = computed(() => {
  switch (statusCode.value) {
    case 'PR':
      return KargoItem;
    case 'PD':
      return KargoKodu;
    default:
      return null; // Varsayılan olarak hiçbir bileşen render etmeyin
  }
});

// API isteğinden sonra durum kodunu güncellemek için bir fonksiyon
const loadComponentByStatusCode = async () => {
  // API isteği yapın
  const response = await apiClient(`/courier/qr-code/${qrCode}`);

  // API cevabına göre durum kodunu güncelleyin
  statusCode.value = response.data.order.original_status;

  orderData.value = response.data.order;
};

onMounted(async () => {
  loadComponentByStatusCode();

});
</script>
