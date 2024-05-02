<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

// Burda HSStaticMethods metodu başlatılır.
onMounted(() => {
  setTimeout(() => {
    window.HSStaticMethods.autoInit();
  }, 100);
});

</script>

<style scoped></style>
