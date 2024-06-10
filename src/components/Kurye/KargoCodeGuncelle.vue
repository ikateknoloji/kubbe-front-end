<template>
  <div class="max-w-4xl w-full">
    <div class="flex items-center justify-center w-full mb-10">
      <label for="transition-file"
        class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onDrop">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Yüklemek için tıklayın</span> veya
            sürükleyip bırakın</p>
          <p class="text-xs text-gray-500">JPEG, PNG, JPG, GIF veya SVG (MAKS. 2048KB)</p>
        </div>
        <div v-if="image" class="flex justify-center w-full p-4">
          <img :src="image" class="w-full h-auto" />
        </div>
        <input id="transition-file" type="file" class="hidden" @change="onChange" ref="fileInput" />
      </label>
    </div>
    <button @click="onUpload" type="button" :disabled="!image"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none">
      Kargo Kodunu Güncelle
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
import { toast } from 'vue3-toastify';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();

const fileInput = ref(null);
const image = ref(null);

const props = defineProps({
  orderId: {
    type: Number,
    required: true
  }
});


const onChange = () => {
  const file = fileInput.value.files[0];
  if (file && file.type.startsWith('image/') && file.size <= 100048 * 1024) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    toast('Lütfen geçerli bir resim dosyası yükleyin (MAKS. 2048KB).', { autoClose: 3000 });
  }
};

const onDrop = (e) => {
  fileInput.value.files = e.dataTransfer.files;
  onChange();
};

const onUpload = async () => {
  if (!fileInput.value.files.length) {
    toast('Lütfen bir resim dosyası seçin.', { autoClose: 3000 });
    return;
  }

  const formData = new FormData();
  formData.append('product_in_transition_image', fileInput.value.files[0]);

  try {
    const response = await apiClient.post(`/update-cargo-code/${props.orderId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.message) {
      toast(response.data.message, {
        autoClose: 3000,
        onClose: () => {
          router.push('/dashboard/kurye/kargo-teslim/');
        }
      });
    } else {
      toast(response.data.error, { autoClose: 3000 });
    }
  } catch (error) {
    console.log(error);
    toast(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};
</script>
