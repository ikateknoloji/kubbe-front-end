<template>
  <button @click="goBack"
    class="fixed-back-button text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
    Bir Önceki Sayfa
  </button>
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
  top: 140px;
  /* Alt kısımdan 20px yukarıda */
  right: 20px;
  /* Sağ kısımdan 20px içeride */
  /* Düğme stilini isteğinize göre özelleştirin */
  z-index: 100;
}
</style>
