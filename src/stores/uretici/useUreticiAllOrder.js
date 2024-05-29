import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useUreticiAllOrdersStore = defineStore('uretici-all-orders', () => {

 const loadingStore = useLoadingStore();
 const allOrders = ref(null);


 async function fetchAllOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/manufacturer/orders');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }

 async function fetchAllOrdersByPage(url) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(url);
   allOrders.value = response.data.orders;
  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }

 async function fetchDelayedOrders() {
  try {
   const response = await apiClient.get('/manufacturer/order-delayed');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  } finally {
   loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
  }
 }


 return {
  allOrders,
  fetchAllOrders,
  fetchAllOrdersByPage,
  fetchDelayedOrders
 };
});
