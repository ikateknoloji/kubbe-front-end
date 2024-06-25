<template>
  <div class="h-screen md:flex">
    <LoginSection />
    <div class="min-h-screen flex md:w-1/2 justify-center px-3 md:px-8 py-5 items-center font-source">
      <form class="block  w-full">
        <div class="min-h-screen w-full rounded-md border py-4  px-4 flex flex-col justify-center sm:py-6 font-source">
          <div class="w-full  relative py-3">
            <div class="relative bg-white  md:p-20 sm:px-4">
              <div class=" mx-auto">
                <LoginContent />
                <form @submit.prevent="loginUser" class="block w-full">
                  <div class=" divide-y divide-gray-500">
                    <div class="py-8 text-base leading-6  text-gray-700 sm:text-lg sm:leading-7">
                      <!--Email Adresiniz-->
                      <div class="relative mb-5">
                        <label class="text-[#1c1a1a] text-sm block mb-2"> Email Adresiniz </label>
                        <input autocomplete="off" id="email" name="email" type="text" v-model="email"
                          placeholder="Lütfen Email Adresiniz Giriniz"
                          class="max-w-2xl py-3 px-4 block w-full border border-gray-400 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff]" />
                      </div>
                      <!--Şifreniz-->
                      <div class="relative mb-10">
                        <label class="text-[#1c1a1a] text-sm block mb-2"> Kullanıcı Şifreniz </label>
                        <input autocomplete="off" id="password" name="password" type="password" v-model="password"
                          placeholder="Lütfen Şifrenizi Giriniz"
                          class="max-w-2xl py-3 px-4 block w-full border border-gray-400 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff]" />
                      </div>

                      <div class="max-w-2xl flex items-center justify-start space-x-4 font-source">
                        <router-link to="/sifremi-unuttum" class="underline text-gray-500 text-sm">
                          Şifreni mi Unuttun
                        </router-link>
                      </div>

                      <div class="">
                        <button ype="submit"
                          class=" max-w-2xl mt-10 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg  px-6 py-3 block shadow-xl hover:text-white hover:bg-black z-[9999]">
                          Giriş Yap
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CryptoJS from 'crypto-js';
import apiClient from '@/api/apiClient'; // Doğru yolu belirt
import { useRouter } from 'vue-router' // Vue Router'ı içe aktar
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia'

import LoginContent from '@/components/Login/LoginContent.vue';
import LoginSection from '@/components/Login/LoginSection.vue';

const email = ref('');
const password = ref('');

const deviceName = ref(navigator.userAgent);
const router = useRouter() // Vue Router'ı kullan
const userStore = useUserStore();

const { user } = storeToRefs(userStore)

const loginUser = async () => {
  try {
    const response = await apiClient.post('/login', {
      email: email.value,
      password: password.value,
      device_name: deviceName.value
    });

    if (response.status === 200) {

      const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
      // Kullanıcı bilgilerini ve token'ı şifreleme
      const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response.data.user), SECRET_KEY).toString();
      const encryptedToken = CryptoJS.AES.encrypt(response.data.token, SECRET_KEY).toString();

      // Şifrelenmiş verileri localStorage'a kaydetme
      localStorage.setItem('encryptedUser', encryptedUser);
      localStorage.setItem('encryptedToken', encryptedToken);

      toast.success('Başarıyla giriş yaptınız!', {
        onClose: () => {
          const bytesUser = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
          user.value = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));
          router.push('/dashboard');
        }
      });

    } else {
      // Hata durumunu işleyin
      toast.error('Bir hata oluştu');
    }
  } catch (error) {
    toast.error(error.response.data.message, {
      autoClose: 3000,
    });
  }
};

</script>

<style scoped></style>