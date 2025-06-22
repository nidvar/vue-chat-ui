<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="myNav">
    <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
    <RouterLink class="nav-link" to="/login">LOGIN / REGISTER</RouterLink>
  </div>
  <RouterView />
</template>
<style>
.container-sm {
  max-width: 540px !important;
}
.myNav {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: auto;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  text-decoration: underline;
}
h3 {
  margin: 20px !important;
}
</style>
