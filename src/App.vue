<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import {loggedIn} from './globalState/state.ts';


onMounted(()=>{
  console.log('on mounted', loggedIn.value);
});



</script>
<template>
  <div class="myNav">
    <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
    <RouterLink class="nav-link" to="/create">CREATE</RouterLink>
    <RouterLink class="nav-link" to="/dashboard" v-if="loggedIn">ACCOUNT</RouterLink>
    <RouterLink class="nav-link" to="/login" v-if="!loggedIn">LOGIN</RouterLink>
  </div>

  <br />
  <RouterView />
</template>
