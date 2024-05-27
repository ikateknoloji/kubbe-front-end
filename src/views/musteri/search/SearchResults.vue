<template>
  <div v-if="searchResults">
    <div v-if="searchResults.orders.data.length > 0">
      <PageTitle text="Arama Sonuçları" />
      <Cards :order="searchResults.orders.data" />
      <Pagination v-if="searchResults.orders?.last_page > 1" :paginationData="searchResults.orders"
        :fetchPage="fetchAllOrdersByPage" />
    </div>
    <div v-else class="min-h-[300px] flex flex-col items-center justify-center">
      <p class="text-center text-gray-500 text-4xl">
        Arama sonuçları bulunamadı.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import apiClient from '@/api/apiClient';

import PageTitle from '@/components/PageTitle.vue';
import Cards from '@/components/Customer/Cards.vue';
import Pagination from '@/components/Customer/Pagination.vue';

const route = useRoute();

const searchResults = ref(null); // Arama sonuçlarını saklamak için bir ref

async function fetchAllOrdersByPage(url) {
  try {
    const response = await apiClient.get(url);
    searchResults.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  const searchQuery = route.query.q;
  if (searchQuery) {

    const response = await apiClient.get(`/customer/search`, { params: { q: searchQuery } });

    // Sonuçları JSON formatında dönüştürün
    searchResults.value = response.data;

  }
});
</script>

<style scoped></style>