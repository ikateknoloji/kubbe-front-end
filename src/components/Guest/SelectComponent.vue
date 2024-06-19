<template>
  <div class="max-w-3xl">
    <div class=" ">
      <select v-model="selectedManufacturer"
        class="mb-5 py-3 px-4 pe-9 block w-full border-gray-200/80 rounded-lg text-sm border focus:border-blue-500/80 focus:ring-blue-400/80 disabled:opacity-50 disabled:pointer-events-none focus:outline-none ">
        <option disabled selected>Lütfen Bir Üretici Seçiniz</option>
        <option v-for="manufacturer in allManufacturers" :key="manufacturer.id" :value="manufacturer.id">
          {{ manufacturer.name }} {{ manufacturer.surname }}
        </option>
      </select>

      <div class="flex">
        <button type="button" @click="onUpload()"
          class="w-44 inline-flex text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-8 py-3 text-center  items-center mr-2 mb-2">
          Üretici Seç
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from '@/api/apiClient';
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();


const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
});

const allManufacturers = ref(null);
const selectedManufacturer = ref(null);


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

const onUpload = async () => {
  // FormData nesnesi oluşturun
  const formData = new FormData();
  formData.append('manufacturer_id', selectedManufacturer.value);

  try {
    // POST isteğini yapın
    const response = await apiClient.post(`/orders/${route.params.id}/select-manufacturer`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          router.push(`/dashboard/admin/orders/${route.params.status}`); // Yönlendirme işlemini gerçekleştir
        }
      });

    } else if (response.data.error) {
      toast(response.data.errors[0], {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
      });
    }
  } catch (error) {
    toast(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
    console.error(error.response.data);
  }
};

onMounted(async () => {
  fetchAllManufacturers()
})
</script>
