<template>
  <div class="flex flex-col p-5 box box--stacked max-w-5xl mb-5 relative">
    <router-link :to="`/dashboard/admin/edit/${order}`" class="absolute top-2 right-2">
      <svg class="w-7 h-7" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.125 6.125H5.25C4.78587 6.125 4.34075 6.30937 4.01256 6.63756C3.68437 6.96575 3.5 7.41087 3.5 7.875V15.75C3.5 16.2141 3.68437 16.6592 4.01256 16.9874C4.34075 17.3156 4.78587 17.5 5.25 17.5H13.125C13.5891 17.5 14.0342 17.3156 14.3624 16.9874C14.6906 16.6592 14.875 16.2141 14.875 15.75V14.875"
          stroke="#181818" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M14 4.37509L16.625 7.00009M17.8369 5.76197C18.1815 5.41735 18.3751 4.94995 18.3751 4.46259C18.3751 3.97523 18.1815 3.50783 17.8369 3.16322C17.4923 2.8186 17.0249 2.625 16.5375 2.625C16.0501 2.625 15.5827 2.8186 15.2381 3.16322L7.875 10.5001V13.1251H10.5L17.8369 5.76197Z"
          stroke="#FF9299" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </router-link>
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Sipariş Listesi</div>
    <div class="max-w-5xl">
      <div class="-m-1.5 overflow-x-auto mb-2">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <slot></slot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  order: Number,
});

</script>


<style scoped>
.box {
  box-shadow: 0 3px 5px #0000000b;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: .6rem;
  position: relative;
}

.box--stacked:before {
  content: "";
  z-index: -1;
  box-shadow: 0 1px 2px #0000000d;
  height: 100%;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  position: absolute;
  border-radius: .5rem;
  left: .875rem;
  right: .875rem;
  top: 0;
  margin-top: .75rem;
}
</style>