<template>
  <div v-if="data" class="font-poppins">
    <div class="p-4 md:p-8 mt-5">
      <InfoReject v-if="data.is_rejected === 'R'" :order="data" />
      <CanceledOrder v-if="data.is_rejected === 'C'" :order="data" />
      <PendingCancellation v-if="data.is_rejected === 'P'" :order="data" />

      <div class="text-3xl inline-block bg-gray-200/80 py-3 px-5 mb-5 rounded font-semibold text-red-600/70">
        {{ ordersData.order.order_name }}
      </div>

      <CoverContent title="Müşteri Bilgileri">
        <div class="flex flex-wrap md:space-x-3">
          <Dealer :info="data.customer" />
          <ManufacturerInfo :info="data.manufacturer" />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-12  lg:col-span-7 min-h-[300px] lg:order-0 order-1">
            <OrderInfo :order="data" />
          </div>
          <div class="col-span-12 lg:col-span-5  lg:order-1 order-0">
            <LogoComponent :order="data" />
          </div>
          <div class="col-span-12  lg:order-1 order-0">
            <div class="w-full flex flex-wrap items-center justify-between">
              <CustomerInfo :customer="data.customer_info" />
              <QRCodeVue3 :width="200" :height="200" :value="url + data.order_code"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
                  type: 'dots',
                  color: '#333',
                  gradient: {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: '#333' },
                      { offset: 1, color: '#333' },
                    ],
                  },
                }" :backgroundOptions="{ color: '#ffffff' }" :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
                :cornersDotOptions="{ type: undefined, color: '#000000' }" fileExt="png" :download="false"
                myclass="my-qur" imgclass="img-qr" :downloadOptions="{ name: 'vqr', extension: 'png' }" />
            </div>
          </div>
        </div>
      </CoverContent>

      <ImageList v-if="data">
        <SiparisLogo :url="data" />
        <TasarimButton :url="data" />
        <UrunButton :url="data" />
      </ImageList>

      <OrderTable>
        <TableColm :columns="columnsData" />
        <OrderTableItem :data="data.order_items" />
      </OrderTable>

      <div class="p-4 md:p-8 max-w-5xl overflow-x-scroll border my-10">
        <div v-if="ordersData" class="font-poppins min-w-[500px]">

          <div id="printMe">
            <table class="table">
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>Soyisim</th>
                  <th>Telefon Numarası</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ ordersData.order.customer_info.name }}</td>
                  <td>{{ ordersData.order.customer_info.surname }}</td>
                  <td>{{ ordersData.order.customer_info.phone }}</td>
                </tr>
              </tbody>
            </table>
            <table class="table">
              <thead>
                <tr>
                  <th>Adres</th>
                  <th>Qr Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ ordersData.order.order_address.address }} </td>
                  <td>
                    <QRCodeVue3 :width="150" :height="150" :value="url + ordersData.order.order_code"
                      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
                        type: 'dots',
                        color: '#333',
                        gradient: {
                          type: 'linear',
                          rotation: 0,
                          colorStops: [
                            { offset: 0, color: '#333' },
                            { offset: 1, color: '#333' },
                          ],
                        },
                      }" :backgroundOptions="{ color: '#ffffff' }"
                      :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
                      :cornersDotOptions="{ type: undefined, color: '#000000' }" fileExt="png" :download="false"
                      myclass="my-qur" imgclass="img-qr" :downloadOptions="{ name: 'vqr', extension: 'png' }" />
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table">
              <TableColm :columns="columnsData" />
              <OrderTableItem :data="ordersData.order.order_items" />
            </table>
          </div>
          <button type="button"
            class="mt-10 w-fit text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  dark:focus:ring-red-100"
            @click="printPage">Yazdırmak İçin Tıklayınız</button>
        </div>
      </div>

      <OrderNote v-if="data.note" :note="data.note" />
      <div class="mt-10">
        <CoverContent title="Kargo Kodu Güncelle">
          <KargoCodeGuncelle :orderId="data.id" />
        </CoverContent>
      </div>

    </div>
  </div>


</template>

<script setup>
import QRCodeVue3 from "qrcode-vue3";

import InfoReject from '@/components/Admin/reject/InfoReject.vue';
import CanceledOrder from '@/components/Admin/reject/CanceledOrder.vue';
import PendingCancellation from '@/components/Admin/reject/PendingCancellation.vue';

import OrderTable from '@/components/Kurye/OrderTable.vue';
import TableColm from '@/components/Kurye/TableColm.vue';
import OrderTableItem from '@/components/Kurye/OrderTableItem.vue';

import CustomerInfo from '@/components/Admin/CustomerInfo.vue';
import Dealer from '@/components/Admin/Dealer.vue';
import LogoComponent from '@/components/Admin/LogoComponent.vue';

import OrderInfo from '@/components/Kurye/OrderInfo.vue';

import OrderNote from '@/components/Admin/OrderNote.vue';
import OrderAddress from '@/components/Admin/OrderAddress.vue';
import ManufacturerInfo from '@/components/Admin/ManufacturerInfo.vue';
import ImageList from '@/components/Admin/ImagesList.vue';
import CoverContent from '@/components/CoverContent.vue';
import EditButton from '@/components/Admin/edit/EditButton.vue';
import KargoCodeGuncelle from '@/components/Kurye/KargoCodeGuncelle.vue';


import SiparisLogo from '@/components/Admin/buttons/SiparisLogo.vue';
import TasarimButton from '@/components/Admin/buttons/TasarimButton.vue';
import UrunButton from '@/components/Admin/buttons/UrunButton.vue';

const url = import.meta.env.VITE_APP_BASE_URL_KURYE

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const columnsData = [
  '#',
  'Kategori',
  'Ürün Tipi',
  'Renk',
  'Adet',
];

function printPage() {
  const printContent = document.getElementById('printMe');
  const newWin = window.open('');
  newWin.document.write('<style>.table { width: 100%; border-collapse: collapse; margin-bottom: 20px; } .table th, .table td { border: 1px solid #333; padding: 10px; text-align: left; }</style>');
  newWin.document.write(printContent.innerHTML);
  newWin.print();
  newWin.close();
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  /* İstediğiniz değeri ayarlayın */
}

.table th,
.table td {
  border: 1px solid #333;
  padding: 8px;
  text-align: left;
}
</style>