import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useDesinger = defineStore('desinger-orders', () => {

 const ordersByStatus = ref(null);

 async function fetchOrdersByStatus(status) {
  try {
   const response = await apiClient.get(`/orders/desinger/await-desing`);
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
