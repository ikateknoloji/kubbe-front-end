import { defineStore } from 'pinia';
import CryptoJS from 'crypto-js';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
 // Durum tanımlamaları
 const user = ref(null);

 // Gizli anahtarınızı ortam değişkenlerinden alın
 const secretKey = import.meta.env.VITE_SECRET_KEY;

 // LocalStorage'dan şifrelenmiş verileri alıp çözen fonksiyon
 function loadEncryptedData() {
  let encryptedUser = localStorage.getItem('encryptedUser') || null;

  if (encryptedUser) {
   try {
    // Şifrelenmiş kullanıcı bilgilerini çözme
    const bytesUser = CryptoJS.AES.decrypt(encryptedUser, secretKey);
    user.value = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));
   } catch (error) {
    console.error('Şifre çözme hatası:', error);
    // Şifre çözme hatası durumunda verileri temizle
    user.value = null;
    localStorage.removeItem('encryptedUser');
   }
  } else {
   // Veri yoksa null olarak ayarla ve varsa localStorage'dan sil
   user.value = null;
   localStorage.removeItem('encryptedUser');
  }
 }

 // Yeni eklenen fonksiyon
 function clearUserData() {
  user.value = null;
  localStorage.removeItem('encryptedUser');
  localStorage.removeItem('encryptedToken');
 }

 // Fonksiyonları ve reaktif verileri döndür
 return { user, loadEncryptedData, clearUserData };
});
