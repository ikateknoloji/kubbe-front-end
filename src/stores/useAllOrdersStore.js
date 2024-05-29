import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useAllOrdersStore = defineStore('allOrders', () => {

 const loadingStore = useLoadingStore();
 const allOrders = ref(null);


 async function fetchAllOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/orders/active');
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

 async function fetchBillingOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/orders-billing');
   allOrders.value = await response.data.orders;

  }
  catch (error) { console.error(error); }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchDelayedOrders() {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get('/delayed/orders');
   allOrders.value = await response.data.orders;

  }
  catch (error) { console.error(error); }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchCustomerActiveOrders(customerId) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/customer-active/${customerId}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchCustomerHistoryOrders(customerId) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/customer-history/${customerId}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }


 async function fetchManufacturerActiveOrders(manufacturerId) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/manufacturer-active/${manufacturerId}`);
   allOrders.value = await response.data.orders;
  } catch (error) {
   console.error(error);
  }
  finally { loadingStore.setLoading(false); }
 }

 async function fetchManufacturerHistoryOrders(manufacturerId) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/manufacturer-history/${manufacturerId}`);
   allOrders.value = await response.data.orders;
  }
  catch (error) { console.error(error); }
  finally { loadingStore.setLoading(false); }
 }


 async function fetchRejectedStatusOrders($rejectedStatus) {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/orders/rejected-status/${$rejectedStatus}`);
   allOrders.value = await response.data.orders;
  }
  catch (error) { console.error(error); }
  finally { loadingStore.setLoading(false); }
 }

 return {
  allOrders,
  fetchAllOrders,
  fetchAllOrdersByPage,
  fetchBillingOrders,
  fetchDelayedOrders,
  fetchCustomerActiveOrders,
  fetchCustomerHistoryOrders,
  fetchRejectedStatusOrders,
  fetchManufacturerActiveOrders,
  fetchManufacturerHistoryOrders,
 };
});
