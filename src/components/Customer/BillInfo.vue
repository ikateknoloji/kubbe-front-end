<template>
  <div class="w-full lg:max-w-2xl border mb-6 mt-10 col-span-12 lg:col-span-6">
    <div class="border-b p-2 text-[#333]  font-source text-[13px] md:text-[15px]">
      Fatura Bilgileri
    </div>
    <div class="grid grid-cols-12 gap-4 px-2 py-4 md:p-4">
      <div class="col-span-4 md:col-span-3 flex flex-col space-y-4">
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Şirket Adı
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Vergi D.
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Vergi No
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Email Adresi
        </div>
        <div class="text-blue-500/80 bg-gray-200/60 px-2 py-2 shadow-xs  text-xs sm:text-sm md:text-base">Adres</div>
      </div>
      <div class="col-span-8 md:col-span-9 flex flex-col space-y-4 md:space-y-4">
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ info.company_name }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ info.tax_office }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ info.tax_number }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ info.email }}</p>
        <p class="px-2 py-2  text-xs sm:text-sm md:text-base">{{ info.address }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});


</script>

<style scoped></style>