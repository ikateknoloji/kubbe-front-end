<template>
  <div class="mb-5">
    <TasarimButton :url="data.order" />
  </div>
  <form @submit.prevent="onDesignUpload">
    <div class="max-w-7xl w-full">
      <div class="flex items-center justify-center w-full mb-10">
        <!-- 'dropzone-file' id'sini 'design-dropzone-file' olarak değiştirin -->
        <label for="design-dropzone-file"
          class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onDesignDrop">
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

          <!-- 'image' yerine 'designImage' kullanın -->
          <div v-if="designImage" class="flex justify-center w-full p-4">
            <!-- 'fileType' yerine 'designFileType' kullanın -->
            <img v-if="designFileType.value && designFileType.value.startsWith('image/')" :src="designImage" class="" />
            <object v-else :data="designImage" class="w-full h-96" type="application/pdf">
              <p>PDF dosyası . <a :href="designImage">Dosyayı indir</a>.</p>
            </object>
          </div>
          <!-- 'fileInput' yerine 'designFileInput' kullanın -->
          <input id="design-dropzone-file" type="file" class="hidden" @change="onDesignChange" ref="designFileInput" />
        </label>
      </div>
      <!-- 'onUpload' yerine 'onDesignUpload' kullanın -->
      <button type="submit" :disabled="!designImage"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
        Tasarım Dosyasını Güncelle
        <!-- SVG aynı kalabilir -->
      </button>
    </div>
  </form>
</template>

<script setup>
import apiClient from '@/api/apiClient';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 'fileInput' yerine 'designFileInput' kullanın
const designFileInput = ref(null);
// 'image' yerine 'designImage' kullanın
const designImage = ref(null);
// 'fileType' yerine 'designFileType' kullanın
const designFileType = ref(null);

// 'onChange' yerine 'onDesignChange' kullanın
const onDesignChange = () => {
  const file = designFileInput.value.files[0];
  designFileType.value = file.type;

  if (designFileType.value.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      designImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (designFileType.value === 'application/pdf') {
    designImage.value = URL.createObjectURL(file);
  } else {
    console.error('Unsupported file type:', designFileType.value);
  }
};

// 'onDrop' yerine 'onDesignDrop' kullanın
const onDesignDrop = (e) => {
  designFileInput.value.files = e.dataTransfer.files;
  onDesignChange();
};

// 'onUpload' yerine 'onDesignUpload' kullanın
const onDesignUpload = async () => {
  const formData = new FormData();
  formData.append('design_image', designFileInput.value.files[0]);

  try {
    const response = await apiClient.post(`/update-design/${props.data.order.id}`, formData, {
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
    } else if (response.data.error) {
      console.log(response.data);
      toast(response.data.error, {
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data, {
      autoClose: 3000,
    });
  }
};
</script>
