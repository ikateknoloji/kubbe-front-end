<template>
  <div class="w-[300px] h-screen bg-white border-e border-gray-200 pt-12 2xl:pt-7 pb-10 overflow-y-auto
   [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300  border-t">
    <Navbar />
    <div @click="logout"
      class="px-6 mx-4 py-4 bottom-6 left-6 font-mono uppercase font-semibold cursor-pointer hover:scale-95 scale-90 duration-200 delay-75 bg-slate-800 rounded-md">
      <button class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
        <span class="text-white">Çıkış Yap</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

//fixed top-0 start-0 lg:bottom-0 bottom-0
import NavigationToggle from './NavigationToggle.vue';
import Navbar from './Navbar.vue';

import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar
import { useRouter } from 'vue-router' // Vue Router'ı içe aktar

import apiClient from '@/api/apiClient'; // Doğru yolu belirt

const router = useRouter() // Vue Router'ı kullan



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