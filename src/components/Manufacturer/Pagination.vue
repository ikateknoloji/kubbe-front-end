<template>
  <div class="my-10 mx-10 ">
    <nav v-if="paginationData?.last_page > 1" class="gap-x-1 mb-20 px-2 md:px-10 overflow-x-scroll py-4">
      <div
        class="w-[750px] flex items-start md:items-center justify-start md:justify-end gap-x-1 font-poppins font-medium ">
        <button v-for="link in paginationData.links" :key="link.label" :disabled="!link.url || link.active"
          @click="() => fetchPage(link.url)"
          class="col-span-1 min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-90 disabled:bg-red-400 disabled:pointer-events-none border">
          <span v-html="link.label"></span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  paginationData: {
    type: Object,
    default: () => ({})
  },
  fetchPage: {
    type: Function,
    default: () => { }
  }
})

const { paginationData, fetchPage } = toRefs(props)
</script>

<style scoped></style>
