<template>
  <div class="w-full border-b border-gray-200 mb-10">
    <div class="mx-auto max-w-7xl w-full flex items-end justify-between p-5">
      <div>
        <img src="@/assets/images/logo.png" alt="Vue logo" class="w-[100px]" />
      </div>
      <div class="flex items-center justify-center space-x-">
        <router-link v-if="!user" to="/giris"
          class="group relative inline-flex border border-[#203749] focus:outline-none  lg:ml-4 lg:inline-flex">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[#203749] text-center font-semibold  bg-white ring-1 ring-[#203749] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Oturum Açın
          </span>
        </router-link>
        <div v-if="user" class="hs-dropdown relative inline-flex">
          <button id="hs-dropdown-default" type="button" class="hs-dropdown-toggle py-3 px-2 ">
            <div class="flex items-center justify-center w-12 h-12 mx-2 overflow-hidden rounded-3xl">
              <img v-if="user.profile_photo" :src="user.profile_photo" alt="Kullanıcı Profil Resmi" class="w-[100px]" />
              <img v-else
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                alt="user-icon" class="w-[100px]" />
            </div>
          </button>
          <div
            class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-gray-100
          shadow-[0px_0px_4px_1px_rgba(0,0,0,0.17)] p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-10"
            aria-labelledby="hs-dropdown-default">
            <p
              class="flex items-center gap-x-3.5 py-2 px-3  text-sm text-gray-400 border-b border-gray-200 hover:bg-gray-100 mb-3">
              {{ user.email }}
            </p>

            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 mb-1" href="#">
              Kullanıcı Bilgileri
            </a>
            <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 mb-1" href="#">
              Bildirimler
            </a>
            <button @click="logout" class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 mb-1">
              Çıkış Yap
            </button>
          </div>
        </div>
        <span class="border-l pl-6 border-gray-200 text-base text-gray-400">
          v2.1.0
        </span>
      </div>
    </div>
  </div>

  <div class="relative max-w-7xl mx-auto md:flex items-center justify-center">
    <div class="w-full bg-[#f6fcff] rounded-md py-4  px-4 flex flex-col justify-center sm:py-6 font-source">
      <h1 class="max-w-3xl mx-auto text-4xl font-bold text-center md:text-6xl lg:text-6xl font-poppins leading-[60px]">
        Mikrofon Süngeri Sipariş
        <br class="hidden lg:inline">
        <span class="text-red-500 ">Sistemi Kubbe Ajans</span>
      </h1>
      <br class="hidden lg:inline">
      <p class="mt-6 max-w-6xl mx-auto text-center text-gray-700 text-md leading-relaxed md:mt-8 md:text-lg lg:mt-10">
        Kubbe Ajans olarak, müşterilerimizin ihtiyaçlarını en hızlı ve en etkili şekilde karşılamak için buradayız.
        Mikrofon süngeriniz için sipariş vermek artık eskisinden çok daha kolay. Web sitemiz üzerinden birkaç basit
        adımda istediğiniz ürünü seçebilir, özelleştirebilir ve siparişinizi tamamlayabilirsiniz.
      </p>
      <div class="mt-6 max-w-sm mx-auto flex flex-col justify-center items-center gap-4 sm:flex-row md:mt-8 lg:mt-10">
        <a class="group relative inline-flex border border-red-500 focus:outline-none w-full sm:w-auto" href="/docs">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-500 ring-1 ring-red-500 ring-offset-1 ring-offset-red-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Oturum Aç
          </span>
        </a>
        <a class="group relative inline-flex border border-red-600 focus:outline-none w-full sm:w-auto"
          href="https://laracasts.com" target="_blank">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-red-600 text-center font-bold uppercase bg-white ring-1 ring-red-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Kayıt Ol
          </span>
        </a>
      </div>
    </div>
    <div class="absolute  -translate-y-10 pointer-events-none md:left-0">
      <svg class="text-red-600 animate-cube" width="46" height="53" viewBox="0 0 46 53" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m23.102 1 22.1 12.704v25.404M23.101 1l-22.1 12.704v25.404" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel"></path>
        <path d="m45.202 39.105-22.1 12.702L1 39.105" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel"></path>
        <path transform="matrix(.86698 .49834 .00003 1 1 13.699)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.405H0z"></path>
        <path transform="matrix(.86698 -.49834 -.00003 1 23.102 26.402)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.405H0z"></path>
        <path transform="matrix(.86701 -.49829 .86701 .49829 1 13.702)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.491H0z"></path>
      </svg>
    </div>
    <div class="absolute bottom-0 right-6 pointer-events-none md:right-[12%]">
      <svg class="text-red-600 animate-cube" width="46" height="53" viewBox="0 0 46 53" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="m23.102 1 22.1 12.704v25.404M23.101 1l-22.1 12.704v25.404" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel"></path>
        <path d="m45.202 39.105-22.1 12.702L1 39.105" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel">
        </path>
        <path transform="matrix(.86698 .49834 .00003 1 1 13.699)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.405H0z"></path>
        <path transform="matrix(.86698 -.49834 -.00003 1 23.102 26.402)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.405H0z"></path>
        <path transform="matrix(.86701 -.49829 .86701 .49829 1 13.702)" stroke="currentColor" stroke-width="1.435"
          stroke-linejoin="bevel" d="M0 0h25.491v25.491H0z"></path>
      </svg>
    </div>
  </div>
  <div class="">
    <img src="@/assets/images/mikrofon.png" alt="home-page" class="mx-auto max-w-7xl" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import apiClient from '@/api/apiClient';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const { user } = storeToRefs(userStore)
const router = useRouter();


const logout = async () => {
  try {

    const response = await apiClient.get('/logout');

    if (response.status === 200) {
      // Token değerini sil
      localStorage.removeItem('encryptedToken');
      localStorage.removeItem('encryptedUser');

      toast.success('Başarıyla Çıkış yaptınız!', {
        onClose: () => {
          // Bildirim kapatıldığında kullanıcıyı ana sayfaya yönlendir
          router.push('/giris')
        }
      });
    } else {
      // Token değerini sil
      localStorage.removeItem('encryptedToken');
      localStorage.removeItem('encryptedUser');

      toast.success('Başarıyla Çıkış yaptınız!', {
        onClose: () => {
          // Bildirim kapatıldığında kullanıcıyı ana sayfaya yönlendir
          router.push('/giris')
        }
      });
    }
  } catch (error) {
    toast.success('Başarıyla Çıkış yaptınız!', {
      onClose: () => {
        localStorage.removeItem('encryptedToken');
        localStorage.removeItem('encryptedUser');
        // Bildirim kapatıldığında kullanıcıyı ana sayfaya yönlendir
        router.push('/giris')
      }
    });
  }

};

</script>

<style scoped></style>