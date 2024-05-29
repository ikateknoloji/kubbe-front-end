import { defineStore } from 'pinia';

import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useUreticiOrderStatusStrore = defineStore('orders-uretici', () => {

 const ordersByStatus = ref(null);
 const loadingStore = useLoadingStore();

 async function fetchOrdersByStatus(status) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/manufacturer/orders/status/${status}`);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }

 async function fetchOrdersByPage(url) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(url);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }

 async function fetchDelayedOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/manufacturer/order-delayed');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }



 return {
  ordersByStatus,
  fetchOrdersByStatus,
  fetchOrdersByPage,
  fetchDelayedOrders
 };

});
