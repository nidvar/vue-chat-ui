<script setup lang="ts">

const grabData = async ()=>{
  const result = await fetch('http://localhost:8080/');
  const response = await result.text();
  console.log(response);
}

grabData();

</script>

<template>
  <div class="container-lg mt-3">
    <h3 class="text-center">VueJS - Node</h3>
    <p class="text-center">Express - MongoDB</p>
  </div>
</template>
