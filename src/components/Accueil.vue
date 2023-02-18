<script setup lang="ts">
import Serveurs from './Channels.vue'

</script>

<template>
  <!-- container des 3 partie -->
  <div class="flex flex-row h-full">
    <!-- partie serveur (gauche) -->
    <Serveurs />

    <!-- partie chat (droite) -->
    <div class="bg-[#36393f] w-full">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {

    };
  }
});
</script>