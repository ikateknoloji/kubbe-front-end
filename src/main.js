import './assets/main.css'
import "preline/preline";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import App from './App.vue'
import router from './router'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'


const echo = new Echo({
 broadcaster: 'pusher',
 key: 'd9e58dbfce8962bd41f8', // Pusher key
 cluster: 'eu', // Pusher cluster
 forceTLS: false,
 useTLS: false
});


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('echo', echo)
app.use(Vue3Toasity)
app.use(MotionPlugin)
// app.config.devtools = false;

app.mount('#app')
