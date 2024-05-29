<template>
  <div v-if="loading" class="fixed inset-0 min-h-[100vh] flex items-center justify-center  bg-opacity-75 z-50 ">
    <div class="w-96 h-32 bg-[#ffffff] flex items-center justify-center shadow-[0px_10px_10px_5px_rgba(0,0,0,0.1)]">
      <div class="spinner-border text-gray-200 mr-3" role="status">
        <span class="sr-only">Yükleniyor...</span>
      </div>
      <div class="font-poppins text-base">Bilgiler Yükleniyor...</div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/loadingStore';

const userStore = useUserStore();
const loadingStore = useLoadingStore();

// Burda HSStaticMethods metodu başlatılır.
onMounted(() => {
  userStore.loadEncryptedData();
  setTimeout(() => {
    window.HSStaticMethods.autoInit();
  }, 100);
});


const loading = computed(() => loadingStore.loading);
</script>

<style scoped>
.spinner-border {
  width: 2rem;
  height: 2rem;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border .75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>