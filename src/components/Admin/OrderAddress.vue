<template>
  <CoverContent title="Sipariş Adresi">
    <div class="max-w-7xl font-normal py-8 px-8 my-5 border bg-gray-50/20 text-slate-900 rounded-md text-base">
      {{ address }}
    </div>
  </CoverContent>

</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';
const props = defineProps({
  address: {
    type: String,
    required: true
  }
});

</script>
