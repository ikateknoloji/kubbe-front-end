<template>
  <button type="button" @click="store.downloadImage(url.id, 'D')"
    class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
    Tasarım Dosyası
  </button>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

const props = defineProps({
  url: Object
});
const store = useMangeOrderStore();
</script>
