<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import {loggedIn} from './globalState/state.ts';


onMounted(()=>{
  console.log('on mounted', loggedIn.value);
});

const deleteCookie = function() {
  fetch('http://localhost:8080/logout', {
    method: 'GET',
    credentials: 'include'
  });
  loggedIn.value = false;
};

</script>
<template>
  <div class="myNav">
    <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
    <RouterLink class="nav-link" to="/create">CREATE</RouterLink>
    <RouterLink class="nav-link" to="/login" v-if="!loggedIn">LOGIN</RouterLink>
    <p class="nav-link logout" to="/login" v-if="loggedIn" @click="deleteCookie()">LOGOUT</p>
  </div>

  <br />
  <RouterView />
</template>
