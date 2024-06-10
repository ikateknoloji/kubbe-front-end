import './assets/main.css'
import "preline/preline";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue'
import router from './router'

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import CryptoJS from 'crypto-js'; // CryptoJS'i içe aktar

window.Pusher = Pusher;

Pusher.logToConsole = true;

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// localStorage'dan şifrelenmiş token'ı al
const encryptedToken = localStorage.getItem('encryptedToken');

let token = '';
if (encryptedToken) {
 // Token'ı çöz
 const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
 token = bytes.toString(CryptoJS.enc.Utf8);
}

window.Pusher = Pusher;

Pusher.logToConsole = true;

// Echo yapılandırma nesnesi
const echoConfig = {
 broadcaster: 'pusher',
 key: '22d37cd76f03144c6fda',
 cluster: 'eu',
 forceTLS: true,
 authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
};

if (token) {
 echoConfig.auth = {
  headers: {
   Authorization: `Bearer ${token}`, // Çözülmüş token'ı buraya ekle
  },
 };
}

const echo = new Echo(echoConfig);




const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toasity)
app.use(MotionPlugin)
app.provide('echo', echo)

app.mount('#app')
