import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useUreticiAllOrdersStore = defineStore('uretici-all-orders', () => {

 const allOrders = ref(null);


 async function fetchAllOrders() {
  try {
   const response = await apiClient.get('/manufacturer/orders');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 async function fetchAllOrdersByPage(url) {
  try {
   const response = await apiClient.get(url);
   allOrders.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
 }

 async function fetchDelayedOrders() {
  try {
   const response = await apiClient.get('/manufacturer/order-delayed');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }


 return {
  allOrders,
  fetchAllOrders,
  fetchAllOrdersByPage,
  fetchDelayedOrders
 };
});
