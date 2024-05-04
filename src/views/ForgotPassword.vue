<template>
  <div class="h-screen md:flex">
    <LoginSection />
    <div class=" flex md:w-1/2 justify-center px-2 md:px-8 py-5 items-center font-source">
      <form class="block w-full">
        <div class="w-full rounded-md border px-3 py-4 flex flex-col justify-center sm:py-6 font-source">
          <div class="w-full  relative py-3">
            <div class="relative bg-white  md:p-20 sm:px-4">
              <div class=" mx-auto">
                <ForgetContent />

                <div class=" divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6  text-gray-700 sm:text-lg sm:leading-7">
                    <div class="relative mb-5">
                      <label class="text-[#4a4848] text-sm block mb-2"> Email Adresiniz </label>
                      <input autocomplete="off" id="email" name="email" type="text"
                        placeholder="Lütfen E-Posta Adresiniz Giriniz"
                        class="max-w-2xl py-3 px-4 block w-full border border-gray-400 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff]" />
                    </div>

                    <div class="">
                      <button ype="submit"
                        class=" max-w-2xl mt-10 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg  px-6 py-3 block shadow-xl hover:text-white hover:bg-gray-700 transition-all duration-300">
                        Şifremi Yenile
                      </button>
                      <router-link to="/giris"
                        class=" max-w-2xl mt-10 text-lg font-semibold border bg--500 w-full text-orange-600 rounded-lg  px-6 py-3 block shadow-xl  hover:bg-orange-500 hover:text-white hover:border-orange-500 text-center duration-100 transition-all">
                        Önceki Sayfaya Dön
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import ForgetContent from '@/components/ForgotPassword/ForgetContent.vue';
import LoginSection from '@/components/Login/LoginSection.vue';
</script>

<style scoped></style>