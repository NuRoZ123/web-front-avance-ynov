 <script setup lang="ts">
import Login from './components/Login.vue'
import Accueil from './components/Accueil.vue'

const tokenExist = localStorage.getItem("token");
if(tokenExist) {
  const connexionDate = new Date(parseInt(localStorage.getItem("connexionDate")));

  connexionDate.setHours(connexionDate.getHours() + 3);
  const now = new Date(Date.now().valueOf());
  const isMoreThan3Hours = connexionDate > now;

  if(!isMoreThan3Hours) {
    localStorage.removeItem("token");
    localStorage.removeItem("connexionDate");
    window.location.reload();
  }

}
</script>

<template>
  <Accueil v-if="$route.name === 'accueil' && tokenExist"/>
  <Login v-else-if="$route.name === 'login' || !tokenExist" />

</template>