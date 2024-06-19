<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-1 md:gap-x-6 gap-y-12 font-poppins font-medium px-4">
    <div v-for="(item ) in order" :key="item.id"
      class="relative w-full md:max-w-[350px] py-10 lg:max-w-full bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-95 flex  flex-col justify-between">

      <div class="px-2  md:px-8 pt-4 flex items-center space-x-2 justify-start">
        <div v-if="item.customer.profile_photo"
          class="relative inline-block h-[4rem] w-[4rem] rounded-full overflow-hidden bg-center bg-cover"
          :style="{ backgroundImage: `url(${item.customer.profile_photo})` }">
        </div>
        <div v-else>
          <img src="@/assets/user-icon.png" alt="" class="w-12 h-12">
        </div>
        <div>
          <p class="text-[15px] text-sky-900">{{ item.customer.name }}</p>
          <p class="text-[12px] text-blue-400">{{ item.customer.email }} </p>
        </div>
      </div>

      <div class="p-4 md:p-8">
        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4">
          {{ item.customer_info.name }}
          {{ item.customer_info.surname }}
        </h2>

        <p class="text-gray-100 mb-6 inline-block px-4 py-3 rounded-lg text-xs"
          :style="{ backgroundColor: item.status_color }">{{
            item.status }}</p>
        <p v-if="item.is_rejected == 'R'"
          class=" text-gray-100 mb-6 inline-block px-4 py-3 rounded-lg text-xs ml-4 bg-[#ff7700]"> Sipariş Reddedildi
        </p>

        <p v-if="item.is_rejected == 'C'"
          class=" text-gray-100 mb-6 inline-block px-4 py-3 rounded-lg text-xs ml-4 bg-[#ff7700]"> Sipariş İptal Edildi
        </p>
        <p class="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
          </svg>

          <span>
            {{ item.offer_price }} TL
          </span>
        </p>
        <ul class="text-sm text-gray-600 mb-6">
          <li class="mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-5 h-5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>

            {{ item.customer_info.phone }}
          </li>
          <li class="mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
            {{ item.invoice_type }}
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            {{ formatDate(item.created_at) }}
          </li>
        </ul>
        <div v-if="item.estimated_production_date" class="text-blue-500 text-sm mb-3">
          <span class="mr-6">Tahmini Teslim:</span> {{ item.estimated_production_date }}
        </div>
        <div v-if="item.production_start_date" class="text-red-800 text-sm mb-3">
          <span class="mr-2">Üretim Başlangıcı:</span> {{ item.production_start_date }}
        </div>
        <div v-if="item.production_date" class="text-green-800 text-sm mb-3">
          <span class="mr-11">Üretim Tarihi:</span> {{ item.production_date }}
        </div>
        <div v-if="item.delivery_date" class="text-green-800 text-sm mb-3">
          <span class="mr-11">Teslim Tarihi:</span> {{ item.delivery_date }}
        </div>
      </div>
      <div class="p-2 md:p-4">
        <a :href="getFullUrl(item.order_images[0].product_image)" target="_blank"
          class="block w-full bg-red-500 rounded text-white text-center px-4 py-2 hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-800">
          Tasarım Dosyası
        </a>
      </div>
      <div class="p-2 md:p-4">
        <router-link :to="`/dashboard/kurye/kargo-teslim/${item.id}`"
          class="block w-full bg-blue-500 rounded text-white text-center px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Sipariş Detayı
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;
const getFullUrl = (logoUrl) => { return `${baseURL}${logoUrl}` };


const props = defineProps({
  order: Object
});

// Tarih ve saat dönüştürme yöntemi
const formatDate = (value) => {
  if (value) {
    let date = new Date(value);
    let turkeyTime = new Date(date.getTime() + (3 * 60 * 60 * 1000));
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(turkeyTime);
  }
}



</script>
