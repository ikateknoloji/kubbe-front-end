import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useKurye = defineStore('kurye-orders', () => {

 const ordersByStatus = ref(null);

 const ordersByCourier = ref(null);

 async function fetchOrdersByStatus() {
  try {
   const response = await apiClient.get(`/orders/courier/await-courier`);
   ordersByStatus.value = response.data.orders;
  } catch (error) {
   console.error(error);
  }
 }

 async function fetchOrdersByUpdate() {
  try {
   const response = await apiClient.get(`/orders/courier/update-courier`);
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
  fetchOrdersByUpdate
 };

});
