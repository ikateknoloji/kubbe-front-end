<template>
  <div>
    <PageTitle text="Üretim Onayı Bekleyen Siparişler" />
    <Cards :order="order" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Manufacturer/Cards.vue';

const props = defineProps({
  order: Object
});

</script>

<style scoped></style>
