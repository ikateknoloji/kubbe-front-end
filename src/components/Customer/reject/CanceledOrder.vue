<template>
  <div v-if="order.rejected_order" class="flex flex-col p-5 box box--stacked mb-10">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">İptal Edilme Sebebi
    </div>
    <div v-if="order" class="mb-5">
      <div class=" mb-5 bg-red-50/20 p-4 rounded-lg min-w-full ">
        <p class="mb-5 text-xl border-b border-slate-300/70 pb-4">{{ order.rejected_order.title }}</p>
        <p class="mb-5">{{ order.rejected_order.reason }}</p>
      </div>
    </div>
  </div>
  <div v-if="order.order_cancel_request" class="flex flex-col p-5 box box--stacked mb-10">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">İptal Edilme Sebebi
    </div>
    <div v-if="order" class="mb-5">
      <div class=" mb-5 bg-red-50/20 p-4 rounded-lg min-w-full ">
        <p class="mb-5 text-xl border-b border-slate-300/70 pb-4">{{ order.order_cancel_request.title }}</p>
        <p class="mb-5">{{ order.order_cancel_request.reason }}</p>
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
    const response = await apiClient.post(`/orders-cancel`, {
      'order_id': orderId,
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