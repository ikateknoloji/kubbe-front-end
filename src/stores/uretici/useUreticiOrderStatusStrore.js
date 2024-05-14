import { defineStore } from 'pinia';

import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useUreticiOrderStatusStrore = defineStore('orders-uretici', () => {

 const ordersByStatus = ref(null);

 async function fetchOrdersByStatus(status) {
  try {
   const response = await apiClient.get(`/manufacturer/orders/status/${status}`);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
 }

 async function fetchOrdersByPage(url) {
  try {
   const response = await apiClient.get(url);
   ordersByStatus.value = response.data.orders;
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
  ordersByStatus,
  fetchOrdersByStatus,
  fetchOrdersByPage,
  fetchDelayedOrders
 };

});
