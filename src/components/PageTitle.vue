<template>
  <h3 class="text-black-800 text-2xl lg:text-4xl tracking-[-1.5px] font-poppins font-medium py-10 px-4">
    {{ text }}
  </h3>
</template>

<script setup>
const props = defineProps({
  text: String
})
</script>

<style scoped></style>