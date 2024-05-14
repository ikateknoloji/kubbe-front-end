import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '@/api/apiClient' // axios instance
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify' // Vue3-Toastify'ı içe aktar
import { nextTick } from 'vue';

export const useCreateStore = defineStore('create', () => {
  const router = useRouter()

  const formData = ref({
    order_name: '',
    invoice_type: '',
    offer_price: 0,
    note: '',
    image_url: '',
    // Şirket Bilgileri için
    company_name: '',
    address: '',
    tax_office: '',
    tax_number: '',
    // Her iki kapsamdada olacak bilgiler
    name: '',
    surname: '',
    phone: '',
    email: '',
    order_address: '',
    shipping_type: '',
    addressControll: false,
    // Sipariş kalemleri
    order_items: [],
  })

  const formErrors = ref({
    order_name: '',
    invoice_type: '',
    offer_price: '',
    note: '',
    image_url: '',
    company_name: '',
    address: '',
    tax_office: '',
    tax_number: '',
    name: '',
    surname: '',
    phone: '',
    order_address: '',
    shipping_type: '',
    email: '',
  })

  const orderDisplay = ref([])
  const fileT = ref(null)

  const fileInput = ref(null)
  const imagePreview = ref(null)
  const fileType = ref(null)

  function resetForm() {
    formData.value = {
      order_name: '',
      invoice_type: '',
      offer_price: 0,
      note: '',
      image_url: '',
      company_name: '',
      address: '',
      tax_office: '',
      tax_number: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
      order_address: '',
      shipping_type: '',
      order_items: [],
      addressControll: false,
    };

    orderDisplay.value = [];
    fileT.value = null;
    fileInput.value = null;
    imagePreview.value = null;
    fileType.value = null;
  }


  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (file.type.startsWith('image/')) {
      fileType.value = 'image'
      fileT.value = 'image'
    } else if (file.type === 'application/pdf') {
      fileType.value = 'pdf'
      fileT.value = 'pdf'
    }

    imagePreview.value = URL.createObjectURL(file)
    formData.value.image_url = file
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]

    if (file.type.startsWith('image/')) {
      fileType.value = 'image'
      fileT.value = 'image'
    } else if (file.type === 'application/pdf') {
      fileType.value = 'pdf'
      fileT.value = 'pdf'
    }

    imagePreview.value = URL.createObjectURL(file)
    formData.value.image_url = file
  }

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

  const submitForm = async () => {

    // formErrors nesnesini sıfırlayın
    Object.keys(formErrors.value).forEach((key) => {
      formErrors.value[key] = '';
    });

    // Yeni bir FormData nesnesi oluşturun
    const formDataToSend = new FormData()

    // formData.value içindeki her anahtar-değer çifti için
    for (let key in formData.value) {
      // Eğer anahtar 'image_url' ve değer bir File nesnesi ise
      if (key === 'image_url' && formData.value[key] instanceof File) {
        // Dosyayı 'image_url' anahtarı ile FormData nesnesine ekleyin
        formDataToSend.append('image_url', formData.value.image_url)
      } else {
        // Diğer durumlarda, anahtar ve değeri doğrudan FormData nesnesine ekleyin
        formDataToSend.append(key, formData.value[key])
      }
    }

    try {
      // '/validate-form' rotasına bir POST isteği gönderin
      // FormData nesnesini ve 'Content-Type' başlığını isteğe ekleyin
      const response = await apiClient.post('/validate-form', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // Eğer yanıtın durumu 200 ise
      if (response.status === 200) {
        toast('Müşteri bilgileriniz başarıyla doğrulandı.', {
          autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
          onClose: () => {
            // Kullanıcıyı '/order-create' rotasına yönlendirin
            router.push('/dashboard/musteri/order-item-create')
          }
        })
      }
    } catch (error) {
      // Eğer bir hata oluşursa, hatayı yakalayın
      if (error.response && error.response.data && error.response.data.errors) {
        // Hata mesajlarını formErrors nesnesine ekleyin
        const errors = error.response.data.errors;
        for (let key in errors) {
          if (formErrors.value.hasOwnProperty(key)) {
            formErrors.value[key] = errors[key];
          }
        }
      } else {
      }
    }
  }

  const removeOrderItem = (index) => {
    /*
    // order_items dizisinden öğeyi çıkarın
    formData.value.order_items.splice(index, 1);
  
    // display_order_items dizisinden öğeyi çıkarın
    orderDisplay.value.splice(index, 1);
*/
    const item = formData.value.order_items.splice(index, 1)[0];

    // display_order_items dizisinden öğeyi çıkarın
    orderDisplay.value.splice(index, 1);

    // quantity ve unit_price değerlerini çarpıp offer_price değerinden çıkarın
    formData.value.offer_price -= item.quantity * item.unit_price;

    toast('Ürün sepetinizden çıkarıldı', {
      autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
    })
  };

  const addOrderItem = async (category, product, color, quantity, unit_price, type, newColor) => {

    try {

      const selectedColor = color ? color.name : newColor;

      const orderItem = {
        product_category_id: category?.id,
        product_type_id: product?.id ?? '',
        color: selectedColor,
        quantity,
        unit_price,
        type
      };

      const displayItem = {
        product_category: category,
        product_type: product,
        color: color ? color : { name: newColor, hex: newColor },
        quantity,
        unit_price,
        type
      };

      // FormData nesnesini sunucuya gönderin
      const response = await apiClient.post('/validate-order-item', orderItem)

      if (response.status === 200) {
        // Doğrulama başarılı olduğunda, form verilerini Pinia store'a aktarın
        // Sipariş öğesini order_items dizisine ekleyin
        formData.value.order_items.push(orderItem);

        // Sipariş öğesini display_order_items dizisine ekleyin
        orderDisplay.value.push(displayItem);

        // quantity ve unit_price değerlerini çarpıp offer_price değerine ekleyin
        formData.value.offer_price += Number(quantity * unit_price);

        await nextTick();

        toast('Ürünleriniz Sepete Eklendi', {
          autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        })
      } else {
        toast.error('Bir hata oluştu', {
          // Hata mesajını göster
          autoClose: 3000, // Bildirimi 3 saniye sonra otomatik olarak kapat
        })
      }
    } catch (error) {


      toast.error(`Hata: ${error.response.data.error}`, {
        // Yakalanan hata mesajını göster
        autoClose: 1000, // Bildirimi 3 saniye sonra otomatik olarak kapat
      })

      console.log(error)

    }
  }


  const createOrder = async () => {
    try {

      let formDataToSend = new FormData();

      for (let key in formData.value) {
        if (Array.isArray(formData.value[key])) {
          formData.value[key].forEach((item, index) => {
            for (let subKey in item) {
              formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          });
        } else if (key === 'image_url' && formData.value[key] instanceof File) {
          formDataToSend.append('image_url', formData.value[key], formData.value[key].name);
        } else {
          formDataToSend.append(key, formData.value[key]);
        }
      }

      const response = await apiClient.post('/order-create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.status === 201) {
        toast.success('Sipariş başarıyla oluşturuldu!', {
          onClose: () => {
            resetForm()
            router.push('/dashboard/musteri/order-create');
          }
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const rejectOrder = async () => {
    toast.success('Sipariş başarıyla iptal edildi!', {
      onClose: () => {
        resetForm()
        router.push('/order-info');
      }
    });
  }

  return {
    formData,
    orderDisplay,
    fileT,
    fileInput,
    imagePreview,
    fileType,
    formErrors,
    submitForm,
    addOrderItem,
    handleKeyDown,
    handleDrop,
    handleFileUpload,
    removeOrderItem,
    createOrder,
    rejectOrder
  }
})

