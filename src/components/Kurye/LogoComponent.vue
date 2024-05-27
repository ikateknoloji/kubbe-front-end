<template>
  <div class="mb-5 md:mb-10">
    <ImageComponent v-if="order.formatted_order_images['PR'].mime_type !== 'application/pdf'"
      :src="order.formatted_order_images['PR'].image_url" />
    <PdfComponent v-else :src="order.formatted_order_images['PR'].image_url" />
    <SiparisLogo :url="order" />
  </div>
</template>

<script setup>
import ImageComponent from './ImageComponent.vue'
import PdfComponent from './PdfComponent.vue'
import SiparisLogo from '@/components/Admin/buttons/SiparisLogo.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})



</script>
