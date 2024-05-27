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

window.Pusher = Pusher;

Pusher.logToConsole = true;

const echo = new Echo({
 broadcaster: 'pusher',
 key: '22d37cd76f03144c6fda',
 cluster: 'eu',
 encrypted: true,
 authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
 auth: {
  headers: {
   Authorization: `Bearer 7|JsXzlf566BC7Cn8MAzwI4gPJEr3I7NqhpXv6ZMBF6f2618b4`,
  },
 },
});




const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toasity)
app.use(MotionPlugin)
app.provide('echo', echo)

app.mount('#app')
