<template>
  <CoverContent title="Sipariş Notu">
    <div
      class="max-w-5xl font-normal py-5 md:py-8 px-2 md:px-5 lg:px-12 my-3 border bg-gray-50/20 text-gray-900 rounded-md">
      {{ note }}
    </div>
  </CoverContent>
</template>

<script setup>
import CoverContent from '../CoverContent.vue';


const props = defineProps({
  note: {
    type: String,
    required: true
  }
});

</script>
