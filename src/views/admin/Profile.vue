<template>
  <div class="flex flex-col p-5 box box--stacked mb-10">
    <div class="p-1.5 box flex flex-col box--stacked">
      <div class="h-60 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
        <div
          class="w-full h-full relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem] after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem] "
          :style="`background-image: url('@/assets/images/mikrofon.png');`">
          <img src="@/assets/images/background.png" alt="mikrofon" class="w-full" />
        </div>
        <div class="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-36">
          <div
            class="w-full h-full overflow-hidden border-[6px] box border-white rounded-full flex items-center justify-center image-fit">
            <img alt="Tailwise - Admin Dashboard Template" src="@/assets/images/logo.png">
          </div>
        </div>
      </div>
      <div class="p-5 flex flex-col sm:flex-row gap-y-3 sm:items-end rounded-[0.6rem] bg-slate-50 pt-12">
        <button
          class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-primary dark:border-primary [&amp;:hover:not(:disabled)]:bg-primary/10 sm:ml-auto border-primary/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-image stroke-[1.3] w-4 h-4 mr-2.5">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          Profile Resmini Güncelle
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-col p-5 box box--stacked mb-10">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Profile Bilgileri</div>
    <div>
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Ad & Soyad</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli</div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">Lütfen Adınızı ve Soyadınızı girin. Bu
              bilgiler gereklidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <div class="flex flex-col items-center md:flex-row">
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="John" required />
          </div>
        </div>
      </div>
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Email Adresiniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen geçerli bir e-posta adresi girin erişiminiz var.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="email" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="info@ikatech.tech" required />
        </div>
      </div>
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Telefon Numarası</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                İsteğe Bağlı
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen geçerli bir telefon numarası girin erişiminiz var.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="email" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="info@ikatech.tech" required />
        </div>
      </div>
    </div>
    <div class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
      <button type="button"
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
        Değişiklikleri Kaydet
      </button>
    </div>
  </div>

  <div class="flex flex-col p-5 box box--stacked">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Şifre Güncelleme</div>
    <div>
      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Güncel Şifreniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli</div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen güncel olarak giriş yaptığınız kullanıcı şifrenizi giriniz.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <div class="flex flex-col items-center md:flex-row">
            <input type="password" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
              placeholder="Güncel Şifreniz" required />
          </div>
        </div>
      </div>

      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Yeni Şifreniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen yeni bir şifre giriniz. Yeni şifreniz en az bir harf ve bir rakam içermelidir.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="password" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="Yeni Şifreniz" required />
        </div>
      </div>

      <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Şifrenizi Doğrulayın</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                İsteğe Bağlı
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Yukarıdaki şifre bilginizle şifrenizi doğrulayın.
            </div>
          </div>
        </label>
        <div class="max-w-2xl flex-1 w-full mt-3 xl:mt-0">
          <input type="password" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500/40 block w-full p-2.5 outline-none placeholder:text-slate-400"
            placeholder="Yeni Şifreniz" required />
        </div>
      </div>
    </div>
    <div class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
      <button type="button"
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center   mr-2 mb-2">
        Şifrenizi Güncelleyin.
      </button>
    </div>
  </div>
</template>

<script setup>

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