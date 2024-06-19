<template>
  <div v-if="data">
    <CoverContent title="Müşteri Bilgilerini Düzenle">
      <EditCustomerInfo :data="data" />
    </CoverContent>
    <CoverContent v-if="data.order.invoice_info" title="Fatura Bilgilerini Düzenle">
      <EditBillInfo :data="data" />
    </CoverContent>
    <CoverContent title="Sipariş Adresini Düzenle">
      <EditAdress :data="data" />
    </CoverContent>
    <div class="grid grid-cols-2 gap-4">
      <CoverContent title="Dekont Güncelle">
        <EditDekont :data="data" />
      </CoverContent>
    </div>
  </div>
</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';
import EditCustomerInfo from '@/components/Customer/edit/form/EditCustomerInfo.vue';
import EditBillInfo from '@/components/Customer/edit/form/EditBillInfo.vue';
import EditAdress from '@/components/Customer/edit/form/EditAdress.vue';
import EditDekont from '@/components/Customer/edit/form/EditDekont.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped></style>