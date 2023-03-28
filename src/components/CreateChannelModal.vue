<template>
  <!-- frame principale -->
  <div class="z-20 w-3/5 h-3/5 shadow-2xl absolute left-[20%] top-[20%] bg-[#2f3136] text-center">

    <!-- croix (fermeture modal) -->
    <div class="w-full flex justify-end">
      <div v-on:click="channelStore.closeCreateModal" class="mt-8 mr-8 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
        <font-awesome-icon icon="fa-solid fa-xmark" size="2xl"/>
      </div>
    </div>

    <!-- titre -->
    <h1 class="text-white text-3xl pt-8">Création de channel</h1>

    <!-- contenue -->
    <div class="h-full flex items-center">
      <!-- formulaire creation channel (nom, image) -->
      <form class="flex flex-col w-1/2 ml-[25%] text-white translate-y-[-50%]">
        <input v-model="newChannel.name" placeholder="nom" class="mt-8 bg-[#202225] px-4 py-2 rounded-lg"/>
        <input v-model="newChannel.img" placeholder="lien de l'image" class="mt-8 bg-[#202225] px-4 py-2 rounded-lg">
        <button v-on:click="creeChannel" type="button" class="mt-8 bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600">Crée le channel</button>
      </form>
    </div>

  </div>
</template>

<script setup>
import {StoreChannel} from "../../stores/StoreChannel";
import {reactive} from "vue";

const channelStore = StoreChannel();
const newChannel = reactive({nom: "", img: ""})


const creeChannel = function() {
  channelStore.creeChannel(newChannel);
}
</script>