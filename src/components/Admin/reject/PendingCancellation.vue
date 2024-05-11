<template>
  <div class="flex flex-col p-5 box box--stacked mb-10">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Red Sebebi</div>
    <div v-if="order" class="mb-5">
      <div class=" mb-5 bg-red-50/20 p-4 rounded-lg min-w-full ">
        <p class="mb-5">{{ order.order_cancel_request.title }}</p>
        <p class="mb-5">{{ order.order_cancel_request.reason }}</p>
      </div>
      <div class="flex items-center space-x-3 p-4 ">
        <button type="button" class="text-white bg-[#B91C1C] hover:bg-[#B91C1C]/85 focus:ring-4 focus:ring-[#B91C1C]/20 font-medium rounded-lg text-sm px-5 py-2.5
          text-center inline-flex items-center  mr-2 mb-2" @click="isOpen = true">
          Siparişi İptal Et
        </button>
        <button type="button" @click="activetOrder(order.id)"
          class="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
          Siparişi Aktif Hale Getir
        </button>
      </div>
    </div>
  </div>
  <div v-show="isOpen" class="fixed w-full h-full bottom-0 -left-5 right-0 top-0 bg-black opacity-30 z-10"
    @click="isOpen = false"></div>
  <div v-show="isOpen"
    class="z-50 fixed min-w-fit max-h-screen top-44 left-1/2 flex items-center justify-center bg-gray-700 bg-opacity-50  -translate-x-1/2">
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl">Şipariş İptal İşlemleri</h3>
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
              * Sipariş İptal Nedeni Başlığı
            </label>
            <input type="text"
              class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f8fafb] border-gray-400"
              v-model="title">
          </div>
          <div class="w-full max-w-2xl">
            <label class="text-[#4a4848] text-sm block mb-4">
              * Siparişi İptal Nedeni
            </label>
            <textarea
              class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
              rows="4" v-model="reason" maxlength="256">
          </textarea>

            <p class="text-gray-500 mt-2 text-xs">*Siparişin iptal nedeni ilgili olarak oluşturduğunuz özel bir
              mesajınız varsa
              giriniz.(En Fazla 256 karakter)</p>

            <div class="mt-10">
              <button @click="isOpen = false"
                class="px-6 py-[9px] text-red-800 border border-red-600 rounded mr-2">İptal</button>
              <button type="button" @click="cancelOrder(order.id)"
                class="py-3 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Sipariş İptal
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

const cancelOrder = async (orderId) => {
  try {
    // HTTP POST isteği gönder
    const response = await apiClient.post(`/orders-cancel`, {
      'order_id': orderId,
      'title': title.value,
      'reason': reason.value
    });

    // İsteğin başarılı olup olmadığını kontrol et
    if (response.status === 200) {

      toast('Şipariş başarıyla İptal Edildi!', {
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          title.value = '';
          reason.value = '';
          router.push(`/dashboard/admin/orders`); // Yönlendirme işlemini gerçekleştir
        }
      });

    }
  } catch (error) {
    toast.error(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};



const activetOrder = async (orderId) => {
  try {
    // HTTP POST isteği gönder
    const response = await apiClient.post(`/orders-activate/${orderId}`,);

    // İsteğin başarılı olup olmadığını kontrol et
    if (response.status === 200) {

      toast('Şipariş başarıyla Aktif Hale Getirildi!', {
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          title.value = '';
          reason.value = '';
          router.push(`/dashboard/admin/orders`); // Yönlendirme işlemini gerçekleştir
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

<style scoped>
.box {
  box-shadow: 0 3px 5px #0000000b;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: .6rem;
  position: relative;
}

.box--stacked:before {
  content: "";
  z-index: -1;
  box-shadow: 0 1px 2px #0000000d;
  height: 100%;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  position: absolute;
  border-radius: .5rem;
  left: .875rem;
  right: .875rem;
  top: 0;
  margin-top: .75rem;
}
</style>