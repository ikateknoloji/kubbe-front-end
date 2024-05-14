<template>
  <nav class="hs-accordion-group p-6 w-full flex flex-col  flex-wrap font-poppins font-medium"
    data-hs-accordion-always-open>
    <ul>
      <li class="mb-10">
        <InformationLink />
      </li>
      <li class="mb-10">
        <router-link to="/dashboard/musteri/order-create"
          class="inline-block w-[200px] mx-4 select-none rounded-lg bg-blue-500 py-4 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          Sipariş Oluştur
        </router-link>
      </li>
      <li class="mb-10">
        <OrderLink />
        <PaymentLink />
        <DeliveryLink />
        <RejectedOrders />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import InformationLink from './links/InformationLink.vue';
import OrderLink from './links/OrderLink.vue';
import PaymentLink from './links/PaymentLink.vue';
import DeliveryLink from './links/DeliveryLink.vue';
import RejectedOrders from './links/RejectedOrders.vue';

const props = defineProps({
  status: Object
});



</script>

<style scoped></style>