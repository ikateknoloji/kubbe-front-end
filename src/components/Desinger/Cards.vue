<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-1 md:gap-x-6 gap-y-12 font-poppins font-medium px-4">
    <div v-for="(item ) in order" :key="item.id"
      class="relative w-full md:max-w-[350px] py-10 lg:max-w-full bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-95 flex  flex-col justify-between">
      <div class="p-4 md:p-8">
        <div
          class="w-[335px] md:w-96 px-2 lg:px-8 flex items-center space-x-2 justify-start border border-gray-200/50 my-4 text-xs md:text-base py-4 ">
          <div v-if="item.customer.image_url"
            class="relative inline-block h-[4rem] w-[4rem] rounded-full overflow-hidden bg-center bg-cover"
            :style="{ backgroundImage: `url(${item.customer.image_url})` }">
          </div>
          <div v-else>
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="user-icon" class="w-[50px]" />
          </div>
          <div>
            <p class="text-sky-900">{{ item.customer.name }}</p>
            <p class="text-slate-700">{{ item.customer.email }}</p>
          </div>
        </div>
        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4">
          {{ item.order_name }}
        </h2>
        <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-4">
          {{ item.order_code }}

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

        <ul class="text-sm text-gray-600 mb-6">
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
        <router-link :to="`/dashboard/tasarimci/tasarim-bekleyen/${item.id}`"
          class="block w-full bg-blue-500 rounded text-white text-center px-4 py-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Sipariş Detayı
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>



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
