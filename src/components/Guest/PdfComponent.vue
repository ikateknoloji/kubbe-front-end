<template>
  <div class="px-4">
    <div class="w-full ">
      <object :data="src" type="application/pdf" style="width:100%; height:300px;">
        <embed class="object " style="width: 100%; height: 100%" :src="src" />
      </object>
    </div>
    <a :href="src" target="_blank" class="inline-block text-blue-500 my-3 md:my-10">PDF
      Dosyasını Görüntülemek için
      tıklayın</a>
  </div>
</template>

<script setup>

const props = defineProps({
  src: String
})
</script>
