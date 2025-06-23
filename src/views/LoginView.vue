<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = async function(){

  console.log(email.value, password.value)

  const payload = {
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }
  const result = await fetch('http://localhost:8080/login', payload);
  const response = await result.text();
  console.log(response);
}

</script>
<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Login</h3>
    <form @submit.prevent="handleLogin" method="POST">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password"/>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleLogin">Login</button>
    </form>

    <p class="text-center mt-3 d-flex">
      Don't have an account?
      <RouterLink class="nav-link text-primary ms-1" to="/register">Register</RouterLink>
    </p>
  </div>
</template>
