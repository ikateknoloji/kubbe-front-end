import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient.js'; // apiClient'i içe aktarın

export const useKuryeNotificationsStore = defineStore('kuryeNotifications', () => {
 const kuryeNotifications = ref([]);
 const loading = ref(false);
 const error = ref(null);
 const pagination = ref({})
 const count = ref(null)

 async function fetchKuryeNotifications() {
  loading.value = true;
  error.value = null;
  try {
   const response = await apiClient.get('/notifications/courier');
   kuryeNotifications.value = response.data.data.map(notification => {
    return {
     ...notification,
     message: JSON.parse(notification.message) // JSON içeriğini ayrıştır
    };
   });
   const { data, ...other } = response.data;
   pagination.value = other;
   count.value = response.data.unread_count
  } catch (err) {
   error.value = err;
  } finally {
   loading.value = false;
  }
 }

 async function markNotificationAsRead(id) {
  try {
   await apiClient.post(`/notifications/courier/${id}/read`);
   kuryeNotifications.value = kuryeNotifications.value.map(notification =>
    notification.id === id ? { ...notification, is_read: true } : notification
   );
  } catch (err) {
   error.value = err;
  }
 }

 const paginateNotification = async (url) => {
  try {
   const response = await apiClient.get(url);

   kuryeNotifications.value = response.data.data.map(notification => {
    return { ...notification, message: JSON.parse(notification.message) };
   });

   const { data, ...other } = response.data;
   pagination.value = other;
  } catch (error) {
   console.error(error);
  }
 }

 // Store'unuzun durumunu değiştiren bir fonksiyon oluşturun
 const addNotification = (notification) => {
  kuryeNotifications.value.unshift(notification);
  count.value += 1;
 };

 return {
  kuryeNotifications,
  loading,
  error,
  pagination,
  count,
  fetchKuryeNotifications,
  markNotificationAsRead,
  paginateNotification,
  addNotification
 };
});
