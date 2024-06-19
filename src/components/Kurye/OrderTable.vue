<template>
  <div class="flex flex-col p-5 box box--stacked max-w-5xl mb-10">
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