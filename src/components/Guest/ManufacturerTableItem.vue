<template>
  <tbody>
    <tr v-for="(item, i ) in allManufacturers" :key="item.id" class="odd:bg-white even:bg-gray-300 hover:bg-blue-500 ">
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        {{ i + 1 }}
      </td>
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        <div v-if="item.profile_photo"
          class="relative inline-block h-[4rem] w-[4rem] rounded-full overflow-hidden bg-center bg-cover"
          :style="{ backgroundImage: `url(${item.profile_photo})` }">
        </div>
        <div v-else>
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="user-icon" class="w-[50px]" />
        </div>
      </td>
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        {{ item.name }}
      </td>
      <td v-if="item.phone" class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        {{ item.phone }}
      </td>
      <td v-else class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        Yok
      </td>
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        {{ item.email }}
      </td>
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        <router-link :to="`/`">
          <div
            class="bg-zinc-100 duration-150 hover:!border-b-2 text-blue-950 rounded-xl drop-shadow-lg group flex items-center border-2 border-b-4 border-blue-950 cursor-pointer active:bg-zinc-300">
            <div class="py-2 pl-3">
              <i class="fad fa-party-horn text-xl"></i>
            </div>
            <div class="py-2 px-3">
              Sipariş Geçmişi
            </div>
          </div>
        </router-link>
      </td>
      <td class="lg:px-6 px-2 lg:py-4 py-1 whitespace-nowrap text-sm font-medium text-gray-800 ">
        <router-link :to="`/`">
          <div
            class="bg-zinc-100 duration-150 hover:!border-b-2 text-blue-950 rounded-xl drop-shadow-lg group flex items-center border-2 border-b-4 border-blue-950 cursor-pointer active:bg-zinc-300">
            <div class="py-2 pl-3">
              <i class="fad fa-party-horn text-xl"></i>
            </div>
            <div class="py-2 px-3">
              Güncel Siparişler
            </div>
          </div>
        </router-link>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/api/apiClient';

const allManufacturers = ref(null);

async function fetchAllManufacturers() {
  try {
    const response = await apiClient.post('/roles/select-role', {
      "roleName": "uretici"
    });
    allManufacturers.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  fetchAllManufacturers()
})
</script>

<style scoped></style>