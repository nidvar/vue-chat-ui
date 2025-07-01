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
<style>
.container-sm {
  max-width: 540px !important;
}
.myNav {
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: auto;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  text-decoration: underline;
}
h3 {
  margin: 20px !important;
}
textarea {
  min-height:200px !important;
}
.blog-display{
  border-bottom:1px solid lightgray;
  margin-bottom:10px;
}
.blog-display h5, p{
  margin:0 !important;
}
</style>
