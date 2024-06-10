<template>
  <CoverContent title="Sipariş Kalemi Oluştur">
    <div>
      <div class="w-full flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right  xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Ürün Tipini Seçiniz</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen şipariş gönderim şeklini seçiniz. Bu bilgi gereklidir.
            </div>
          </div>
        </label>
        <div class="w-full  gap-4 flex  flex-wrap mt-4  mb-3">
          <div class="w-full max-w-xs mb-10 relative z-[50]">
            <Listbox v-model="selectedCategory">
              <ListboxButton
                class="relative w-full cursor-default bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <div>
                  <div v-if="selectedCategory" class="flex items-center justify-start space-x-4">
                    <span>
                      {{ selectedCategory.category }}
                    </span>
                  </div>
                  <div v-else class="w-8 h-8"></div>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </div>
              </ListboxButton>
              <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="mt-1 absolute max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <template v-for="item in productCategories" :key="item.id">
                    <ListboxOption v-slot="{ active, selected }" :value="item" as="template">
                      <li :class="[
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]">
                        <span :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]">{{ item.category }}</span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </template>
                </ListboxOptions>
              </transition>
            </Listbox>
          </div>
          <div v-if="!typeControll" v-motion-fade class="w-full max-w-xs mb-10 relative z-[30]">
            <Listbox v-motion-fade v-if="!checkedType" v-model="selectedType">
              <ListboxButton
                class="relative w-full cursor-default bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <div v-if="selectedType" class="flex items-center justify-start space-x-4">
                  <span>
                    {{ selectedType?.product_type }}
                  </span>
                </div>
                <div v-else class="w-8 h-8"></div>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </ListboxButton>
              <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class=" mt-1 absolute z-10  max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <ListboxOption v-slot="{ active, selected }" v-for="item in types" :key="item.id" :value="item"
                    as="template">

                    <li :class="[
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]">
                      <div class="flex items-center justify-start space-x-3">
                        <span :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]">{{ item.product_type }}</span>
                      </div>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </Listbox>
            <div v-else class="w-96 max-w-lg  relative z-10">
              <input type="text"
                class="py-4 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
                v-model="type" placeholder="Lütfen Yeni Ürün Tipini Giriniz" />
            </div>
            <div class="inline-flex items-center mt-3">
              <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customTypeCheckbox">
                <input type="checkbox"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                  id="customTypeCheckbox" v-model="checkedType" />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" stroke-width="1">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
              </label>
              <label for="customTypeCheckbox" class="text-sm text-gray-800/80">Özel Ürün Tipi Oluştur</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right  xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Renk & Adet</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen renk ve adet seçiniz. Bu bilgi gereklidir.
            </div>
          </div>
        </label>
        <div class="w-full flex-wrap  gap-4 flex mt-4  mb-3">
          <div class=" mb-5 relative z-[20]">
            <div class="md:max-w-md max-w-xs w-96 " v-if="!checkedColor">
              <Listbox v-motion-fade v-model="color">
                <ListboxButton
                  class="relative w-full cursor-default bg-white py-4 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/100 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <div v-if="color" class="flex items-center justify-start space-x-4">
                    <span class="w-7 h-7 rounded inline-block" :style="{ backgroundColor: color.hex }"></span>
                    <span>
                      {{ color.name }}
                    </span>
                  </div>
                  <div v-else class="w-8 h-8"></div>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class=" mt-1 absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="item in colors" :key="item.id" :value="item"
                      as="template">
                      <li :class="[
                        active ? 'bg-amber-400 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]">
                        <div class="flex items-center space-x-4">
                          <span class="w-5 h-5 rounded inline-block" :style="{ backgroundColor: item.hex }" :class="[
                            selected ? 'border-[3px] border-red-300' : 'border-[1px] border-gray-500 p-[3px]']"></span>
                          <span :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]">{{ item.name }}</span>
                        </div>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </Listbox>
            </div>
            <div v-else class=" max-w-lg  relative flex items-center justify-center  space-x-6">
              <input type="text"
                class="w-96 py-5 px-4 block rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
                v-model="newColor" placeholder="Ürün Renk Adı Giriniz." />
            </div>
            <div class="w-full flex items-center justify-end mt-3">
              <label for="customColorCheckbox" class="text-sm text-gray-800/80">Özel Bir renk Oluştur</label>
              <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customColorCheckbox">
                <input type="checkbox"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                  id="customColorCheckbox" v-model="checkedColor" />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" stroke-width="1">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div class="w-56 max-w-md mb-10 relative z-10">
            <div class="block md:hidden ">
              <div class="font-medium">Adet</div>
              <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                Lütfen Adet bilgisi giriniz. Bu bilgi gereklidir.
              </div>
            </div>
            <input type=""
              class="py-5 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
              v-model="quantity" @keydown="handleKeyDown" placeholder="Lütfen Adet Giriniz" />
          </div>
        </div>
      </div>
      <div class="w-full flex-col block pt-5 mt-3 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right  xl:mr-14">
          <div class="text-left">
            <div class="flex items-center">
              <div class="font-medium">Birim Başına Teklif</div>
              <div
                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                Gerekli
              </div>
            </div>
            <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
              Lütfen birim başına teklif seçiniz. Bu bilgi gereklidir.
            </div>
          </div>
        </label>
        <div class="w-full  gap-4 flex mt-4  mb-3">
          <div class="max-w-md mb-10 relative z-10">
            <input type="number"
              class="py-4 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
              v-model="unit_price" @keydown="handleKeyDown" placeholder="Birim Başına Teklif" />
          </div>
        </div>
      </div>
      <button
        class="mt-1 mb-6 max-w-[160px] bg-[#ce5151] px-4 py-3 rounded-lg text-white font-medium hover:bg-[#ec6363] transition-all duration-300"
        @click="() => { resetValues() }">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span>
            Sepete Ekle
          </span>
        </div>
      </button>
    </div>
  </CoverContent>
  <CoverContent title="Sipariş Sepeti">
    <div>
      <div class="overflow-y-auto">
        <div v-if="orderDisplay.length > 0" class=" max-w-6xl mb-5 font-poppins font-medium">
          <div class="relative grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4" v-for="(item, i) in orderDisplay" :key="i"
            :value="item">

            <div v-if="item.product_category" class="w-full flex items-center space-x-4 py-3 px-4">
              <div class="text-sm md:text-base ">
                {{ item.product_category.category }}
              </div>
            </div>

            <div>
              <div v-if="item.product_type" class="w-full h-full flex space-x-4 items-center py-3 px-4">
                <div class="text-sm md:text-base ">
                  {{ item.product_type.product_type }}
                </div>
              </div>
              <div v-else class="py-3 px-4">
                <div class=" flex items-center ">
                  {{ item.type }}
                </div>
              </div>
            </div>

            <div class="min-w-64 py-3 px-4">
              <div class="w-96 flex items-center justify-start space-x-4">
                <span class="inline-block w-8 h-8 border" :style="{ backgroundColor: item.color.hex }"></span>
                <span class="text-sm md:text-base ">
                  {{ item.color.name }}
                </span>
              </div>
            </div>

            <div class="min-w-96 flex items-center justify-center space-x-5">
              <span
                class="py-3 px-4 block w-full border border-gray-100 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff]">
                {{ item.quantity }}
              </span>
              <span class="text-sm">
                X
              </span>
              <span
                class="py-3 px-4 block w-full border border-gray-100 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff]">
                {{ item.unit_price }}
              </span>
              <span
                class="py-3 px-4 block w-full border border-gray-100 rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#f6fcff] whitespace-nowrap">
                {{ (item.unit_price * item.quantity) + ' TL' }}
              </span>
              <div>
                <button @click="create.removeOrderItem(i)"
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-400 text-white disabled:opacity-50 disabled:pointer-events-none hover:bg-white hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class=" max-w-6xl flex items-center justify-between py-2 px-3 mb-10 rounded-lg text-lg">
        <span class="text-blue-500">Toplam Teklif </span>
        <span class="text-blue-500">{{ formData.offer_price }} TL</span>
      </div>
      <div v-if="orderDisplay.length > 0" class="mt-7 flex flex-wrap items-center space-x-4 mb-10">
        <button :disabled="loading" @click="createOrder"
          class="group relative inline-flex border border-[#3d85bb] focus:outline-none lg:ml-4 lg:inline-flex">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[#3d85bb] text-center font-semibold bg-white ring-1 ring-[#3d85bb] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            <template v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3d85bb]" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"></path>
              </svg>
              Yükleniyor...
            </template>
            <template v-else>
              Sipariş Oluştur
            </template>
          </span>
        </button>
        <button :disabled="loading" @click="create.rejectOrder"
          class="group relative inline-flex border border-[#c64646] focus:outline-none lg:ml-4 lg:inline-flex">
          <span
            class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[#c64646] text-center font-semibold bg-white ring-1 ring-[#c64646] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Sipariş İptal Et
          </span>
        </button>
      </div>
    </div>
  </CoverContent>
</template>

<script setup>
import CoverContent from '@/components/CoverContent.vue';

import { Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { onMounted, ref, watch } from 'vue'

import { useCategoryStore } from '@/stores/useCategoryStore.js'
import { useCreateStore } from '@/stores/useCreateStore.js' // Pinia store'unuzun yolu
import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify' // Vue3-Toastify'ı içe aktar


import { storeToRefs } from 'pinia'



const loading = ref(false);
const store = useCategoryStore()
const create = useCreateStore()
const router = useRouter()

const { productCategories, types } = storeToRefs(store)


const { orderDisplay, formData } = storeToRefs(create)

let colors = [
  { name: 'Siyah', hex: '#000000' },
  { name: 'Beyaz', hex: '#FFFFFF' },
  { name: 'Kırmızı', hex: '#FF0000' },
  { name: 'Saks mavi', hex: '#123456' },
  { name: 'Real Blue', hex: '#0000FF' },
  { name: 'Pembe', hex: '#FFC0CB' },
  { name: 'Turuncu', hex: '#FFA500' },
  { name: 'Sarı', hex: '#FFFF00' },
  { name: 'Mor', hex: '#800080' },
  { name: 'Yeşil', hex: '#008000' }
];

const checkedType = ref(false);
const checkedColor = ref(false);

const selectedCategory = ref(null)
const selectedType = ref(null)
const color = ref(null)
const quantity = ref(0)
const unit_price = ref(0)
const type = ref('')
const newColor = ref('')
const hexColor = ref('')


const typeControll = ref(false)
const colorControll = ref(false)


async function resetValues() {
  await create.addOrderItem(selectedCategory.value, selectedType.value, color.value, quantity.value, unit_price.value, type.value, newColor.value, hexColor.value)

  selectedCategory.value = null;
  selectedType.value = null;
  color.value = null;
  quantity.value = '';
  unit_price.value = '';
  type.value = '';
  newColor.value = '';
  hexColor.value = false
  typeControll.value = false
  colorControll.value = false

  checkedType.value = false
  checkedColor.value = false
}

watch(selectedCategory, async (newCategory) => {
  if (newCategory) {
    await store.getProductTypesByCategoryId(newCategory.id)
  }
})

watch(checkedType, (newVal) => {
  if (newVal) {
    selectedType.value = null;
  }
  if (!newVal) {
    type.value = '';
  }
});

watch(checkedColor, (newVal) => {
  if (newVal) {
    color.value = null;
  }
  if (!newVal) {
    newColor.value = '';
  }
});

const handleKeyDown = (event) => {
  const charCode = event.key
  if (
    !charCode.match(/^[0-9]$/) &&
    event.keyCode !== 8 &&
    event.keyCode !== 46
  ) {
    event.preventDefault()
  }
}

const completeOrder = () => {
  toast('Şiparişinizi başarıyla eklendi!', {
    autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    onClose: () => {
      // Bildirim kapatıldığında tetiklenir
      router.push(`/order-complete`) // Yönlendirme işlemini gerçekleştir
    },
  })
}


const createOrder = async () => {
  loading.value = true;
  try {
    await create.createOrder();
  } catch (error) {
    toast.error('Sipariş oluşturulurken bir hata oluştu.');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  store.getProductCategories()
})
</script>

<style scoped></style>