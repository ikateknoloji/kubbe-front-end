<template>
  <tbody>
    <tr v-for="(item, i ) in data" :key="item.id" class="odd:bg-white even:bg-gray-300/30 hover:bg-blue-500/10 ">
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-blue-500 ">
        {{ i + 1 }}
      </td>

      <td v-if="item.product_category" class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ item.product_category.category }}
      </td>

      <td v-if="item.product_type" class="flex items-center px-6 py-4 text-[#292D32]">
        <span class="w-32">
          {{ item.product_type.product_type }}
        </span>
      </td>
      <td v-else class="flex items-center px-6 py-4 text-[#292D32]">
        <span class="w-32">
          {{ item.type }}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ item.color }}
      </td>

      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ item.quantity }}
      </td>

    </tr>
  </tbody>
</template>

<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

</script>

<style scoped></style>