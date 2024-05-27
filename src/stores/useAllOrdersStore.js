import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt

export const useAllOrdersStore = defineStore('allOrders', () => {

 const allOrders = ref(null);


 async function fetchAllOrders() {
  try {
   const response = await apiClient.get('/orders/active');
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

 async function fetchBillingOrders() {
  try {
   const response = await apiClient.get('/orders-billing');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 async function fetchDelayedOrders() {
  try {
   const response = await apiClient.get('/delayed/orders');
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 async function fetchCustomerActiveOrders(customerId) {
  try {
   const response = await apiClient.get(`/orders/customer-active/${customerId}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }

 async function fetchCustomerHistoryOrders(customerId) {
  try {
   const response = await apiClient.get(`/orders/customer-history/${customerId}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
 }


 async function fetchManufacturerActiveOrders(manufacturerId) {
  try {
   const response = await apiClient.get(`/orders/manufacturer-active/${manufacturerId}`);
   allOrders.value = await response.data.orders;
  } catch (error) {
   console.error(error);
  }
 }

 async function fetchManufacturerHistoryOrders(manufacturerId) {
  try {
   const response = await apiClient.get(`/orders/manufacturer-history/${manufacturerId}`);
   allOrders.value = await response.data.orders;
  } catch (error) {
   console.error(error);
  }
 }


 async function fetchRejectedStatusOrders($rejectedStatus) {
  try {
   const response = await apiClient.get(`/orders/rejected-status/${$rejectedStatus}`);
   allOrders.value = await response.data.orders;

  } catch (error) {
   console.error(error);
  }
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
