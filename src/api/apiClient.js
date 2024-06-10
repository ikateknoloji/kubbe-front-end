import axios from 'axios';
import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;


// Axios yapılandırmasını oluşturun
const apiClient = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", // API adresinizi buraya ekleyin
  baseURL: "https://app.kubbe-crm.online/api/",
});


// Axios interceptor ekleyin
apiClient.interceptors.request.use(
  (config) => {
    // secretKey'i doğru bir şekilde tanımlayın ve içe aktarın
    const secretKey = import.meta.env.VITE_SECRET_KEY; // Örnek olarak

    const encryptedToken = localStorage.getItem('encryptedToken') || null;

    // encryptedToken'ın null olmadığını kontrol edin
    if (encryptedToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const token = bytes.toString(CryptoJS.enc.Utf8);

      // Token varsa, Authorization başlığını ayarlayın
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      // Token yoksa, bir hata mesajı veya uyarı gösterebilirsiniz
      console.warn('Token bilgisi bulunamadı.');
    }

    return config;
  },
  (error) => {
    // İstek hatası durumunda, hata ile ilgili bilgiyi loglayın
    console.error('Axios istek hatası:', error);
    return Promise.reject(error);
  }
);


export default apiClient;

