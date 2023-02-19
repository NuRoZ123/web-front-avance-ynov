<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-sm">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-lg font-medium mb-4 text-gray-900">Connexion</h2>
        <span>{{error}}</span>
        <div class="mb-4">
          <label class="block font-medium mb-2 text-gray-700" for="username">
            Pseudo
          </label>
          <input
            class="w-full border border-gray-400 p-2 rounded-lg"
            id="username"
            type="username"
            v-model="username"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-2 text-gray-700" for="password">
            Mot de passe
          </label>
          <input
            class="w-full border border-gray-400 p-2 rounded-lg"
            id="password"
            type="password"
            v-model="password"
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600"
            v-on:click="login()"
          >
            Connexion
          </button>
          <a
            class="font-medium text-indigo-500 hover:text-indigo-600"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {ServiceUser} from "../services/ServiceUser";

const username = ref("");
const password = ref("");
const error = ref("");

const login = async function () {
  const response = await ServiceUser.login(username.value, password.value);
  if(response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username.value);
    localStorage.setItem("connexionDate", Date.now().valueOf());
    window.location.reload();
  } else {
    error.value = "Username or password incorrect"
  }
}

</script>
  
  