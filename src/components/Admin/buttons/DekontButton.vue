<template>
  <button type="button" @click="store.downloadImage(url.id, 'P')"
    class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
    Ödeme Dekont Bilgisi
  </button>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

const props = defineProps({
  url: Object
});
const store = useMangeOrderStore();
</script>
