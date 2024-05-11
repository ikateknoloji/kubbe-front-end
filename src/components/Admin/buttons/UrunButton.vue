<template>
  <button type="button" @click="store.downloadImage(url.id, 'PR')"
    class="text-white bg-[#050708] hover:bg-[#050708] focus:ring-4 focus:ring-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#0f1518] dark:focus:ring-gray-600 mr-2 mb-2">
    Ürün Resmi
  </button>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

const props = defineProps({
  url: Object
});
const store = useMangeOrderStore();
</script>
