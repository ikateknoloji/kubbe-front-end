<template>
  <nav class="hs-accordion-group p-6 w-full flex flex-col  flex-wrap font-poppins font-medium"
    data-hs-accordion-always-open>
    <ul>
      <li class="mb-10">
        <InformationLink />
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