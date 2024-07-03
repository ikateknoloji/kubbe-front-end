import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import apiClient from '@/api/apiClient'; // apiClient'i içe aktarın
import { toast } from 'vue3-toastify'; // Vue3-Toastify'ı içe aktar

export const useInfoStore = defineStore('info', () => {
 const fileInput = ref(null);
 const image = ref(null);
 const fileType = ref(null);

 const uploadedProductionImages = ref([]);

 const errors = reactive({}); // Hata mesajlarını saklayacak reactive değişken

 const reactiveFormData = reactive({
  payment_proof: [], // Dosyaları bir array olarak tanımlayın
  invoice_type: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  shipping_type: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  order_address: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  company_name: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  addressControll: false, // Örnek değer, ihtiyacınıza göre güncelleyin
  address: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  tax_office: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  tax_number: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  email: '', // Örnek değer, ihtiyacınıza göre güncelleyin
  payment_status: '',
 });

 const handleFilePondUpdate = (fileItems) => {
  uploadedProductionImages.value = fileItems.map(fileItem => fileItem.file);
 };

 const resetErrors = () => {
  for (let key in errors) {
   if (errors.hasOwnProperty(key)) {
    errors[key] = '';
   }
  }
 };

 const onChange = (file) => {
  fileType.value = file.type;
  reactiveFormData.payment_proof = [file]; // İlk dosyayı array olarak kaydedin

  if (fileType.value.startsWith('image/')) {
   const reader = new FileReader();
   reader.onload = (e) => {
    image.value = e.target.result;
   };
   reader.readAsDataURL(file);
  } else if (fileType.value === 'application/pdf') {
   image.value = URL.createObjectURL(file);
  } else {
   console.error('Unsupported file type:', fileType.value);
  }
 };

 const onDrop = (e) => {
  fileInput.value.files = e.dataTransfer.files;
  onChange(fileInput.value.files[0]);
 };


 const resetForm = () => {
  reactiveFormData.payment_proof = [];
  reactiveFormData.invoice_type = '';
  reactiveFormData.shipping_type = '';
  reactiveFormData.order_address = '';
  reactiveFormData.company_name = '';
  reactiveFormData.addressControll = false;
  reactiveFormData.address = '';
  reactiveFormData.tax_office = '';
  reactiveFormData.tax_number = '';
  reactiveFormData.email = '';
  fileInput.value = null;
  image.value = null;
  fileType.value = null;
  uploadedProductionImages.value = [];
  reactiveFormData.payment_status = '';
  resetErrors();
 };



 const onUpload = async (orderId, router) => {
  resetErrors();

  const formDataToSend = new FormData();
  formDataToSend.append('payment_proof', reactiveFormData.payment_proof[0]); // İlk dosyayı alın
  formDataToSend.append('invoice_type', reactiveFormData.invoice_type);
  formDataToSend.append('shipping_type', reactiveFormData.shipping_type);
  formDataToSend.append('order_address', reactiveFormData.order_address);
  formDataToSend.append('company_name', reactiveFormData.company_name);
  formDataToSend.append('addressControll', reactiveFormData.addressControll);
  formDataToSend.append('address', reactiveFormData.address);
  formDataToSend.append('tax_office', reactiveFormData.tax_office);
  formDataToSend.append('tax_number', reactiveFormData.tax_number);
  formDataToSend.append('email', reactiveFormData.email);
  formDataToSend.append('payment_status', reactiveFormData.payment_status);

  uploadedProductionImages.value.forEach((file, index) => {
   formDataToSend.append(`production_images[${index}]`, file);
  });

  try {
   const response = await apiClient.post(`/orders/${orderId}/approve-payment-and-proceed`, formDataToSend, {
    headers: {
     'Content-Type': 'multipart/form-data'
    }
   });

   if (response.data.message) {
    toast(response.data.message, {
     autoClose: 3000,
     onClose: () => {
      resetForm();
      router.back();
     }
    });
   } else if (response.data.error) {
    toast(response.data.error, {
     autoClose: 3000,
    });
   }
  } catch (error) {
   console.log(error)
   if (error.response && error.response.status === 422) {
    Object.assign(errors, error.response.data.errors);
   } else {
    toast('Beklenmedik bir hata oluştu.', {
     autoClose: 3000,
    });
   }
  }
 };

 return {
  fileInput,
  image,
  fileType,
  reactiveFormData,
  errors,
  uploadedProductionImages,
  onChange,
  onDrop,
  onUpload,
  handleFilePondUpdate,
 };
});
