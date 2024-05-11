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
    <CoverContent title="Üretici Güncelle">
      <EditManufacturer :data="data" />
    </CoverContent>
    <div class="grid grid-cols-2 gap-4">
      <CoverContent title="Logo Güncelle">
        <EditLogo :data="data" />
      </CoverContent>
      <CoverContent title="Tasarımı Güncelle">
        <EditDesign :data="data" />
      </CoverContent>
    </div>
    <CoverContent title="Dekont Güncelle">
      <EditDekont :data="data" />
    </CoverContent>
  </div>
</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';
import EditCustomerInfo from '@/components/Admin/edit/form/EditCustomerInfo.vue';
import EditBillInfo from '@/components/Admin/edit/form/EditBillInfo.vue';
import EditAdress from '@/components/Admin/edit/form/EditAdress.vue';
import EditLogo from '@/components/Admin/edit/form/EditLogo.vue';
import EditDesign from '@/components/Admin/edit/form/EditDesign.vue';
import EditDekont from '@/components/Admin/edit/form/EditDekont.vue';
import EditManufacturer from '@/components/Admin/edit/form/EditManufacturer.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style scoped></style>