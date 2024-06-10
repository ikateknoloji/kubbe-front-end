<template>
  <div>
    <PageTitle text="Teslim Edilen Siparişler" />
    <Cards :order="order" />
  </div>
  <div v-if="order?.length > 0">
    <div class="mt-10 max-w-7xl h-96 p-4 mx-auto sm:px-6 lg:px-8 bg-blue-50 flex items-center justify-center">
      <p class="text-center text-2xl text-gray-500 ">Reddedilen Sipariş Bulunmamaktadır.</p>
    </div>
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
