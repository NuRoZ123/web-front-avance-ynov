<template>
  <!-- cercle principale d'un channel -->
  <div :title="channel.name" v-on:click="clickOnBubble" class="w-12 h-12 bg-[#2f3136] overflow-hidden flex justify-center items-center rounded-3xl text-white duration-200 hover:rounded-xl hover:bg-[#454fbf]">
    <!-- image du channel -->
    <img class="w-[100px]" :src="channel.img">
    <div v-show="channel.unread" class="w-2 h-2 absolute pt-3 pl-4">
      <div class="bg-[#ff0000] w-4 h-4 rounded-3xl"></div>
    </div>

    <!-- affiche la couleur rouge ainsi que la poubelle si selectionner en mode suppression -->
    <div v-show="isSelected && channelStore.isDeleteMode && channel.creator === username" class="absolute bg-[#ff0000] bg-opacity-60 w-12 h-12 rounded-3xl duration-200 hover:rounded-xl">
      <div class="pt-3 pl-4">
        <font-awesome-icon icon="fa-solid fa-trash"/>
      </div>
    </div>

    <!-- affiche la couleur rouge ainsi que le logo interdie en
         mode suppression et que le channel n'appartient pas a l'utilisateur courant -->
    <div v-show="channelStore.isDeleteMode && channel.creator !== username" class="absolute bg-[#ff0000] bg-opacity-60 w-12 h-12 rounded-3xl duration-200 hover:rounded-xl">
      <div class="pt-3 pl-4">
        <font-awesome-icon icon="fa-solid fa-ban"/>
      </div>
    </div>

  </div>
</template>

<script setup>
import {StoreChannel} from "../../stores/StoreChannel";
import {StoreChat} from "../../stores/StoreChat";
import {ref} from "vue";

const channelStore = StoreChannel();
const chatStore = StoreChat();

const props = defineProps({
  channel  : Object
});

const isSelected = ref(false);
const username = localStorage.getItem("username");

const clickOnBubble = function() {
    if(channelStore.isDeleteMode) {
        if(isSelected.value) {
          channelStore.removeFromSoonDeletedChannel(props.channel);
        } else {
          channelStore.addToSoonDeletedChannel(props.channel);
        }

        isSelected.value = !isSelected.value;
    } else {
      chatStore.setSelectedChannel(props.channel);
    }
}
</script>
