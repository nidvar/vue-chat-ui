<script setup lang="ts">

import {loggedIn} from '../globalState/state.ts';
import {useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';

const router = useRouter();
const username = ref('');
const email = ref('');
const dateCreated = ref('');
const noOfPosts = ref('');

const deleteCookie = async function() {
  await fetch('http://localhost:8080/logout', {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
  });
  loggedIn.value = false;
  router.push('/');
};

onMounted(async ()=>{
  console.log('dashboard')
  localStorage.setItem('blogs', '');
  const data = await fetch('http://localhost:8080/dashboard', {
    method:'GET',
    credentials: 'include' as RequestCredentials
  });

  const response = await data.json();
  noOfPosts.value = response.posts.length;

  username.value = response.user.username;
  dateCreated.value = response.user.createdAt;
  email.value = response.user.email;
})

</script>

<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Dashboard</h3>
    <br />
    <div>
      <p><strong>Username:</strong> {{ username }} </p>
      <p><strong>Email:</strong> {{ email }} </p>
      <p><strong>Account Created:</strong> {{ dateCreated }} </p>
      <p><strong>Number of posts:</strong> {{ noOfPosts }}</p>
    </div>

    <br />
    <div class="text-end">
      <button
        type="submit"
        class="btn btn-primary"
        @click="deleteCookie"
      >LOGOUT</button>
    </div>

  </div>
</template>
