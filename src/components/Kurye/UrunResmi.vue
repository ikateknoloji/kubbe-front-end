<template>
  <div class="max-w-4xl w-full">
    <div class="flex items-center justify-center w-full mb-10">
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onDrop">
        <div class=" flex flex-col items-center justify-center pt-5 pb-6">
          <div>
            <svg class=" w-10 h-10 mb-3 z-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Yüklemek için tıklayın</span> veya
              sürükleyip
              bırakın</p>
            <p class="text-xs text-gray-500 lg:block hidden">SVG, PNG, JPG veya GIF (MAKS. 800x400px)</p>
          </div>
        </div>
        <div v-if="image" class="flex justify-center w-full p-4">
          <!-- Dosya bir resimse, img etiketini kullan -->
          <img v-if="fileType.value && fileType.value.startsWith('image/')" :src="image" class="h-full" />

          <object v-else :data="image" class="w-full h-96" type="application/pdf">
            <p>PDF dosyası . <a :href="image">Dosyayı indir</a>.</p>
          </object>
        </div>

        <input id="dropzone-file" type="file" class="hidden" @change="onChange" ref="fileInput" />
      </label>
    </div>
    <button @click="onUpload" type="button" :disabled="!image"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
      Ürün Resmi Ekle
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import apiClient from '@/api/apiClient';
import { ref } from 'vue';
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

const fileInput = ref(null);
const image = ref(null);

const fileType = ref(null);

const onChange = () => {
  const file = fileInput.value.files[0];

  // Dosyanın MIME türünü alın ve fileType ref'ine kaydedin
  fileType.value = file.type;

  if (fileType.value.startsWith('image/')) {
    // Dosya bir resimse, dosyayı bir Data URL olarak okuyun
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (fileType.value === 'application/pdf') {
    // Dosya bir PDF ise, dosyayı bir Object URL olarak okuyun
    image.value = URL.createObjectURL(file);
  } else {
    // Desteklenmeyen dosya türü
    console.error('Unsupported file type:', fileType.value);
  }
};

const onDrop = (e) => {
  fileInput.value.files = e.dataTransfer.files;
  onChange();
};

// Dosya yükleme işlemi tamamlandığında bu fonksiyonu çağırın
const onUpload = async () => {
  // FormData nesnesi oluşturun
  const formData = new FormData();

  // Yüklenen dosyayı FormData'ya ekleyin
  formData.append('product_ready_image', fileInput.value.files[0]);

  try {
    // POST isteğini yapın
    const response = await apiClient.post(`/orders/${props.orderId}/mark-product-ready`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          router.push(`/dashboard/kurye/urun-hazir/${route.params.status}`); // Yönlendirme işlemini gerçekleştir
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
