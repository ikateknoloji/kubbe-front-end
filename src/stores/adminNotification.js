import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient'; // apiClient'i içe aktarın

export const useAdminNotificationsStore = defineStore('adminNotifications', () => {
 const notifications = ref([]);
 const loading = ref(false);
 const error = ref(null);
 const pagination = ref({})
 const count = ref(null)

 async function fetchAdminNotifications() {
  loading.value = true;
  error.value = null;
  try {
   const response = await apiClient.get('/notifications/admin');
   notifications.value = response.data.data.map(notification => {
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
   await apiClient.post(`/notifications/admin/${id}/read`);
   notifications.value = notifications.value.map(notification =>
    notification.id === id ? { ...notification, is_read: 1 } : notification
   );
  } catch (err) {
   error.value = err;
  }
 }

 const paginateNotification = async (url) => {
  try {
   const response = await apiClient.get(url);

   notifications.value = response.data.data.map(notification => {
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
  notifications.value.push(notification);
  count.value += 1;
 };

 return {
  notifications,
  loading,
  error,
  pagination,
  count,
  fetchAdminNotifications,
  markNotificationAsRead,
  paginateNotification,
  addNotification
 };
});
