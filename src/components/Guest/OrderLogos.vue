<template>
  <div v-if="logos.length > 0" class="flex items-center justify-start gap-3 mb-4 px-5">
    <div v-for="(logo, index) in logos" :key="index" class="">
      <div class="flex flex-col">
        <button @click="downloadImage(logo.logo_path)"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
          Dosyayı İndir
        </button>
        <a :href="getFullUrl(logo.logo_path)" target="_blank"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
          Dosyayı Görüntüle
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import apiClient from '@/api/apiClient'; // Axios instance

const props = defineProps({
  logos: {
    type: Array,
    required: true
  }
});

const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;
const getFullUrl = (logoUrl) => { return `${baseURL}${logoUrl}` };

const downloadImage = async (logoUrl) => {

  try {
    const response = await apiClient.post(
      '/dowload-logo-file', // API endpoint URL
      {
        url: logoUrl, // Bu parametre olarak gönderilecek
      },
      {
        responseType: 'blob' // Bu, yanıtın bir blob olarak işlenmesini sağlar
      }
    );

    // Yanıt başlıklarından mimeType ve filename bilgilerini alın
    const mimeType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition
      ? contentDisposition.split('filename=')[1].split(';')[0].replace(/['"]/g, '')
      : 'downloaded_file'; // Varsayılan dosya adı

    // İndirme işlemini başlatmak için bir bağlantı oluşturma
    const url = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Dosya adı
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Dosya indirilemedi:', error);
  }

};


</script>
