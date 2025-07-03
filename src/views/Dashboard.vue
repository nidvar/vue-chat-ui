<script setup lang="ts">

import {loggedIn} from '../globalState/state.ts';
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

const router = useRouter();
const userDetails = ref(null);

const deleteCookie = async function() {
  await fetch('http://localhost:8080/logout', {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
  });
  loggedIn.value = false;
  router.push('/');
};

onMounted(async ()=>{
  const data = await fetch('http://localhost:8080/dashboard', {
    method:'GET',
    credentials: 'include' as RequestCredentials
  });

  const response = await data.json();
  console.log(response);
  userDetails.value = response;
})

</script>

<template>
  <div class="container-sm mt-3">
    <h1>Dashboard</h1>
    <button
      type="submit"
      class="btn btn-primary w-100 mt-3"
      @click="deleteCookie"
    >LOGOUT</button>
  </div>
</template>
