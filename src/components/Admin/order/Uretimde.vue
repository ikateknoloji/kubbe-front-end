<template>
  <div>
    <PageTitle text="Üretim Bekleyen Siparişler" />
    <Cards :order="order" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Admin/Cards.vue';

const props = defineProps({
  order: Object
});

</script>

<style scoped></style>
