 <script setup lang="ts">
import Login from './components/Login.vue'
import Accueil from './components/Accueil.vue'

const tokenExist = localStorage.getItem("token");
const connexionDate = new Date(localStorage.getItem("connexionDate"));
connexionDate.setHours(connexionDate.getHours() + 3);
const now = new Date(Date.now().valueOf());
const isMoreThan3Hours = connexionDate > now;

</script>

<template>
  <Accueil v-if="$route.name === 'accueil' && tokenExist && !isMoreThan3Hours"/>
  <Login v-else-if="$route.name === 'login' || !tokenExist" />

</template>