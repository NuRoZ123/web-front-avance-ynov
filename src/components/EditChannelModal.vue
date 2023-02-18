<template>
  <!-- frame principale -->
  <div class="w-3/5 h-3/5 shadow-2xl absolute left-[20%] top-[20%] bg-[#2f3136] text-center">

    <!-- croix (fermeture modal) -->
    <div class="w-full flex justify-end">
      <div v-on:click="channelStore.closeEditModal" class="mt-8 mr-8 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
        <font-awesome-icon icon="fa-solid fa-xmark" size="2xl"/>
      </div>
    </div>

    <!-- titre -->
    <h1 class="text-white text-3xl pt-8">Modification de channel</h1>

    <!-- contenue -->
    <div class="h-full flex items-center text-start">

      <!-- formulaire modification channel (selection modal à modifier, nom, image, couleur) -->
      <form class="flex flex-col items-start w-1/2 h-full ml-[25%] text-white">
        <!-- combo box des channels -->
        <select v-model="selectedChannel" v-on:change="changeDefautValue" class=" w-full mt-8 rounded-lg text-white bg-[#202225] px-4 py-2">
          <option v-for="channel of channelStore.channels" :value="channel">{{channel.name}}</option>
        </select>

        <!-- input texte (nom, img) -->
        <input v-model="editeChannel.name" placeholder="nom" class=" w-full mt-8 bg-[#202225] px-4 py-2 rounded-lg"/>
        <input v-model="editeChannel.img" placeholder="lien de l'image" class="w-full mt-8 bg-[#202225] px-4 py-2 rounded-lg">

        <!-- input des couleurs -->
        <label class="w-full mt-8  flex flex-row justify-between items-center">
          <span>accent color</span>
          <input v-model="editeChannel.theme.accent_color" type="color" class="w-3/5 bg-[#202225] rounded-lg">
        </label>

        <label class="w-full mt-8  flex flex-row justify-between items-center">
          <span>accent text color</span>
          <input v-model="editeChannel.theme.accent_text_color" type="color" class="w-3/5 bg-[#202225] rounded-lg">
        </label>

        <label class="w-full mt-8  flex flex-row justify-between items-center">
          <span>couleur primaire</span>
          <input v-model="editeChannel.theme.primary_color" type="color" class="w-3/5 bg-[#202225] rounded-lg">
        </label>

        <label class="w-full mt-8  flex flex-row justify-between items-center">
          <span>couleur primaire (dark mode)</span>
          <input v-model="editeChannel.theme.primary_color_dark" type="color" class="w-3/5 bg-[#202225] rounded-lg">
        </label>

        <label class="w-full mt-8  flex flex-row justify-between items-center">
          <span>couleur du texte</span>
          <input v-model="editeChannel.theme.text_color" type="color" class="w-3/5 bg-[#202225] rounded-lg">
        </label>

        <button v-on:click="editChannel" type="button" class="w-full mt-8 mb-8 bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600">Modifier le channel</button>
      </form>
    </div>

  </div>
</template>

<script setup>
import {StoreChannel} from "../../stores/StoreChannel";
import {reactive, ref} from "vue";

const channelStore = StoreChannel();

const selectedChannel = ref(channelStore.channels[0]);
const editeChannel = reactive({
      name: "",
      img: "",
      theme: {
        primary_color: "",
        primary_color_dark: "",
        accent_color: "",
        text_color: "",
        accent_text_color: ""
      },
})

const changeDefautValue = function() {
  editeChannel.name = selectedChannel.value.name;
  editeChannel.img = selectedChannel.value.img;
  editeChannel.theme = selectedChannel.value.theme !== null ? {
      primary_color: selectedChannel.value.theme.primary_color !== null ? selectedChannel.value.theme.primary_color : "#000000",
      primary_color_dark: selectedChannel.value.theme.primary_color_dark !== null ? selectedChannel.value.theme.primary_color_dark : "#000000",
      accent_color: selectedChannel.value.theme.accent_color !== null ? selectedChannel.value.theme.accent_color : "#000000",
      text_color: selectedChannel.value.theme.text_color !== null ? selectedChannel.value.theme.text_color : "#000000",
      accent_text_color: selectedChannel.value.theme.accent_text_color !== null ? selectedChannel.value.theme.accent_text_color :"#000000"
  } : {
    primary_color: "#000000",
    primary_color_dark: "#000000",
    accent_color: "#000000",
    text_color: "#000000",
    accent_text_color: "#000000"
  }
};

changeDefautValue();


const editChannel = function() {

  channelStore.editChannel(editeChannel, selectedChannel.value);
}
</script>
