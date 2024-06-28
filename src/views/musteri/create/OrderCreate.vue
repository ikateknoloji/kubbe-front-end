<template>
  <div class="flex flex-col p-5 box box--stacked mb-10 pb-16">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
      Müşteri Sipariş Bilgileri
    </div>
    <div>
      <!--Sipariş Adı-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Sipariş Adı</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen bir şipariş adı oluşturun. Bu
              bilgiler gereklidir.</div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <div class="flex flex-col">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Sipariş Adı" v-model="formData.order.order_name" />
            <!-- Hata Mesajı Sipariş Adı için -->
            <p v-if="formErrors.order.order_name" class="text-sm text-red-400/80 mt-2"
              id="hs-validation-name-error-helper">
              {{ formErrors.order.order_name }}
            </p>
          </div>
        </div>
      </div>

      <!--Müşteri Adı ve Soyadı-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="min-w-60 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Müşteri Ad & Soyad</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen müşterinizin adını ve soyadını
              girin. Bu bilgiler gereklidir.</div>
          </div>
        </label>
        <div class="max-w-2xl w-full flex flex-col md:flex-row items-center md:space-x-4">
          <div class="max-w-md flex-1 w-full mt-3 xl:mt-0">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Müşteri Adı" v-model="formData.customer.name" />
            <!-- Hata Mesajı Müşteri Adı için -->
            <p v-if="formErrors.customer.name" class="text-sm text-red-400/80 mt-2"
              id="hs-validation-name-error-helper">
              {{ formErrors.customer.name }}
            </p>
          </div>
          <div class="max-w-md flex-1 w-full mt-3 xl:mt-0">
            <input type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Müşteri Soyadı" v-model="formData.customer.surname" />
            <!-- Hata Mesajı Müşteri Soyadı için -->
            <p v-if="formErrors.customer.surname" class="text-sm text-red-400/80 mt-2"
              id="hs-validation-surname-error-helper">
              {{ formErrors.customer.surname }}
            </p>
          </div>
        </div>
      </div>

      <!-- Telefon Numarası bilgisi-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Müşteri Telefon No</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen müşterinin geçerli bir telefon
              numarası girin. Bu bilgiler gereklidir.</div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="text" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="555 555 55 55" v-model="formData.customer.phone" />
          <!-- Telefon numarası için hata mesajı  -->
          <p v-if="formErrors.customer.phone" class="text-sm text-red-400/80 mt-2"
            id="hs-validation-phone-error-helper">
            {{ formErrors.customer.phone }}
          </p>
        </div>
      </div>

      <!-- Email bilgisi -->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Müşteri Email</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md      border border-slate-200">
                İsteğe Bağlıu
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinin geçerli bir email adresini girin. Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="Email" v-model="formData.customer.email" />
          <!-- Email için hata mesajı -->
          <p v-if="formErrors.customer.email" class="text-sm text-red-400/80 mt-2"
            id="hs-validation-email-error-helper">
            {{ formErrors.customer.email }}
          </p>
        </div>
      </div>

      <!-- Sipariş Not bilgisi-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Sipariş Notu</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                İsteğe Bağlı
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen müşterinin geçerli bir notu
              girin. Bu bilgiler isteğe bağlıdır.</div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <textarea
            class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
            rows="4" maxlength="256" v-model="formData.order.note"></textarea>
          <!-- Not için hata mesajı  -->
          <p v-if="formErrors.order.note" class="text-sm text-red-400/80 mt-2" id="hs-validation-note-error-helper">
            {{ formErrors.order.note }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="my-10 flex items-center justify-center sm:items-center sm:justify-start">
    <button @click="store.validateForm"
      class="w-full sm:w-[300px] select-none rounded-lg bg-blue-500 py-4 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
      Sipariş Bilgilerini Tamamla
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCreateStore } from '@/stores/useCreateStore.js'
import { storeToRefs } from 'pinia'

const store = useCreateStore()
const { formData, formErrors } = storeToRefs(store)
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
