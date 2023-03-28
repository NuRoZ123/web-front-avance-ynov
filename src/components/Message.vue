<template>
  <div :style="colorPrimary" v-if="message.author !== username"
    class="w-full h-fit overflow-hidden text-ellipsis pt-2 pb-2 flex flex-col">
    <div class="flex flex-row ml-4 items-end">
      <span class="text-xl text-white">{{ message.author }}</span>
      <span class="ml-2 text-gray-600 text-[#989798]">{{ formateDate(message.timestamp) }}</span>
    </div>
    <p class="ml-8" :style="colorText" v-show="message.content.Text">{{ message.content.Text }}</p>
    <img v-show="message.content.Image" :src="message.content.Image" class="ml-8">
  </div>
  <div :style="colorPrimary" v-if="message.author === username"
    class="w-full h-fit overflow-hidden text-ellipsis pt-2 pb-2 flex flex-col items-end">
    <div class="flex flex-row mr-4 items-end">
      <span class="mr-2 text-gray-600 text-[#989798]">{{ formateDate(message.timestamp) }}</span>
      <span class="text-xl text-white">{{ message.author }}</span>
    </div>
    <p class="mr-8 text-end" :style="colorText" :contenteditable="message.author === username"
      v-show="message.content.Text" @input="editingMessage.value = $event.target.innerText"
      @keydown.enter="saveEditingMessage" @blur="saveEditingMessage">{{ isEditing.value ? editingMessage.value :
        message.content.Text }}</p>
    <img v-show="message.content.Image" :src="message.content.Image" class="ml-8 w-4/5 h-4/5">
  </div>
</template>
<script setup>
import { StoreChat } from "../../stores/StoreChat";
import { ref, reactive } from "vue";

const props = defineProps({
  message: Object
});

const chatStore = StoreChat();

const colorText = ref(`color: #ffffff;`);
if (chatStore.selectedChannel && chatStore.selectedChannel.theme && chatStore.selectedChannel.theme.text_color) {
  colorText.value = `color: ${chatStore.selectedChannel.theme.text_color}`;
}

const colorPrimary = ref(`background-color: #2f3136;`);
if (chatStore.selectedChannel && chatStore.selectedChannel.theme && chatStore.selectedChannel.theme.primary_color) {
  colorPrimary.value = `background-color: ${chatStore.selectedChannel.theme.primary_color}`;
}

const username = localStorage.getItem("username");

const formateDate = function (longDate) {
  const date = new Date(longDate);
  const day = date.getDate().toLocaleString().padStart(2, "0");
  const month = (date.getMonth() + 1).toLocaleString().padStart(2, "0");
  const years = date.getFullYear().toLocaleString().padStart(2, "0");
  const hours = date.getHours().toLocaleString().padStart(2, "0");
  const minutes = date.getMinutes().toLocaleString().padStart(2, "0");
  const secondes = date.getSeconds().toLocaleString().padStart(2, "0");
  return `${day} -${month} -${years} à ${hours}:${minutes}:${secondes}`;
}

// vérifier si le message est en cours de modification
const isEditing = ref(false);

// stocker le contenu en cours de modification
const editingMessage = ref("");

// fonction pour enregistrer le message modifié
const saveEditingMessage = function () {
  if (editingMessage.value.trim() !== "") {
    message.content.Text = editingMessage.value;
    isEditing.value = false;
    //enregistrer le message
  }
};

// fonction pour démarrer la modification du message
const startEditingMessage = function () {
  if (message.author === username) {
    isEditing.value = true;
    editingMessage.value = message.content.Text;
  }
};

</script>