<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// Burda HSStaticMethods metodu başlatılır.
onMounted(() => {
  userStore.loadEncryptedData();
  setTimeout(() => {
    window.HSStaticMethods.autoInit();
  }, 100);
});


</script>

<style scoped></style>
