<template>
  <tbody>
    <tr class="odd:bg-white even:bg-gray-300/30 hover:bg-blue-500/10 ">
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ order.order_name }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ order.status }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ order.note }}
      </td>
    </tr>
  </tbody>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  /* İstediğiniz değeri ayarlayın */
}

.table th,
.table td {
  border: 1px solid #333;
  padding: 8px;
  text-align: left;
}
</style>