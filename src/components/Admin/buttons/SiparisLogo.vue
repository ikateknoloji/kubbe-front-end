<template>
  <button type="button" @click="store.downloadImage(url.id, 'L')"
    class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
    Sipariş Logo
  </button>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

const props = defineProps({
  url: Object
});
const store = useMangeOrderStore();
</script>
