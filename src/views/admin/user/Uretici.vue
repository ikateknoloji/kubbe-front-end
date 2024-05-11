<template>
  <div class="flex flex-col p-5 box box--stacked mb-10">
    <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">Üretici Bilgileri</div>
    <OrderTable>
      <TableColm :columns="columns" />
      <ManufacturerTableItem />
    </OrderTable>
  </div>

</template>

<script setup>
import OrderTable from '@/components/Admin/OrderTable.vue';
import TableColm from '@/components/Admin/TableColm.vue';
import ManufacturerTableItem from '@/components/Admin/ManufacturerTableItem.vue';

const columns = [
  "#",
  "Profil Resmi",
  "Müşteri Adı Soyadı",
  "Telefon",
  "Email",
  "Sipariş Geçmişi",
  "Siparişler"
  // Diğer sütun başlıklarını buraya ekleyin
];

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