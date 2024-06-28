<template>
  <div v-if="data">
    <CoverContent title="Müşteri Bilgilerini Düzenle">
      <EditCustomerInfo :data="data" />
    </CoverContent>
    <CoverContent title="Sipariş Notunu Düzenle">
      <EditOrder :data="data" />
    </CoverContent>
  </div>
</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';
import EditCustomerInfo from '@/components/Admin/edit/form/EditCustomerInfo.vue';
import EditOrder from '@/components/Admin/edit/form/EditOrder.vue';


const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped></style>