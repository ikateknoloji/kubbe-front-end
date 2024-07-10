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
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        {{ item.unit_price }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm  text-[#292D32] ">
        <button @click="deleteBasketItem(item.id)"
          class="group relative inline-flex border border-[#c64646] focus:outline-none lg:ml-4 lg:inline-flex">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[#c64646] text-center font-semibold bg-white ring-1 ring-[#c64646] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Sipariş Kalemini Sil
          </span>
        </button>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
import apiClient from '@/api/apiClient';
import { defineProps } from 'vue';
import { toast } from 'vue3-toastify' // Vue3-Toastify'ı içe aktar


const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const deleteBasketItem = async (id) => {
  try {
    await apiClient.post(`/delete-basket-items/${id}`);
    // Başarılı bir şekilde silindiğinde listeden sil
    const index = props.data.findIndex(item => item.id === id);
    if (index !== -1) {
      props.data.splice(index, 1);
    }
    toast.success('Sipariş kalemi başarıyla eklendi!');

  } catch (error) {
    console.error('Error deleting basket item:', error);
  }
};
</script>

<style scoped></style>