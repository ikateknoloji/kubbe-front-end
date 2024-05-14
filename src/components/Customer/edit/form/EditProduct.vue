<template>
  <div class="mb-5">
    <UrunButton :url="data.order" />
  </div>
  <form @submit.prevent="onProductReadyImageUpload">
    <div class="max-w-7xl w-full">
      <div class="flex items-center justify-center w-full mb-10">
        <label for="product-ready-image-dropzone"
          class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onProductReadyImageDrop">
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
          <div v-if="productReadyImage" class="flex justify-center w-full p-4">
            <img v-if="productReadyImageType.value && productReadyImageType.value.startsWith('image/')"
              :src="productReadyImage" class="" />
            <object v-else :data="productReadyImage" class="w-full h-96" type="application/pdf">
              <p>PDF dosyası . <a :href="productReadyImage">Dosyayı indir</a>.</p>
            </object>
          </div>
          <input id="product-ready-image-dropzone" type="file" class="hidden" @change="onProductReadyImageChange"
            ref="productReadyImageInput" />
        </label>
      </div>
      <button type="submit" :disabled="!productReadyImage"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
        Ürün Hazır Resmini Güncelle
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

import UrunButton from '@/components/Admin/buttons/UrunButton.vue';
import apiClient from '@/api/apiClient';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const productReadyImageInput = ref(null);
const productReadyImage = ref(null);
const productReadyImageType = ref(null);

const onProductReadyImageChange = () => {
  const file = productReadyImageInput.value.files[0];
  productReadyImageType.value = file.type;

  if (productReadyImageType.value.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      productReadyImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (productReadyImageType.value === 'application/pdf') {
    productReadyImage.value = URL.createObjectURL(file);
  } else {
    console.error('Unsupported file type:', productReadyImageType.value);
  }
};

const onProductReadyImageDrop = (e) => {
  productReadyImageInput.value.files = e.dataTransfer.files;
  onProductReadyImageChange();
};

const onProductReadyImageUpload = async () => {
  const formData = new FormData();
  formData.append('product_ready_image', productReadyImageInput.value.files[0]);

  try {
    const response = await apiClient.post(`/update-product-ready-image/${props.data.order.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.message) {
      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          router.push(`/dashboard/admin/orders/${props.data.order.original_status}/${props.data.order.id}/edit`);
        }
      });
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};
</script>
