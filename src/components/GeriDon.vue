<template>
  <div class="md:block hidden">
    <button @click="goBack"
      class="fixed top-44 right-2 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-2 mb-2 z-50">
      <span class="hidden md:inline-block">Bir Önceki Sayfa</span>
      <span class="block md:hidden text-xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path
            d="M18.3749 9.62497H5.6122L10.2436 4.9936L9.00632 3.75635L2.2627 10.5L9.00632 17.2436L10.2436 16.0063L5.6122 11.375H18.3749V9.62497Z"
            fill="#333" />
        </svg>
      </span>
    </button>
  </div>
  <div class="md:hidden block">
    <button @click="goBack"
      class="fixed bottom-8 right-2 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-2 mb-2 z-50">
      <span class="hidden md:inline-block">Bir Önceki Sayfa</span>
      <span class="block md:hidden text-xl">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
          <path
            d="M18.3749 9.62497H5.6122L10.2436 4.9936L9.00632 3.75635L2.2627 10.5L9.00632 17.2436L10.2436 16.0063L5.6122 11.375H18.3749V9.62497Z"
            fill="#333" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1); // Bir önceki sayfaya geri döner
};
</script>

<style>
.fixed-back-button {
  position: fixed;
  /* Sabit pozisyon */
  top: 10px;
  /* Alt kısımdan 20px yukarıda */
  right: 0px;
  /* Sağ kısımdan 20px içeride */
  /* Düğme stilini isteğinize göre özelleştirin */
  z-index: 100;
}
</style>
