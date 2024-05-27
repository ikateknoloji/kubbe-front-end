import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient.js'; // apiClient'i içe aktarın

export const useUreticiNotificationsStore = defineStore('ureticiNotifications', () => {
 const ureticiNotifications = ref([]);
 const loading = ref(false);
 const error = ref(null);
 const pagination = ref({})
 const count = ref(null)

 async function fetchUreticiNotifications() {
  loading.value = true;
  error.value = null;
  try {
   const response = await apiClient.get('/notifications/manufacturer');
   ureticiNotifications.value = response.data.data.map(notification => {
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
   await apiClient.post(`/notifications/manufacturer/${id}/read`);
   ureticiNotifications.value = ureticiNotifications.value.map(notification =>
    notification.id === id ? { ...notification, is_read: true } : notification
   );
  } catch (err) {
   error.value = err;
  }
 }

 async function addNotification(notification) {
  try {
   ureticiNotifications.value.push(notification);
  } catch (err) {
   error.value = err;
  }
 }

 const paginateNotification = async (url) => {
  try {
   const response = await apiClient.get(url);

   ureticiNotifications.value = response.data.data.map(notification => {
    return { ...notification, message: JSON.parse(notification.message) };
   });

   const { data, ...other } = response.data;
   pagination.value = other;
  } catch (error) {
   console.error(error);
  }
 }


 return {
  ureticiNotifications,
  loading,
  error,
  pagination,
  count,
  fetchUreticiNotifications,
  markNotificationAsRead,
  paginateNotification,
  addNotification
 };

});

