<template>
  <div class="max-w-6xl w-full mx-auto">
    <div class="my-16">
      <!-- Fatura Tipi-->
      <div class="mb-10 flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Fatura Tipi</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinin geçerli bir fatura tipi girin. Bu bilgi gereklidir.
            </div>
          </div>
        </label>
        <div>
          <div class="flex mt-4 gap-x-6 mb-3">
            <div class="w-44">
              <input type="radio" class="peer hidden" id="i" value="I" v-model="reactiveFormData.invoice_type" />
              <label for="i"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Bireysel
              </label>
            </div>

            <div class="w-44">
              <input type="radio" class="peer hidden" id="c" value="C" v-model="reactiveFormData.invoice_type" />
              <label for="c"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Kurumsal
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- Hata mesajını buraya ekleyin -->
      <div v-if="errors.invoice_type" class="text-red-500 text-sm mt-1">
        {{ errors.invoice_type[0] }}
      </div>
      <div v-motion-fade v-if="reactiveFormData.invoice_type === 'I'">
        <!--Gönderim Şekli-->
        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div class="text-left">
              <div class="flex items-center">
                <div class="font-medium">Gönderim Şekli</div>
                <div
                  class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  Gerekli
                </div>
              </div>
              <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                Lütfen şipariş gönderim şeklini seçiniz. Bu bilgi gereklidir.
              </div>
            </div>
          </label>
          <div class="flex flex-col">
            <div class="flex flex-wrap space-y-5 md:space-y-0 mt-4 gap-x-6 mb-3">
              <div class="w-44">
                <input type="radio" class="peer hidden" id="a" value="A" v-model="reactiveFormData.shipping_type" />
                <label for="a"
                  class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                  Alıcı Ödemeli
                </label>
              </div>

              <div class="w-44">
                <input type="radio" class="peer hidden" id="g" value="G" v-model="reactiveFormData.shipping_type" />
                <label for="g"
                  class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                  Gönderici Ödemeli
                </label>
              </div>

              <div class="w-44">
                <input type="radio" class="peer hidden" id="t" value="T" v-model="reactiveFormData.shipping_type" />
                <label for="t"
                  class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                  Ofis Teslim
                </label>
              </div>
            </div>
            <div v-if="errors.shipping_type" class="text-red-500 text-sm mt-5">
              {{ errors.shipping_type[0] }}
            </div>
          </div>
        </div>
        <!-- Sipariş Adres Bilgisi-->
        <div v-if="reactiveFormData.shipping_type !== 'T' && reactiveFormData.shipping_type !== ''"
          class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div class="text-left">
              <div class="flex items-center">
                <div class="font-medium">Sipariş Adres Bilgisi</div>
                <div
                  class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  Gerekli
                </div>
              </div>
              <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                Lütfen müşterinin sipariş adresini detaylı bir şekilde girin. Bu bilgi gereklidir.
              </div>
            </div>
          </label>
          <div class="max-w-4xl flex-1 w-full mt-3 xl:mt-0">
            <textarea
              class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
              rows="4" maxlength="256" v-model="reactiveFormData.order_address">
          </textarea>
            <div v-if="errors.order_address" class="text-red-500 text-sm mt-5">
              Sipariş Adresi ofis teslim olmadığı sürece zorunlu olacaktır.
            </div>
          </div>
        </div>
      </div>
      <!--Fatura Alanı-->
      <div v-motion-fade v-if="reactiveFormData.invoice_type === 'C'">
        <div class="flex flex-col ">
          <!-- Sipariş Adres Bilgisi-->
          <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium">Sipariş Adres Bilgisi</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                    Gerekli
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                  Lütfen müşterinin sipariş adresini detaylı bir şekilde girin. Bu bilgi gereklidir.
                </div>
              </div>
            </label>
            <div class="max-w-4xl flex-1 w-full mt-3 xl:mt-0">
              <textarea
                class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
                rows="4" maxlength="256" v-model="reactiveFormData.order_address">
              </textarea>
              <div v-if="errors.order_address" class="text-red-500 text-sm mt-5">
                Sipariş Adresi ofis teslim olmadığı sürece zorunlu olacaktır.
              </div>
            </div>
          </div>
          <!--Gönderim Şekli-->
          <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium">Gönderim Şekli</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                    Gerekli
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                  Lütfen şipariş gönderim şeklini seçiniz. Bu bilgi gereklidir.
                </div>
              </div>
            </label>
            <div class="flex flex-col">
              <div class="flex flex-wrap space-y-5 md:space-y-0 mt-4 gap-x-6 mb-3">
                <div class="w-44">
                  <input type="radio" class="peer hidden" id="a" value="A" v-model="reactiveFormData.shipping_type" />
                  <label for="a"
                    class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                    Alıcı Ödemeli
                  </label>
                </div>

                <div class="w-44">
                  <input type="radio" class="peer hidden" id="g" value="G" v-model="reactiveFormData.shipping_type" />
                  <label for="g"
                    class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                    Gönderici Ödemeli
                  </label>
                </div>

                <div class="w-44">
                  <input type="radio" class="peer hidden" id="t" value="T" v-model="reactiveFormData.shipping_type" />
                  <label for="t"
                    class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                    Ofis Teslim
                  </label>
                </div>
              </div>
              <div v-if="errors.shipping_type" class="text-red-500 text-sm mt-5">
                {{ errors.shipping_type[0] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-motion-fade v-if="reactiveFormData.invoice_type === 'C'">
        <div class="flex flex-col my-16">
          <div class="grid grid-cols-1">
            <!-- Şirket Adı-->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Sirket Adı</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                      Gerekli
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Lütfen müşterinin şirket adını girin. Bu bilgi gereklidir.
                  </div>
                </div>
              </label>
              <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0">
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
                  placeholder="Şirket Adı" v-model="reactiveFormData.company_name" />
                <div v-if="errors.company_name" class="text-red-500 text-sm mt-5">
                  {{ errors.company_name[0] }}
                </div>
              </div>

            </div>
            <!-- Vergi Dairesi-->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Vergi Dairesi</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                      Gerekli
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Lütfen müşterinin vergi dairesini girin. Bu bilgi gereklidir.
                  </div>
                </div>
              </label>
              <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0">
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
                  placeholder="Vergi Dairesi" v-model="reactiveFormData.tax_office" />
                <div v-if="errors.tax_office" class="text-red-500 text-sm mt-5">
                  {{ errors.tax_office[0] }}
                </div>
              </div>
            </div>
            <!-- Vergi Numarası-->
            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium">Vergi Numarası</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                      Gerekli
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                    Lütfen müşterinin vergi numarasını girin. Bu bilgi gereklidir.
                  </div>
                </div>
              </label>
              <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0">
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
                  placeholder="Vergi Numarası" v-model="reactiveFormData.tax_number" />
                <div v-if="errors.tax_number" class="text-red-500 text-sm mt-5">
                  {{ errors.tax_number[0] }}
                </div>
              </div>

            </div>
          </div>
          <!-- Fatura Adres Bilgisi-->
          <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
            <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
              <div class="text-left">
                <div class="flex items-center">
                  <div class="font-medium">Fatura Adres Bilgisi</div>
                  <div
                    class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                    Gerekli
                  </div>
                </div>
                <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                  Lütfen müşterinin fatura adresini detaylı bir şekilde girin. Bu bilgi gereklidir.
                </div>
              </div>
            </label>
            <div class="max-w-5xl flex-1 w-full mt-3 xl:mt-0 flex flex-col ">
              <div class="w-32 mb-10 ">
                <input type="checkbox" class="peer hidden" id="active" v-model="reactiveFormData.addressControll" />
                <label for="active"
                  class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500  peer-checked:text-white transition-all duration-300 delay-100">
                  Adres Ekle
                </label>
              </div>
              <textarea
                class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
                rows="4" maxlength="256" v-if="reactiveFormData.addressControll" v-model="reactiveFormData.address">
             </textarea>
              <div v-if="errors.address" class="text-red-500 text-sm mt-5">
                {{ errors.address[0] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-10 flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">

      <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
        <div class="text-left">
          <div class="flex items-center">
            <div class="font-medium">Tasarım Ekle</div>
            <div
              class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              Gerekli
            </div>
          </div>
          <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
            Lütfen siparişiniz üretim tasarımını yükleyiniz.
          </div>
        </div>
      </label>
      <div class="w-full">

        <file-pond ref="filePond" :files="uploadedProductionImages" allow-multiple="true"
          accepted-file-types="image/jpeg, image/png, image/jpg, image/gif, image/svg"
          label-idle="Dosyaları buraya sürükleyin veya <span class='filepond--label-action'>Göz atın</span>"
          @updatefiles="handleFilePondUpdate" @removefile="handleFilePondRemove"></file-pond>
      </div>

    </div>

    <!--ödeme Şekli-->
    <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0 mb-5">
      <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
        <div class="text-left">
          <div class="flex items-center">
            <div class="font-medium">Ödeme Şekli</div>
            <div
              class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              Gerekli
            </div>
          </div>
          <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
            Lütfen bir ödeme şekli belirleyiniz. Bu bilgi gereklidir.
          </div>
        </div>
      </label>
      <div class="flex flex-col">
        <div class="flex flex-wrap space-y-5 md:space-y-0 mt-4 gap-x-6 mb-3">
          <div class="w-44">
            <input type="radio" class="peer hidden" id="P" value="P" v-model="reactiveFormData.payment_status" />
            <label for="P"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Elden Ödeme
            </label>
          </div>

          <div class="w-44">
            <input type="radio" class="peer hidden" id="O" value="O" v-model="reactiveFormData.payment_status" />
            <label for="O"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Peşin Ödeme
            </label>
          </div>

          <div class="w-44">
            <input type="radio" class="peer hidden" id="AH" value="AH" v-model="reactiveFormData.payment_status" />
            <label for="AH"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Açık Hesap
            </label>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errors.payment_status" class="text-red-500 text-sm mt-1 mb-16">
      {{ errors.payment_status[0] }}
    </div>

    <div v-if="reactiveFormData.payment_status === 'O'" class="flex items-center justify-center w-full mb-10">
      <label for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="onDropHandler">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <div>
            <svg class="w-10 h-10 mb-3 z-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
        <div v-if="image" class="flex justify-center w-full p-4">
          <img v-if="fileType && fileType.startsWith('image/')" :src="image" class="" />
          <object v-else :data="image" class="w-full h-96" type="application/pdf">
            <p>PDF dosyası. <a :href="image">Dosyayı indir</a>.</p>
          </object>
        </div>
        <input id="dropzone-file" type="file" class="hidden" @change="onChangeHandler" ref="fileInput" />
      </label>
    </div>

    <div v-if="errors.payment_proof" class="text-red-500 text-sm mt-1 mb-5">
      {{ errors.payment_proof[0] }}
    </div>

    <button @click="onUploadHandler" type="button"
      class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white mb-10 hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-800 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 focus:ring-gray-600">
      Dekont Ekle
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useInfoStore } from '@/stores/musteri/useInfoStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';


import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);



const info = useInfoStore();
const router = useRouter();
const route = useRoute();

const { fileInput, image, fileType, reactiveFormData, errors, uploadedProductionImages } = storeToRefs(info);

const onChangeHandler = (event) => {
  const file = event.target.files[0];
  info.onChange(file);
};

const onDropHandler = (event) => {
  info.onDrop(event);
};

const onUploadHandler = () => {
  const orderId = route.params.id; // route.params kullanarak orderId alın
  info.onUpload(orderId, router);
};

const handleFilePondUpdate = (fileItems) => {
  info.handleFilePondUpdate(fileItems);
};

// Dosya silme işlemi
const handleFilePondRemove = (error, file) => {
  if (error) {
    console.error(error);
    return;
  }

  // Dosya referansını reactive değerden kaldır
  const index = uploadedProductionImages.value.findIndex(item => item.name === file.filename);
  if (index !== -1) {
    uploadedProductionImages.value.splice(index, 1);
  }
};
</script>

<style></style>