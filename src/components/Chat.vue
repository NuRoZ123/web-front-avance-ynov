<template>
  <div class="bg-[#2B2D31] w-full overflow-y-hidden">

    <div v-show="chatStore.selectedChannel === null"
      class="text-2xl text-white absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
      <span>Aucun salon selectionné.</span>
    </div>

    <div v-if="chatStore.selectedChannel !== null" :class="{ colorMessage: true }"
      class="flex flex-col h-screen w-full items-center justify-evenly">
      <div :style="primaryColor"
        class="w-3/5 h-5/6 overflow-y-scrolls scrollbar-thin scrollbar-track-[#2f3136] scrollbar-thumb-[#202225]">
        <button v-on:click="addMessage"
          class="text-white bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-lg ml-[50%] translate-[-50%] mt-4">charger
          plus</button>
        <Message v-for="message of chatStore.selectedChannel.messages" :message="message" :key="message" />
      </div>

      <div class="relative w-3/5 h-fit">
        <input v-model="message" class="w-full pt-2 pb-2 pl-4 text-white rounded-3xl bg-[#313338]"
          placeholder="saisir  un message">
        <font-awesome-icon icon="fas fa-paper-plane" size="lg" v-on:click="sendMessage()"
          class="absolute right-4 top-[50%] bottom-[50%] rounded-r-3xl text-white bg-[#313338] translate-y-[-50%]" />
      </div>
    </div>

    <div v-if="chatStore.selectedChannel !== null" class="absolute right-0 top-0 h-screen w-40 bg-[#202225]">
      <div v-if="chatStore.selectedChannel.creator === username && !showAddUser" v-on:click="changeShowAddUserState"
        class="w-4/5 ml-[10%] text-white rounded-2xl hover:bg-[#313338] mt-4">
        <font-awesome-icon icon="fas fa-plus" size="lg" class="pl-4" />
        <span class="ml-2">Ajouter</span>
      </div>

      <div v-if="chatStore.selectedChannel.creator === username && showAddUser"
        class="w-4/5 text-white mt-4 flex flex-col">
        <input v-model="addUsername" class="w-4/5 ml-[20%] rounded-2xl bg-[#313338] text-white pl-4"
          placeholder="Utilisateur">
        <button class="w-4/5 ml-[20%] mt-2 bg-[#00ff00] rounded-2xl" v-on:click="addUser">Ajouter</button>
        <button class="w-4/5 ml-[20%] mt-2 bg-[#ff0000] rounded-2xl" v-on:click="changeShowAddUserState">Annuler</button>
      </div>


      <div v-if="chatStore.selectedChannel.creator === username" v-on:click="changeIsDeleteModeState"
        class="w-4/5 ml-[10%] text-white rounded-2xl hover:bg-[#313338] mt-4" :class="{ 'bg-[#ff0000]': isDeleteMode }">
        <font-awesome-icon icon="fas fa-minus" size="lg" class="pl-4" v-show="!isDeleteMode" />
        <font-awesome-icon icon="fas fa-check" size="lg" class="pl-4" v-show="isDeleteMode" />
        <span class="ml-2">Supprimer</span>
      </div>

      <div class="ml-[10%] w-4/5 h-0.5 bg-[#2f3136] mt-2"></div>

      <div v-for="user of chatStore.selectedChannel.users" :key="user" class="text-white ml-4 mt-4 flex justify-between">
        <span>{{ user }}</span>
        <font-awesome-icon icon="fas fa-trash" size="lg" v-show="isDeleteMode && username !== user"
          v-on:click="deleteUser(user)" class="pl-4 pr-4 text-[#ff0000]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { StoreChat } from "../../stores/StoreChat.js";
import { StoreChannel } from "../../stores/StoreChannel.js";
import Message from './Message.vue';
import { ref } from "vue";

const chatStore = StoreChat();
const channelStore = StoreChannel();

let message = "";
const username = localStorage.getItem("username");
const addUsername = ref("");
const showAddUser = ref(false);
const isDeleteMode = ref(false);
const isEditing = ref(false)

const accentColor = ref('#202225');
if (chatStore.selectedChannel && chatStore.selectedChannel.theme && chatStore.selectedChannel.theme.accent_color) {
  accentColor.value = chatStore.selectedChannel.theme.accent_color;
}

let primaryColor = "color: #2f3136";
if (chatStore.selectedChannel && chatStore.selectedChannel.theme && chatStore.selectedChannel.theme.primary_color) {
  primaryColor = `color: ${chatStore.selectedChannel.theme.primary_color}`;
}

const sendMessage = function () {
  if (message.trim() !== "") {
    const hasSendMessage = chatStore.sendMessage(message, chatStore.selectedChannel);

    if (hasSendMessage) {
      message = "";
    }
  }
}

const changeShowAddUserState = function () {
  if (showAddUser.value) {
    addUsername.value = "";
  }

  showAddUser.value = !showAddUser.value;
}

const addUser = async function () {
  const hasAddUser = await channelStore.addUser(chatStore.selectedChannel, addUsername.value);
  if (hasAddUser) {
    chatStore.addUser(addUsername.value);
    changeShowAddUserState();
  }
}

const changeIsDeleteModeState = async function () {
  isDeleteMode.value = !isDeleteMode.value;
}

const deleteUser = async function (user) {
  const hasDeleteUser = await channelStore.removeUser(chatStore.selectedChannel, user);
  if (hasDeleteUser) {
    chatStore.removeUser(user);
  }
}

const addMessage = async function () {
  chatStore.addMessageToSelectedChannel();
}

</script>