<template>
  <CoverContent title="Sipariş İptal Talebi">
    <div class="min-w-full max-h-screen ">
      <div class="max-w-7xl p-6 bg-white rounded-md">
        <div class="mt-4">
          <div class="w-full gap-4 mb-10 px-8 mt-10">
            <div class="w-full max-w-2xl">
              <label class="text-[#4a4848] text-sm block mb-4">
                * Sipariş Red Nedeni Başlığı
              </label>
              <input type="text"
                class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f8fafb] border-gray-400"
                v-model="cancelRequestData.title">
            </div>
            <div class="w-full max-w-2xl">
              <label class="text-[#4a4848] text-sm block mb-4">
                * Siparişi Reddetme Nedeni
              </label>
              <textarea
                class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
                rows="4" v-model="cancelRequestData.reason" maxlength="256">
              </textarea>

              <p class="text-gray-500 mt-2 text-xs">*Siparişin redetme nedeni ilgili olarak oluşturduğunuz özel bir
                mesajınız varsa
                giriniz.(En Fazla 256 karakter)</p>

              <div class="mt-10">
                <button type="button" @click="submitCancelRequest()"
                  class="py-3 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Sipariş Reddet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CoverContent>

</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRoute, useRouter } from 'vue-router' // Vue Router'ı içe aktar

import apiClient from '@/api/apiClient';
import CoverContent from '@/components/CoverContent.vue';


const router = useRoute();
const route = useRouter();

const cancelRequestData = ref({
  title: '',
  reason: ''
});


const submitCancelRequest = async () => {
  try {
    // HTTP POST isteği gönder
    const response = await apiClient.post(`/order-cancel-requests/${router.params.id}`, cancelRequestData.value);

    // İsteğin başarılı olup olmadığını kontrol et
    if (response.status === 200) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          route.push(`/dashboard/admin/orders/${router.params.status}/${router.params.id}`);
        }
      });

    }
  } catch (error) {
    toast.error(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};


</script>

<style scoped></style>