<template>
  <button type="button" @click="store.downloadImage(url.id, 'SC')"
    class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
    Kargo Kodu Resmi
  </button>
</template>

<script setup>
import { useMangeOrderStore } from '@/stores/orderManage.js';

const props = defineProps({
  url: Object
});
const store = useMangeOrderStore();
</script>
