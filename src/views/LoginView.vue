<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Login</h3>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" />
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3">Login</button>
    </form>

    <p class="text-center mt-3 d-flex">
      Don't have an account?
      <RouterLink class="nav-link text-primary ms-1" to="/register">Register</RouterLink>
    </p>
  </div>
</template>
