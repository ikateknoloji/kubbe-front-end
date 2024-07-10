<template>
  <CoverContent title="Sipariş Kalemi Oluştur">
    <div>

      <div class="w-full flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:mr-14">
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
        <div class="w-full gap-4 flex flex-wrap mt-4 mb-3">
          <div class="w-full max-w-xs mb-10 relative ">
            <select v-model="selectedCategory"
              class="mb-5 py-3 px-4 pe-3 block w-full border-gray-200/80 rounded-lg text-sm border focus:border-blue-500/80 focus:ring-blue-400/80 disabled:opacity-50 disabled:pointer-events-none focus:outline-none ">
              <option v-for="category in productCategories" :key="category.id" :value="category.id">
                {{ category.category }}
              </option>
            </select>
          </div>
          <div class="flex justify-center items-center w-[500px]">
            <div v-if="!typeControll" class="w-full  mb-10 relative ">
              <select v-if="!checkedType" v-model="selectedType"
                class="mb-5 py-3 px-4 pe-3 block w-full border-gray-200/80 rounded-lg text-sm border focus:border-blue-500/80 focus:ring-blue-400/80 disabled:opacity-50 disabled:pointer-events-none focus:outline-none ">
                <option v-for="type in types" :key="type.id" :value="type.id">
                  {{ type.product_type }}
                </option>
              </select>
              <div v-else class="w-72  relative z-10 -translate-y-3">
                <input type="text"
                  class="py-4 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
                  v-model="type" placeholder="Lütfen Yeni Ürün Tipini Giriniz" />
              </div>
            </div>
            <div class="w-96 inline-flex items-center -translate-y-full mt-6">
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
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:mr-14">
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
        <div class="w-full flex-wrap gap-4 flex mt-4 mb-3">
          <div class=" relative flex flex-col ">
            <div class=" w-96">
              <select v-if="!checkedColor" v-model="selectedColor"
                class="mb-5 py-3 px-4 pe-3 block w-[240px] border-gray-200/80 rounded-lg text-sm border focus:border-blue-500/80 focus:ring-blue-400/80 disabled:opacity-50 disabled:pointer-events-none focus:outline-none ">
                <option v-for="color in colors" :key="color.hex" :value="color.name">
                  <div class="flex items-center justify-center space-x-3">
                    <span>{{ color.name }}</span>
                  </div>
                </option>
              </select>
              <div v-else class="max-w-lg relative flex items-center justify-center space-x-6">
                <input type="text"
                  class="w-96 py-5 px-4 block rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
                  v-model="selectedColor" placeholder="Ürün Renk Adı Giriniz." />
              </div>
            </div>
            <div class="w-full flex items-center  mt-3">
              <label for="customColorCheckbox" class="text-sm text-gray-800/80">Özel Bir renk Oluştur</label>
              <label class="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customColorCheckbox">
                <input type="checkbox" v-model="checkedColor"
                  class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                  id="customColorCheckbox" />
                <span
                  class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                    stroke="currentColor" stroke-width="1">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 011.414 0l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div class="w-56 max-w-md mb-10 relative z-10">
            <div class="block md:hidden">
              <div class="font-medium">Adet</div>
              <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                Lütfen Adet bilgisi giriniz. Bu bilgi gereklidir.
              </div>
            </div>
            <input type="number" v-model="quantity"
              class="py-5 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
              placeholder="Lütfen Adet Giriniz" />
          </div>
        </div>
      </div>



      <div class="mb-10 w-full flex-col block pt-5 mt-3 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
        <label class="w-72 inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:mr-14">
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
        <div class="w-full gap-4 flex mt-4 mb-3">
          <div class="max-w-md mb-10 relative z-10">
            <input type="number" v-model="unit_price"
              class="py-4 px-4 block w-full rounded text-sm focus:border-[#6398bc] focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none bg-[#ffffff] shadow-md text-gray-900"
              placeholder="Birim Başına Teklif" />
          </div>
        </div>
      </div>




      <button @click="addToBasketItem"
        class="group relative inline-flex border border-[#EC6363] focus:outline-none lg:ml-4 lg:inline-flex">
        <span
          class="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-[#181818] text-center font-semibold bg-white ring-1 ring-[#181818] ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6 mr-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          Sipariş Kalemini Ekle
        </span>
      </button>
    </div>
  </CoverContent>



  <CoverContent v-if="orderBasket" title="Sipariş Sepeti">
    <TableColm :columns="columnsData" />
    <EditTableItem :data="orderBasket.items" />
  </CoverContent>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import apiClient from '@/api/apiClient';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'

import EditTableItem from '@/components/Admin/EditTableItem.vue';
import CoverContent from '@/components/CoverContent.vue';
import TableColm from '@/components/Admin/TableColm.vue';
import { useCategoryStore } from '@/stores/useCategoryStore.js'

import { toast } from 'vue3-toastify' // Vue3-Toastify'ı içe aktar

const orderBasket = ref(null);
const route = useRoute();
const router = useRouter();

const basketId = route.params.id;
const store = useCategoryStore()
const { productCategories, types } = storeToRefs(store)

const selectedCategory = ref(null);
const selectedType = ref(null);
const selectedColor = ref(null);
const quantity = ref(null);
const type = ref(null);
const unit_price = ref(null);

const checkedType = ref(false);
const checkedColor = ref(false);

const typeControll = ref(false)
const colorControll = ref(false)


const resetForm = () => {
  // Form değerlerini sıfırla
  selectedType.value = null;
  selectedColor.value = null;
  quantity.value = null;
  type.value = null;
  unit_price.value = null;
  newColor.value = null;

  // Kontrol değerlerini sıfırla
  checkedType.value = false;
  checkedColor.value = false;
  typeControll.value = false;
  colorControll.value = false;
};

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


const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
  'Birim Fiyatı',
  'Sil'
];

const fetchBasket = async () => {
  try {
    const response = await apiClient.get(`/order-baskets/${basketId}`);
    orderBasket.value = response.data.orderBasket;
  } catch (error) {
    console.error('Error fetching basket:', error);
  }
};

const addToBasketItem = async () => {
  try {
    const response = await apiClient.post(`/add-basket-items/${basketId}`,
      {
        product_category_id: selectedCategory.value,
        product_type_id: selectedType.value,
        color: selectedColor.value,
        quantity: quantity.value,
        unit_price: unit_price.value,
        type: type.value,
      }
    );

    toast.success('Sipariş kalemi başarıyla sepete eklendi!',
      {
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        onClose: () => { // Bildirim kapatıldığında tetiklenir
          // Yönlendirme işlemini gerçekleştir
          fetchBasket();
          resetForm();
        }
      }
    );

  } catch (error) {
    toast.error(error.response?.data?.error, {
      autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    });
    console.log(error)
  }
};

onMounted(() => {
  fetchBasket();
  store.getProductCategories()
});

watch(() => selectedCategory.value, async (newCategory) => {
  if (newCategory) {
    await store.getProductTypesByCategoryId(newCategory)
  }
});

</script>