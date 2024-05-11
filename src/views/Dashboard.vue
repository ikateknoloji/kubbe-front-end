<template>
  <div class="bg-white fixed top-0 left-0 right-0 w-full border-b border-gray-200 mb-10 z-[20]">
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
  <div class="mt-32">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
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

// Kullanıcının belirli bir role sahip olup olmadığını kontrol eden fonksiyon
const hasAccess = (role) => {
  return userStore.user?.roles.some(userRole => userRole.name === role);
};

// Erişim durumuna göre sınıfı hesaplayan computed property
const isDisabled = computed(() => {
  return {
    'disabled-link': !hasAccess('admin')
  };
});

</script>

<style scoped>
.disabled-link {
  pointer-events: none;
  /* Tıklama olaylarını devre dışı bırak */
  opacity: 0.5;
  /* Linki soluk göster */
}
</style>