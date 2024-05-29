import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/apiClient' // axios instance
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useCategoryStore = defineStore('categories', () => {
  // 'productCategories' adında bir reaktif değer oluşturun
  let productCategories = ref(null)

  let types = ref(null)

  const loadingStore = useLoadingStore();

  const getProductCategories = async () => {
    try {
      const response = await apiClient.get('/product_categories')
      productCategories.value = response.data.categories
    } catch (error) {
    }
  }

  const getProductTypesByCategoryId = async (categoryId) => {
    try {
      loadingStore.setLoading(true); // Yüklenme durumunu başlat
      const response = await apiClient.get(
        `/product_types/${categoryId}`
      )
      types.value = response.data.productTypes
    }
    catch (error) { }
    finally { loadingStore.setLoading(false); }
  }

  return {
    productCategories,
    types,
    getProductCategories,
    getProductTypesByCategoryId,
  }
})
