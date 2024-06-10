<template>
  <div class="flex flex-col p-5 box box--stacked mb-10  pb-16">
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
                Gerekli</div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen bir şipariş adı oluşturun. Bu
              bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <div class="flex flex-col">
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Sipariş Adı" v-model="formData.order_name" />
            <!-- Hata Mesajı Sipariş Adı için -->
            <p v-for="(item, i ) in formErrors.order_name" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-name-error-helper">
              {{ item }}
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
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinizin adını ve soyadını girin. Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl w-full flex flex-col md:flex-row items-center  md:space-x-4">
          <div class="max-w-md flex-1 w-full mt-3 xl:mt-0">
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Müşteri Adı" v-model="formData.name" />
            <!-- Hata Mesajı Sipariş Adı için -->
            <p v-for="(item, i ) in formErrors.name" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-name-error-helper">
              {{ item }}
            </p>
          </div>
          <div class="max-w-md flex-1 w-full mt-3 xl:mt-0">
            <input type="text" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Müşteri Soyadı" v-model="formData.surname" />
            <!-- Hata Mesajı Sipariş Soyadı için -->
            <p v-for="(item, i ) in formErrors.surname" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-surname-error-helper">
              {{ item }}
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
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinin geçerli bir telefon numarası girin. Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="555 555 55 55" v-model="formData.phone" />
          <!-- Telefon numarası için hata mesajı  -->
          <p v-for="(item, i ) in formErrors.phone" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-phone-error-helper">
            {{ item }}
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
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinin geçerli bir notu girin. Bu bilgiler isteğe bağlıdır.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <textarea
            class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
            rows="4" maxlength="256" v-model="formData.note">
          </textarea>
          <!-- Notu için hata mesajı  -->
          <p v-for="(item, i ) in formErrors.note" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-note-error-helper">
            {{ item }}
          </p>
        </div>
      </div>

      <!-- Logo bilgisi-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Sipariş Logo</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen müşterinin geçerli bir logo dosyası girin. Bu bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex flex-col items-start justify-center w-full mb-2">
          <label for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="store.handleDrop">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg v-if="!imagePreview" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500">
                <span class=" text-xs">Yüklemek için tıklayın</span>
                <span class="hidden lg:block text-xs">veya sürükleyip bırakın</span>
              </p>
              <p class="hidden lg:block text-xs text-gray-500">
                SVG, PNG, JPG veya PDF (Önerilen 800x400px)
              </p>
            </div>

            <img v-if="fileType === 'image'" :src="imagePreview" class="max-h-80 max-w-96" />
            <div v-else-if="fileType === 'pdf'" class="w-full">
              <iframe :src="imagePreview" width="100%" height="100%"></iframe>
              <a :href="imagePreview" target="_blank" class="block text-blue-600 mb-3 text-center">PDF Dosyasını
                Görüntüle</a>
            </div>
            <input id="dropzone-file" type="file" class="hidden" ref="fileInput" @change="store.handleFileUpload" />
          </label>
          <p v-for="(item, i ) in formErrors.image_url" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-order-image-error-helper">
            {{ item }}
          </p>
        </div>
      </div>

      <!-- Fatura Tipi-->
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
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
              <input type="radio" class="peer hidden" id="i" value="I" v-model="formData.invoice_type" />
              <label for="i"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Bireysel
              </label>
            </div>

            <div class="w-44">
              <input type="radio" class="peer hidden" id="c" value="C" v-model="formData.invoice_type" />
              <label for="c"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Kurumsal
              </label>
            </div>
          </div>
          <!-- Fatura Tipi Hata Mesajı -->
          <p v-for="(item, i ) in formErrors.invoice_type" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-invoice-error-helper">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--Fatura Alanı-->
  <div v-motion-fade v-if="formData.invoice_type === 'C'">
    <div class="flex flex-col p-5 pb-16 box box--stacked mb-10">
      <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Sipariş Adres
        Bilgisi
      </div>
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
            rows="4" maxlength="256" v-model="formData.order_address">
          </textarea>
          <!-- Fatura Adresi Hata Mesajı -->
          <p v-for="(item, i ) in formErrors.order_address" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-order-address-error-helper">
            {{ item }}
          </p>
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
              <input type="radio" class="peer hidden" id="a" value="A" v-model="formData.shipping_type" />
              <label for="a"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Alıcı Ödemeli
              </label>
            </div>

            <div class="w-44">
              <input type="radio" class="peer hidden" id="g" value="G" v-model="formData.shipping_type" />
              <label for="g"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Gönderici Ödemeli
              </label>
            </div>

            <div class="w-44">
              <input type="radio" class="peer hidden" id="t" value="T" v-model="formData.shipping_type" />
              <label for="t"
                class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                Ofis Teslim
              </label>
            </div>
          </div>
          <!-- Fatura Adresi Hata Mesajı -->
          <p v-for="(item, i ) in formErrors.shipping_type" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-order-address-error-helper">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-motion-fade v-if="formData.invoice_type === 'C'">
    <div class="flex flex-col p-5 pb-16 box box--stacked mb-10">
      <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Fatura Bilgileri
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
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
              placeholder="Şirket Adı" v-model="formData.company_name" />

            <!-- Şirket Adı Hata Mesajı -->
            <p v-for="(item, i ) in formErrors.company_name" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-company_name-error-helper">
              {{ item }}
            </p>
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
              placeholder="Vergi Numarası" v-model="formData.tax_office" />
            <!-- Vergi Numarası Hata Mesajı -->
            <p v-for="(item, i ) in formErrors.tax_office" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-tax_office-error-helper">
              {{ item }}
            </p>
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
              placeholder="Vergi Numarası" v-model="formData.tax_number" />
            <!--Vergi Numarası Hata Mesajı-->
            <p v-for="(item, i ) in formErrors.tax_number" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-tax_number-error-helper">
              {{ item }}
            </p>
          </div>

        </div>

        <!--Email Adresi bilgisi-->
        <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
          <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
            <div class="text-left">
              <div class="flex items-center">
                <div class="font-medium">Email Adresi</div>
                <div
                  class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                  Gerekli
                </div>
              </div>
              <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                Lütfen müşterinin geçerli bir e-posta adresini girin. Bu bilgiler gereklidir.
              </div>
            </div>
          </label>
          <div class="max-w-xs flex-1 w-full mt-3 xl:mt-0">
            <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="info@ikatech.tech" v-model="formData.email" />
            <!-- Email Adresi Hata Mesajı-->
            <p v-for="(item, i ) in formErrors.email" :key="i" class="text-sm text-red-400/80 mt-2 "
              id="hs-validation-email-error-helper">
              {{ item }}
            </p>
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
        <div class="max-w-5xl flex-1 w-full mt-3 xl:mt-0">
          <div class="w-44 mb-10">
            <input type="checkbox" class="peer hidden" id="active" v-model="formData.addressControll" />
            <label for="active"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500  peer-checked:text-white transition-all duration-300 delay-100">
              Fatura Adresi Ekle
            </label>
          </div>

          <textarea
            class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
            rows="4" maxlength="256" v-if="formData.addressControll" v-model="formData.address">
          </textarea>
          <!-- Fatura Adresi Hata Mesajı-->
          <p v-for="(item, i ) in formErrors.address" :key="i" class="text-sm text-red-400/80 mt-2 "
            id="hs-validation-order-address-error-helper">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!--Fatura Alanı Sonu-->

  <div v-motion-fade class="flex flex-col p-8 pb-8 box box--stacked mb-10" v-if="formData.invoice_type === 'I'">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Bireysel</div>
    <!-- Şipariş Adres Bilgisi-->
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
      <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
        <textarea
          class="mb-3 py-3 px-4 block w-full border rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none resize-none bg-[#f8fafb] border-gray-400"
          rows="4" maxlength="256" v-model="formData.order_address">
          </textarea>
      </div>

    </div>
    <!-- Email Adresi bilgisi-->
    <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
      <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
        <div class="text-left">
          <div class="flex items-center">
            <div class="font-medium">Email Adresi</div>
            <div
              class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
              Gerekli
            </div>
          </div>
          <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
            Lütfen müşterinin email adresini girin. Bu bilgi gereklidir.
          </div>
        </div>
      </label>
      <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
        <input type="email" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
          placeholder="info@ikatech.tech" v-model="formData.email" />
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
        <div class="flex flex-wrap mt-4 md:gap-x-6 gap-4 mb-3">
          <div class="w-44">
            <input type="radio" class="peer hidden" id="a" value="A" v-model="formData.shipping_type" />
            <label for="a"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Alıcı Ödemeli
            </label>
          </div>

          <div class="w-44">
            <input type="radio" class="peer hidden" id="g" value="G" v-model="formData.shipping_type" />
            <label for="g"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Gönderici Ödemeli
            </label>
          </div>

          <div class="w-44">
            <input type="radio" class="peer hidden" id="t" value="T" v-model="formData.shipping_type" />
            <label for="t"
              class="block cursor-pointer select-none rounded-xl p-2 text-center text-blue-800 bg-blue-100 peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              Ofis Teslim
            </label>
          </div>
        </div>
        <!-- Fatura Adresi Hata Mesajı -->
        <p v-for="(item, i ) in formErrors.shipping_type" :key="i" class="text-sm text-red-400/80 mt-2 "
          id="hs-validation-order-address-error-helper">
          {{ item }}
        </p>
      </div>
    </div>
  </div>

  <div class="my-10 flex items-center justify-center sm:items-center sm:justify-start">
    <button @click="store.submitForm"
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
const isChecked = ref(false);

const { fileT, formData, fileInput, imagePreview, fileType, formErrors } = storeToRefs(store)


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