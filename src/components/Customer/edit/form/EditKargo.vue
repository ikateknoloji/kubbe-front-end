<template>
  <div class="mb-5">
    <TasarimButton :url="data.order" />
  </div>
  <form @submit.prevent="onProductInTransitionUpload">
    <div class="max-w-4xl w-full">
      <div class="flex items-center justify-center w-full mb-10">
        <label for="product-in-transition-image-dropzone"
          class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onProductInTransitionDrop">
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
          <div v-if="productInTransitionImage" class="flex justify-center w-full p-4">
            <img :src="productInTransitionImage" class="" />
          </div>
          <input id="product-in-transition-image-dropzone" type="file" class="hidden"
            @change="onProductInTransitionChange" ref="productInTransitionImageInput" />
        </label>
      </div>
      <button type="submit" :disabled="!productInTransitionImage"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
        Ürün Geçiş Resmini Güncelle
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import apiClient from '@/api/apiClient';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const productInTransitionImageInput = ref(null);
const productInTransitionImage = ref(null);

const onProductInTransitionChange = () => {
  const file = productInTransitionImageInput.value.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      productInTransitionImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    toast.error('Desteklenmeyen dosya türü.');
  }
};

const onProductInTransitionDrop = (e) => {
  productInTransitionImageInput.value.files = e.dataTransfer.files;
  onProductInTransitionChange();
};

const onProductInTransitionUpload = async () => {
  const formData = new FormData();
  formData.append('product_in_transition_image', productInTransitionImageInput.value.files[0]);

  try {
    const response = await apiClient.post(`/api/orders/${props.data.order.id}/product-in-transition`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.message) {
      toast(response.data.message, {
        autoClose: 3000,
        onClose: () => {
          router.push(`/dashboard/admin/orders/${props.data.order.original_status}/${props.data.order.id}/edit`);
        }
      });
    }
  } catch (error) {
    toast.error(error.response.data, {
      autoClose: 3000,
    });
  }
};
</script>
