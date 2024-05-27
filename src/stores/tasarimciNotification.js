import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient.js'; // apiClient'i içe aktarın

export const usetasarimciNotificationsStore = defineStore('tasarimciNotifications', () => {
 const tasarimciNotifications = ref([]);
 const loading = ref(false);
 const error = ref(null);
 const pagination = ref({})
 const count = ref(null)

 async function fetchTasarimciNotifications() {
  loading.value = true;
  error.value = null;
  try {
   const response = await apiClient.get('/notifications/designer');
   tasarimciNotifications.value = response.data.data.map(notification => {
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
   await apiClient.post(`/notifications/designer/${id}/read`);
   tasarimciNotifications.value = tasarimciNotifications.value.map(notification =>
    notification.id === id ? { ...notification, is_read: true } : notification
   );
  } catch (err) {
   error.value = err;
  }
 }

 const paginateNotification = async (url) => {
  try {
   const response = await apiClient.get(url);

   tasarimciNotifications.value = response.data.data.map(notification => {
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
  tasarimciNotifications.value.unshift(notification);
  count.value += 1;
 };

 return {
  tasarimciNotifications,
  loading,
  error,
  pagination,
  count,
  fetchTasarimciNotifications,
  markNotificationAsRead,
  paginateNotification,
  addNotification
 };
});
