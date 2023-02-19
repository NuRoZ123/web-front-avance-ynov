<template>
  <div class="w-full h-fit overflow-hidden text-ellipsis text-white mt-2 mb-2">
    <div class="flex flex-row ml-4 items-end">
      <span class="text-xl">{{message.author}}</span>
      <span class="ml-2 text-gray-600 text-[#989798]">{{formateDate(message.timestamp)}}</span>
    </div>
    <span class="ml-8">{{message.content.Text}}</span>
  </div>
</template>

<script setup>

import {defineProps} from "vue";

const props = defineProps({
  message  : Object
});

const formateDate = function(longDate) {
  const date = new Date(longDate);
  const day = date.getDate().toLocaleString().padStart(2, "0");
  const month = (date.getMonth() + 1).toLocaleString().padStart(2, "0");
  const years = date.getFullYear().toLocaleString().padStart(2, "0");
  const hours = date.getHours().toLocaleString().padStart(2, "0");
  const minutes = date.getMinutes().toLocaleString().padStart(2, "0");
  const secondes = date.getSeconds().toLocaleString().padStart(2, "0");

  return `${day}-${month}-${years} à ${hours}:${minutes}:${secondes}`;
}
</script>