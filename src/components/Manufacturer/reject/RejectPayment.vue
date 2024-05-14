<template>
  <div class="w-full">
    <button type="button" @click="isOpen = true"
      class="w-full md:w-fit py-3 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      Ödeme Red
    </button>
  </div>
  <div v-show="isOpen" class="fixed w-full h-full bottom-0 -left-5 right-0 top-0 bg-black opacity-30 z-10"
    @click="isOpen = false"></div>
  <div v-show="isOpen"
    class="z-50 fixed min-w-fit max-h-screen top-44 left-1/2 flex items-center justify-center bg-gray-700 bg-opacity-50  -translate-x-1/2">
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Ödeme Red</h3>
        <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="mt-4">
        <!--Note-->
        <div class="w-full gap-4 mb-10 px-8 mt-10">
          <div class="w-full max-w-2xl">
            <label class="text-[#4a4848] text-sm block mb-4">
              * Ödeme Red Nedeni Başlığı
            </label>
            <input type="text"
              class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f8fafb] border-gray-400"
              v-model="title">
          </div>
          <div class="w-full max-w-2xl">
            <label class="text-[#4a4848] text-sm block mb-4">
              * Ödeme Reddetme Nedeni
            </label>
            <textarea
              class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
              rows="4" v-model="reason" maxlength="256">
          </textarea>

            <p class="text-gray-500 mt-2 text-xs">*Siparişin redetme nedeni ilgili olarak oluşturduğunuz özel bir
              mesajınız varsa
              giriniz.(En Fazla 256 karakter)</p>

            <div class="mt-10">
              <button @click="isOpen = false"
                class="px-6 py-[9px] text-red-800 border border-red-600 rounded mr-2">İptal</button>
              <button type="button" @click="rejectOrder(order.id)"
                class="py-3 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Ödeme Reddet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter } from 'vue-router' // Vue Router'ı içe aktar

import apiClient from '@/api/apiClient';


const router = useRouter();

let title = ref('');
let reason = ref('');

let isOpen = ref(false);

const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

const rejectOrder = async (orderId) => {
  try {
    // HTTP POST isteği gönder
    const response = await apiClient.post(`/rejected-orders/${orderId}`, {
      'title': title.value,
      'reason': reason.value
    });

    // İsteğin başarılı olup olmadığını kontrol et
    if (response.status === 200) {

      toast('Şipariş başarıyla reddedildi!', {
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          title.value = '';
          reason.value = '';
          router.push(`/dashboard/admin/orders`); // Yönlendirme işlemini gerçekleştir
        }
      });

    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};


</script>

<style scoped></style>