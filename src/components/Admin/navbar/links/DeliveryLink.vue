<template>
  <li class="hs-accordion " id="delivery-accordion">
    <button type="button"
      class="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-3 px-4 text-sm text-slate-700 rounded-lg hover:bg-gray-100 ">

      <svg class="w-6 h-6 fill-slate-700" width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.97002 7.27501L8.39918 8.82751C8.80335 10.29 9.00502 11.0217 9.59918 11.3542C10.1933 11.6875 10.9475 11.4908 12.4558 11.0992L14.0558 10.6825C15.5642 10.2908 16.3183 10.095 16.6617 9.51918C17.005 8.94251 16.8033 8.21084 16.3983 6.74834L15.97 5.19668C15.5658 3.73334 15.3633 3.00168 14.77 2.66918C14.175 2.33584 13.4208 2.53251 11.9125 2.92501L10.3125 3.34001C8.80418 3.73167 8.05002 3.92834 7.70752 4.50501C7.36418 5.08084 7.56585 5.81251 7.97002 7.27501Z" />
        <path
          d="M1.89747 4.37251C1.91943 4.29337 1.95677 4.21932 2.00736 4.15462C2.05795 4.08991 2.1208 4.03581 2.19231 3.99541C2.26382 3.95501 2.3426 3.92911 2.42413 3.91917C2.50566 3.90924 2.58835 3.91547 2.66747 3.93751L4.08664 4.33085C4.46276 4.43299 4.80599 4.63085 5.08289 4.90512C5.35979 5.17939 5.56091 5.52072 5.66664 5.89585L7.45914 12.3842L7.59081 12.84C8.12227 13.0359 8.57012 13.4087 8.85914 13.8958L9.11747 13.8158L16.5091 11.895C16.5886 11.8743 16.6713 11.8695 16.7527 11.8808C16.834 11.8921 16.9123 11.9193 16.9831 11.9608C17.0539 12.0024 17.1158 12.0575 17.1653 12.123C17.2148 12.1885 17.251 12.2631 17.2716 12.3425C17.2923 12.422 17.2972 12.5047 17.2859 12.586C17.2746 12.6673 17.2474 12.7456 17.2058 12.8164C17.1643 12.8872 17.1092 12.9492 17.0437 12.9987C16.9782 13.0482 16.9036 13.0843 16.8241 13.105L9.45997 15.0183L9.18497 15.1033C9.17997 16.1617 8.44914 17.13 7.34331 17.4167C6.01831 17.7617 4.65581 16.9983 4.30081 15.7133C3.94581 14.4275 4.73247 13.1058 6.05747 12.7617C6.12276 12.7449 6.18864 12.7304 6.25497 12.7183L4.46164 6.22835C4.41336 6.06161 4.32276 5.9102 4.19863 5.78885C4.07451 5.6675 3.92109 5.58034 3.75331 5.53585L2.33331 5.14168C2.25418 5.11981 2.18013 5.08256 2.1154 5.03206C2.05067 4.98157 1.99652 4.91881 1.95604 4.84739C1.91557 4.77596 1.88957 4.69726 1.87952 4.61578C1.86947 4.5343 1.87557 4.45163 1.89747 4.37251Z" />
      </svg>


      Teslimat

      <svg class="hs-accordion-active:block ms-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500 "
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>

      <svg class="hs-accordion-active:hidden ms-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500 " width="16"
        height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor"
          stroke-width="2" stroke-linecap="round"></path>
      </svg>
    </button>

    <div id="delivery-accordion"
      class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
      <ul class="pt-2 ps-2">
        <li v-for="(status, code) in statusMap" :key="code" class="relative">
          <router-link :to="`/dashboard/admin/orders/${code}`"
            class="flex items-center gap-x-3.5 py-3 pl-4 px-6 text-sm text-slate-700 rounded-lg hover:bg-gray-200">
            {{ status }}
          </router-link>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>

const statusMap = {
  'PR': 'Teslim Bekleyen Siparişler',
  'PD': 'Teslim Edilen Siparişler',
};

</script>

<style scoped></style>