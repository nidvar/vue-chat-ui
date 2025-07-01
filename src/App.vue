<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="myNav">
    <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
    <RouterLink class="nav-link" to="/create">CREATE</RouterLink>
    <RouterLink class="nav-link" to="/login">LOGIN</RouterLink>
  </div>
  <RouterView />
</template>
