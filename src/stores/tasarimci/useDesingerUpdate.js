import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useDesingerUpdate = defineStore('desinger-orders-update', () => {

 const loadingStore = useLoadingStore();
 const ordersByStatus = ref(null);

 async function fetchOrdersByStatus(status) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/desinger/all-desing`);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchOrdersByPage(url) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(url);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }

 }

 return {
  ordersByStatus,
  fetchOrdersByStatus,
  fetchOrdersByPage,
 };

});
