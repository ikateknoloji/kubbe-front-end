<template>
  <div v-motion-fade class="shadow w-full md:w-3/4 mb-10" role="alert" v-for="notification in ureticiNotifications"
    :key="notification.id">
    <router-link @click="store.markNotificationAsRead(notification.id)"
      :to="`/dashboard/musteri/orders/${notification.message.order.original_status}/${notification.message.order.id}`">
      <div class="flex w-full relative">
        <div class="w-16 text-center p-2 mt-2"
          v-bind:class="{ 'bg-gray-500': notification.is_read === '1' || notification.is_read === 1, 'bg-red-500': notification.is_read === '0' || notification.is_read === 0 }">
          <div class="flex justify-center h-full items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
        <div class="bg-white border-r-4 w-full p-4 mb-2"
          v-bind:class="{ 'border-gray-500': notification.is_read === '1', 'border-red-500': notification.is_read === '0' }">
          <div>
            <p class="text-gray-600 font-bold">{{ notification.message.title }}</p>
            <p class="text-gray-600 text-sm">{{ notification.message.body }}</p>
          </div>
        </div>
        <p class="absolute right-4 bottom-1 text-green-900 font-mono "></p>
      </div>
    </router-link>
  </div>
  <nav v-if="pagination?.last_page > 1" class="flex items-center gap-x-1 mb-20 px-10">
    <div class="flex items-center gap-x-1 font-poppins font-medium">
      <button v-for="link in pagination.links" :key="link.label" :disabled="!link.url || link.active"
        @click="() => store.paginateNotification(link.url)"
        class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-300 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:bg-gray-300 disabled:pointer-events-none ">
        <span v-html="link.label"></span>
      </button>
    </div>
  </nav>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useUreticiNotificationsStore } from '@/stores/ureticiNotification.js';

const store = useUreticiNotificationsStore();

const { ureticiNotifications, pagination } = storeToRefs(store)


onMounted(() => {
  store.fetchUreticiNotifications();
});
</script>

<style scoped>
.is-read {
  color: gray;
}
</style>