<script setup>
import Channels from './Channels.vue'
import Chat from "./Chat.vue";

</script>

<template>
  <!-- container des 3 partie -->
  <div class="flex flex-row h-full">
    <!-- partie serveur (gauche) -->
    <Channels />

    <!-- partie chat (droite) -->
    <Chat />

  </div>
</template>