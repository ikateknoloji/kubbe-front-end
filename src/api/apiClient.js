import axios from 'axios';
import useLoading from '../stores/loading.js';

// useLoading fonksiyonunu çağırın
const { isLoading, setLoading } = useLoading();

// Axios yapılandırmasını oluşturun
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // API adresinizi buraya ekleyin
  //baseURL: "https://app.ikatech.tech/api/", // API adresinizi buraya ekleyin
});

// Axios interceptor ekleyin
apiClient.interceptors.request.use(
  (config) => {

    // localStorage'dan token'ı alın
    const token = localStorage.getItem('token-admin')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // İstek başladığında yükleme durumunu true yap
    setLoading(true);

    return config;
  },
  (error) => {
    // İstek hatası aldığında yükleme durumunu false yap
    setLoading(false);

    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Yanıt geldiğinde yükleme durumunu false yap
    setLoading(false);

    return response;
  },
  (error) => {
    // Yanıt hatası aldığında yükleme durumunu false yap
    setLoading(false);

    return Promise.reject(error);
  }
);

export default apiClient;

