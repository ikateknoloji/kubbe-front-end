import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useCustomerAllOrdersStore = defineStore('customer-all-orders', () => {

 const loadingStore = useLoadingStore();
 const allOrders = ref(null);


 async function fetchAllOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/customer/orders');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchAllOrdersByPage(url) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(url);
   allOrders.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchDelayedOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/delayed/orders');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }


 async function fetchCustomerHistoryOrders() {
  try {
   const response = await apiClient.get(`/customer/order-history`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }


 async function fetchDelayedOrders() {
  try {
   const response = await apiClient.get('/customer/order-delayed');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 async function fetchRejectedStatusOrders($rejectedStatus) {
  try {
   const response = await apiClient.get(`/customer/order-rejected/${$rejectedStatus}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 return {
  allOrders,
  fetchAllOrders,
  fetchAllOrdersByPage,
  fetchCustomerHistoryOrders,
  fetchDelayedOrders,
  fetchRejectedStatusOrders
 };
});
