<template>
  <div class="max-w-4xl w-full">
    <h3 class="font-poppins text-[#090909] my-10 text-xl">Üretim Dosyasını Ekleyin</h3>
    <file-pond name="design_image" ref="singlePond" :allowMultiple="false"
      acceptedFileTypes="image/jpeg, image/png, image/gif, image/svg+xml, application/pdf"
      labelIdle='Tasarım dosyasını Buraya ekleyiniz <span class="filepond--label-action"> Gözat </span>'
      @updatefiles="handleSingleFileUpdate" />

    <button @click="onUpload" type="button"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
      Tasarım Güncelle
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/api/apiClient';
import { useRouter, useRoute } from 'vue-router';
import vueFilePond from 'vue-filepond';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Register the plugins
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);


const router = useRouter();
const route = useRoute();

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
});

const singleFile = ref(null);

// Handle single file update
const handleSingleFileUpdate = (fileItems) => {
  singleFile.value = fileItems.length > 0 ? fileItems[0].file : null;
};


// Dosya yükleme işlemi tamamlandığında bu fonksiyonu çağırın
const onUpload = async () => {
  const formData = new FormData();

  // Check if there's a single file to upload
  if (singleFile.value) {
    formData.append('image', singleFile.value);
  }


  try {
    // POST isteğini yapın
    const response = await apiClient.post(`/upload-production-image/${props.orderId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          router.push(`/dashboard/tasarimci/uretim-bekleyen`); // Yönlendirme işlemini gerçekleştir
        }
      });

    } else if (response.data.error) {

      toast(response.data.error, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
      });
    }
  } catch (error) {
    console.log(error);
    toast(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};

</script>
