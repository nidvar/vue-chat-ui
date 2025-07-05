<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = async function () {
  const payload = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value,
    }),
  }
  const response = await fetch('http://localhost:8080/register', payload)
  const result = await response.json()
  console.log(result);
}
</script>
<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Register</h3>
    <form @submit.prevent="handleSubmit" method="POST">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" />
      </div>
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
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleSubmit">
        Register
      </button>
    </form>
  </div>
</template>
