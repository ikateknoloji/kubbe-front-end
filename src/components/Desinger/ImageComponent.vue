<template>
  <img :src="src" alt="image" class="h-44 w-auto md:max-w-96 md:h-full mb-0 md:mb-5">
</template>

<script setup>
const props = defineProps({
  src: String
});


</script>
