<template>
  <div class="flex flex-col p-5 mb-10">
    <div>
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Şirket Adı</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli</div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen Şirketin Adı bilgisini girin.Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0 mr-4">
          <div class="flex flex-col items-center md:flex-row">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400" required
              v-model="invoiceInfo.company_name" />
          </div>
        </div>
      </div>

      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium text-base">Vergi Dairesi & No</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli</div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen Şirketin vergi dairesi ve vergi no bilgisini girin.Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0 mr-4">
          <div class="flex flex-col items-center md:flex-row">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400" required
              v-model="invoiceInfo.tax_office" />
          </div>
        </div>
        <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0 mr-4">
          <div class="flex flex-col items-center md:flex-row">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400" required
              v-model="invoiceInfo.tax_number" />
          </div>
        </div>
      </div>

      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Fatura Adresiniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen geçerli bir fatura adresi girin.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <textarea
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400 resize-none"
            required v-model="invoiceInfo.address" rows="4"></textarea>
        </div>
      </div>

      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Email Adresiniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                İsteğe Bağlı
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen geçerli bir e-posta adresi girin erişiminiz var.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            required v-model="invoiceInfo.email" />
        </div>
      </div>

    </div>

    <div class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
      <button type="submit" @click="updateCustomerInfo(data.order.id)"
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
        Değişiklikleri Kaydet
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '@/api/apiClient';
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter } from 'vue-router';


const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const invoiceInfo = ref({
  company_name: props.data.order.invoice_info.company_name,
  address: props.data.order.invoice_info.address,
  tax_office: props.data.order.invoice_info.tax_office,
  tax_number: props.data.order.invoice_info.tax_number,
  email: props.data.order.invoice_info.email,
});

const updateCustomerInfo = async (orderId) => {
  try {
    const response = await apiClient.post(`/update-invoice-info/${orderId}`, invoiceInfo.value);

    // Yanıtı işleyin
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
    toast.error(error.response.data.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
  }
};
</script>

<style scoped></style>