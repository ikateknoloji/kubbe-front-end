import { defineStore } from 'pinia';

import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useCustomerOrderStatusStrore = defineStore('orders-musteri', () => {

 const ordersByStatus = ref(null);

 async function fetchOrdersByStatus(status) {
  try {
   const response = await apiClient.get(`/customer/orders/status/${status}`);
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



 return {
  ordersByStatus,
  fetchOrdersByStatus,
  fetchOrdersByPage,
 };

});
