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
  max-width: 540px;
  margin: auto;
  height: 50px;
  padding: 10px;
  font-size: 20px;
  text-decoration: underline;
}
textarea {
  min-height:200px !important;
}
.reply{
  min-height:70px !important;
}
.blog-display{
  border-bottom:1px solid lightgray;
}
.blog-display h5, p{
  margin:0 !important;
}
a:link, a:visited{
  text-decoration: none;
  color:inherit;
}
.link{
  padding:15px 0 15px 0;
}
.link:hover {
 background-color: whitesmoke;
}
.comment-display{
  padding:10px;
}
</style>
