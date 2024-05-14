<template>
  <thead>
    <tr>
      <th v-for="(column, index) in columns" :key="index" scope="col"
        class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
        {{ column }}
      </th>
    </tr>
  </thead>
</template>

<script setup>

// Sütun bilgilerini props'tan al
const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
});
</script>

<style scoped></style>
