<template>
  <div v-if="info"
    class="w-[335px] md:w-96 px-2 lg:px-8 flex items-center space-x-2 justify-start border border-gray-200/50 my-4 text-xs md:text-base py-4 shadow-md">
    <div v-if="info.profile_photo"
      class="relative inline-block h-[4rem] w-[4rem] rounded-full overflow-hidden bg-center bg-cover"
      :style="{ backgroundImage: `url(${baseUrl}/${info.profile_photo})` }">
    </div>
    <div v-else>
      <img
        src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
        alt="user-icon" class="w-[50px]" />
    </div>
    <div>
      <p class="text-sky-900">{{ info?.name }}</p>
      <p class="text-slate-700">{{ info?.email }}</p>
    </div>
  </div>
</template>

<script setup>
// Üst bileşenden gelen props
const props = defineProps({
  info: Object,
})

// Çevresel değişkeni alın
const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL
</script>
