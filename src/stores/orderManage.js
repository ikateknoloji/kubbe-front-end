import { defineStore } from 'pinia';
import { ref } from 'vue';

import apiClient from '@/api/apiClient'; // Doğru yolu belirt

import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useMangeOrderStore = defineStore('orders-manage', () => {

 const loadingStore = useLoadingStore();
 const router = useRouter();
 const route = useRoute();

 const ordersByStatus = ref(null);

 const transitionToDesignPhase = async (orderId) => {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   // HTTP POST isteği gönder
   const response = await apiClient.post(`/orders/${orderId}/transition-to-design`);

   // İsteğin başarılı olup olmadığını kontrol et
   if (response.status === 200) {
    toast('Şipariş durumu Onaylandı.', {
     autoClose: 1000, // Bildirimi 1 saniye sonra otomatik olarak kapat
     onClose: () => { // Bildirim kapatıldığında tetiklenir
      router.push(`/dashboard/admin/orders/${route.params.status}`); // Yönlendirme işlemini gerçekleştir
     }
    });
   } else {
    console.error('Şipariş durumu güncelleme hatası:', response.statusText);
   }
  } catch (error) {
   console.error('Şipariş durumu güncelleme hatası:', error.message);
  } finally {
   loadingStore.setLoading(false);
  }
 };

 const verifyPayment = async (orderId, paidAmount) => {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   // HTTP POST isteği gönder
   const response = await apiClient.post(`/orders/${orderId}/verify-payment`, { paid_amount: paidAmount });
   // İsteğin başarılı olup olmadığını kontrol et
   if (response.status === 200) {

    toast('Şipariş durumu güncellendi!', {
     autoClose: 1000, // Bildirimi 1 saniye sonra otomatik olarak kapat
     onClose: () => { // Bildirim kapatıldığında tetiklenir
      router.push(`/dashboard/admin/orders/PA/${orderId}`); // Yönlendirme işlemini gerçekleştir
     }
    });

   } else {
    console.error('Şipariş durumu güncelleme hatası:', response.statusText);
   }
  } catch (error) {
   console.log(error);
  } finally {
   loadingStore.setLoading(false);
  }
 }

 const downloadImage = async (orderId, type) => {
  try {
   loadingStore.setLoading(true); // Yüklenme durumunu başlat
   const response = await apiClient.get(`/download-order-image/${orderId}/${type}`, {
    responseType: 'blob', // Dosya tipinde bir yanıt bekliyoruz
   });

   // İçerik dağıtımı başlığından dosya adını al
   const contentDisposition = response.headers['content-disposition'];
   let fileName = 'downloaded-file';
   if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename="(.+?)"/); // Non-greedy match kullanıldı
    if (fileNameMatch && fileNameMatch.length > 1) {
     fileName = fileNameMatch[1];
    }
   }

   // MIME tipine göre dosya uzantısını ayarla
   const contentType = response.headers['content-type'];
   if (contentType && !fileName.includes('.')) { // Eğer dosya adında zaten bir uzantı varsa, bunu değiştirme
    const extension = contentType.split('/')[1];
    fileName += '.' + extension; // Uzantıyı dosya adına ekle
   }

   // İndirme işlemi için bir link oluştur
   const link = document.createElement('a');
   link.href = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
   link.setAttribute('download', fileName); // Dinamik dosya adı ve uzantısı

   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   window.URL.revokeObjectURL(link.href);
  } catch (error) {
   console.error('Dosya indirme hatası:', error);
  } finally {
   loadingStore.setLoading(false);
  }
 };

 return {
  transitionToDesignPhase,
  verifyPayment,
  downloadImage
 };

});
