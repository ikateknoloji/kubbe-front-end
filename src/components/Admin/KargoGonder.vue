<template>
  <CoverContent title="Kargoya Gönder">
    <div v-if="!(order.offer_price === order.paid_amount)">
      <div
        class="max-w-3xl flex-col block xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0 border p-5 rounded-lg mb-10">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-96 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center pt-5">
              <div class="font-medium">Ödenen Sipariş Tutarını Giriniz.</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen bir şipariş adı oluşturun. Bu
              bilgiler gereklidir.</div>
          </div>
        </label>
        <input type="number"
          class="py-4 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
          v-model="state.paidAmount" placeholder="Ödenen Tutar" />

      </div>
      <div class="max-w-64 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <button type="button" @click="updatePayment(order.id)"
          class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Ödenen Tutarı Güncelle
        </button>
        <button type="button" @click="closePayment(order.id)"
          class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-950 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Hesabı Kapat
        </button>
      </div>
    </div>

    <div v-if="order.shipping_status === 'N'" class="mt-10">
      <button type="button" @click="shipOrder(order.id)"
        class="w-full md:w-fit whitespace-nowrap py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-950 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Siparişi Kargoya Gönder
      </button>
    </div>
  </CoverContent>
</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';
import apiClient from '@/api/apiClient'; // apiClient'ı doğru yere göre ayarla
import { reactive } from 'vue';

import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter } from 'vue-router';


const router = useRouter();


const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

// Reaktif bir nesne oluşturuyoruz
const state = reactive({
  paidAmount: 0
});

// Ödeme doğrulama fonksiyonunu güncelle
const updatePayment = async (id) => {
  try {
    const response = await apiClient.post(`/update-payment-amount/${id}`, { paid_amount: state.paidAmount });

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          router.push(`/dashboard/admin/orders/${props.order.original_status}/${props.order.id}/edit`);
        }
      });
    }

  } catch (error) {
    toast.error(error.response?.data?.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
    console.log(error)
  }
};

// Ödeme doğrulama fonksiyonunu güncelle
const closePayment = async (id) => {
  try {
    const response = await apiClient.get(`/close-account/${id}`);

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          router.push(`/dashboard/admin/orders/${props.order.original_status}/${props.order.id}/edit`);
        }
      });
    }

  } catch (error) {
    toast.error(error.response?.data?.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
    console.log(error)
  }
};

// Ödeme doğrulama fonksiyonunu güncelle
const shipOrder = async (id) => {
  try {
    const response = await apiClient.post(`/ship-order/${id}`);

    // Yanıtı işleyin
    if (response.data.message) {

      toast(response.data.message, {
        autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          router.push(`/dashboard/admin/orders/PR`);
        }
      });
    }

  } catch (error) {
    toast.error(error.response?.data?.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
    console.log(error)
  }
};

</script>

<style scoped></style>