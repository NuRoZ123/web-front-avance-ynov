<!--<script setup lang="ts">-->
<!--import Serveur from './Channel.vue'-->
<!--import CreateChannelModal from "./CreateChannelModal.vue";-->
<!--import EditChannelModal from "./EditChannelModal.vue";-->
<!--import {ServiceChannel} from "../services/ServiceChannel";-->
<!--</script>-->

<template>
  <CreateChannelModal v-if="channelStore.showCreateChannelModal" class="overflow-hidden"/>
  <EditChannelModal v-if="channelStore.showEditChannelModal" class="scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136] overflow-y-scroll"/>

  <div class="w-[4.5rem] h-[100vh] bg-[#202225] flex items-center flex-col overflow-y-scroll no-scrollbar">
    <div class="w-full flex items-center flex-col">
      <!-- premières bulles discord et spacer -->
      <div v-on:click="channelStore.changeCreateChannelModal()" :class="{'bg-[#00ff00]': channelStore.showCreateChannelModal, 'bg-[#2f3136]': !channelStore.showCreateChannelModal}" class="w-12 h-12 flex justify-center items-center rounded-3xl text-white duration-200 hover:rounded-xl hover:bg-[#454fbf] mt-2">
        <font-awesome-icon icon="fa-solid fa-plus" v-show="!channelStore.showCreateChannelModal" class="color-white" />
        <font-awesome-icon icon="fa-solid fa-xmark" v-show="channelStore.showCreateChannelModal" class="color-white" />

      </div>

      <div v-on:click="channelStore.changeEditChannelModal" v-if="channelStore.channels.length > 0" :class="{'bg-[#FFA500]': channelStore.showEditChannelModal, 'bg-[#2f3136]': !channelStore.showEditChannelModal}" class="w-12 h-12 flex justify-center items-center rounded-3xl text-white duration-200 hover:rounded-xl hover:bg-[#454fbf] mt-2">
        <font-awesome-icon icon="fa-solid fa-edit" v-show="!channelStore.showEditChannelModal" class="color-white" />
        <font-awesome-icon icon="fa-solid fa-xmark" v-show="channelStore.showEditChannelModal" class="color-white" />
      </div>

      <div v-on:click="channelStore.changeStateDeleteMode" v-if="channelStore.channels.length > 0" :class="{'bg-[#ff0000]': channelStore.isDeleteMode, 'bg-[#2f3136]': channelStore.isDeleteMode}" class="w-12 h-12 bg-[#2f3136] flex justify-center items-center rounded-3xl text-white duration-200 hover:rounded-xl hover:bg-[#454fbf] mt-2">
        <font-awesome-icon icon="fa-solid fa-check" v-show="channelStore.isDeleteMode" class="color-white" />
        <font-awesome-icon icon="fa-solid fa-minus" v-show="!channelStore.isDeleteMode" class="color-white" />
      </div>

      <div class="w-8 h-0.5 bg-[#2f3136] mt-2"></div>

      <!--  liste des serveur -->
      <Channel v-for="channel of channelStore.channels" :key="channel" :channel="channel" class="mt-2"/>
    </div>
  </div>
</template>

<script setup>

import Channel from './Channel.vue'
import CreateChannelModal from "./CreateChannelModal.vue";
import EditChannelModal from "./EditChannelModal.vue";
import {StoreChannel} from "../../stores/StoreChannel";

const channelStore = StoreChannel();
channelStore.setupAll();

</script>

<style scoped>
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>