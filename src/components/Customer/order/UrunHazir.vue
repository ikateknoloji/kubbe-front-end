<template>
  <div>
    <PageTitle text="Hazır Olan Siparişler" />
    <Cards :order="order" />
  </div>

</template>

<script setup>
import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Customer/Cards.vue';

const props = defineProps({
  order: Object
});

</script>

<style scoped></style>
