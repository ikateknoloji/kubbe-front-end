import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import apiClient from '@/api/apiClient' // axios instance
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify' // Vue3-Toastify'ı içe aktar
import { nextTick } from 'vue';
import { useLoadingStore } from '@/stores/loadingStore'; // useLoadingStore'un doğru yolunu belirt

export const useCreateStore = defineStore('create', () => {
  const router = useRouter()
  const loadingStore = useLoadingStore();

  const formData = ref({
    customer: {
      name: 'Mehmet',
      surname: 'Kara',
      phone: '5358757884',
      email: 'ikatech@gmail.com',
    },
    order: {
      order_name: 'mehmet',
      offer_price: 0,
      note: '',
    },
    baskets: [], // Boş sepetler dizisi
  })

  const formErrors = ref({
    customer: {
      name: '',
      surname: '',
      phone: '',
      email: '',
    },
    order: {
      order_name: '',
      offer_price: '',
      note: '',
    }
  })

  const orderData = reactive({
    selectedCategory: null,
    selectedType: null,
    color: null,
    quantity: 0,
    unit_price: 0,
    type: '',
    newColor: '',
    hexColor: '',
    items: [], // Ürün kalemleri dizisi
    logos: [], // Logo dizisi
  });

  function resetOrderData() {
    orderData.selectedCategory = null;
    orderData.selectedType = null;
    orderData.color = null;
    orderData.quantity = 0;
    orderData.unit_price = 0;
    orderData.type = '';
    orderData.newColor = '';
    orderData.hexColor = '';
  }

  function resetFormData() {
    formData.value.customer = {
      name: '',
      surname: '',
      phone: '',
      email: '',
    };
    formData.value.order = {
      order_name: '',
      offer_price: 0,
      note: '',
    };
    formData.value.baskets = [];
    resetOrderData();
  }

  const validateForm = async () => {
    // formErrors nesnesini sıfırlayın
    Object.keys(formErrors.value.customer).forEach((key) => {
      formErrors.value.customer[key] = '';
    });
    Object.keys(formErrors.value.order).forEach((key) => {
      formErrors.value.order[key] = '';
    });

    // formData nesnesini doğrudan JSON olarak gönderin
    const formDataToSend = {
      customer: formData.value.customer,
      order: formData.value.order,
    };

    try {
      loadingStore.setLoading(true); // Yüklenme durumunu başlat
      // '/validate-form' rotasına bir POST isteği gönderin
      const response = await apiClient.post('/validate-form', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Eğer yanıtın durumu 200 ise
      if (response.status === 200) {
        toast('Müşteri bilgileriniz başarıyla doğrulandı.', {
          autoClose: 1000, // Bildirimi 1 saniye sonra otomatik olarak kapat
          onClose: () => {
            // Kullanıcıyı '/order-create' rotasına yönlendirin
            router.push('/dashboard/musteri/order-item-create');
          }
        });
      }
    } catch (error) {
      // Eğer bir hata oluşursa, hatayı yakalayın
      if (error.response && error.response.data && error.response.data.errors) {
        // Hata mesajlarını formErrors nesnesine ekleyin
        const errors = error.response.data.errors;
        for (let key in errors) {
          const field = key.split('.').pop(); // "customer.name" gibi bir anahtardan "name" kısmını al
          if (formErrors.value.customer.hasOwnProperty(field)) {
            formErrors.value.customer[field] = errors[key][0]; // Hata mesajını ekleyin
          } else if (formErrors.value.order.hasOwnProperty(field)) {
            formErrors.value.order[field] = errors[key][0]; // Hata mesajını ekleyin
          }
        }
      }
    } finally {
      loadingStore.setLoading(false); // Yüklenme durumunu sonlandır
    }
  };

  const addOrderItem = async () => {
    const newItem = {
      product_type_id: orderData.selectedType?.id,
      product_type: orderData.selectedType?.product_type,
      product_category_id: orderData.selectedCategory?.id,
      product_category: orderData.selectedCategory?.category,
      color: orderData.newColor || orderData.color?.name || '',
      quantity: orderData.quantity,
      unit_price: orderData.unit_price,
      type: orderData.type,
      hexColor: orderData.hexColor,
    };

    try {
      const response = await apiClient.post('/validate-order-item-single', newItem, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        orderData.items.push(newItem);
        resetOrderData();
        toast.success('Sipariş kalemi başarıyla eklendi!');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (let key in errors) {
          toast.error(errors[key][0]);
        }
      } else {
        toast.error('Sipariş kalemi eklenirken bir hata oluştu.');
      }
    }
  };

  const removeOrderItem = (index) => {
    orderData.items.splice(index, 1);
  };

  const addOrderLogo = (logo) => {
    orderData.logos.push({ logo_url: logo });
  };

  const removeLogo = (logoUrl) => {
    const index = orderData.logos.findIndex(logo => logo.logo_url === logoUrl);
    if (index !== -1) {
      orderData.logos.splice(index, 1);
    }
  };

  const addItemsAndLogosToBasket = async () => {
    try {
      loadingStore.setLoading(true);
      const response = await apiClient.post('/validate-order-item', {
        items: orderData.items,
        logos: orderData.logos,
      });

      if (response.status === 200) {
        const basket = {
          items: [...orderData.items],
          logos: [...orderData.logos],
        };

        formData.value.baskets.push(basket);

        // Toplam fiyatı güncelle
        orderData.items.forEach(item => {
          formData.value.order.offer_price += item.quantity * item.unit_price;
        });

        // Order data ve items/logos resetleme
        resetOrderData();
        orderData.items = [];
        orderData.logos = [];
      }
    } catch (error) {
      console.error('Hata:', error.response.data.errors);
      // Hataları işleyin, örneğin toast bildirimleri kullanarak
      Object.values(error.response.data.errors).forEach(err => {
        toast.error(err[0]);
      });
    }
    finally { loadingStore.setLoading(false); }
  };

  const removeBasket = (basketIndex) => {
    const basket = formData.value.baskets[basketIndex];

    // Toplam fiyatı güncelle
    basket.items.forEach(item => {
      formData.value.order.offer_price -= item.quantity * item.unit_price;
    });

    // Sepeti kaldır
    formData.value.baskets.splice(basketIndex, 1);
  };

  const removeBasketOrderItem = (basketIndex, itemIndex) => {
    const item = formData.value.baskets[basketIndex].items[itemIndex];
    formData.value.order.offer_price -= item.quantity * item.unit_price;
    formData.value.baskets[basketIndex].items.splice(itemIndex, 1);
  };

  const removeOrderLogo = (basketIndex, logoIndex) => {
    formData.value.baskets[basketIndex].logos.splice(logoIndex, 1);
  };

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

  const resetItemsAndLogos = () => {
    orderData.items = [];
    orderData.logos = [];
  };


  function resetOrderData() {
    Object.assign(orderData, {
      selectedCategory: null,
      selectedType: null,
      color: null,
      quantity: 0,
      unit_price: 0,
      type: '',
      newColor: '',
      hexColor: '',
    });
  }

  async function createOrder() {
    const orderPayload = {
      customer: formData.value.customer,
      order: {
        order_name: formData.value.order.order_name,
        offer_price: formData.value.order.offer_price,
        note: formData.value.order.note,
      },
      baskets: formData.value.baskets,
    };

    try {
      loadingStore.setLoading(true);
      const response = await apiClient.post('/order-create', orderPayload);

      if (response.status === 201) {
        toast.success('Sipariş başarıyla oluşturuldu!');
        resetFormData(); // Form verilerini sıfırla
        router.push('/dashboard/musteri/order-create'); // Kullanıcıyı siparişler sayfasına yönlendir
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.error('Sipariş oluşturma hatası:', error.response.data.errors);
        Object.values(error.response.data.errors).forEach(err => {
          toast.error(err[0]);
        });
        console.log(error)
      } else {
        toast.error('Sipariş oluşturulurken bir hata oluştu.');
        console.log(error)
      }
    } finally {
      loadingStore.setLoading(false);
    }
  }

  return {
    formData,
    formErrors,
    orderData,
    resetOrderData,
    validateForm,
    addOrderItem,
    addOrderLogo,
    addItemsAndLogosToBasket,
    handleKeyDown,
    removeLogo,
    removeOrderItem,
    removeBasket,
    removeBasketOrderItem,
    removeOrderLogo,
    resetItemsAndLogos,
    createOrder,
  };
});
