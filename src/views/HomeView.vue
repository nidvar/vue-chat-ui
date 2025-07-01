<script setup lang="ts">
import {ref} from 'vue';

interface Data {
  id: number
  title: string
  body: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
};

const data = ref<Data[]>([]);

const grabData = async ()=>{

  const blogs = localStorage.getItem('blogs');

  if(blogs != null && blogs.length > 0){
    console.log('there is local storage')
    data.value = JSON.parse(blogs);
    console.log(data.value)
  }else{
    const result = await fetch('http://localhost:8080/');
    const response = await result.json();
    localStorage.setItem('blogs', JSON.stringify(response));
    data.value = response;
  }
};

function timeAgo(date: Date | string) {
  const now: Date = new Date();
  const past: Date = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
};

grabData();

</script>

<template>
  <div class="container-md mt-3">
    <h3 class="text-center">VueJS - Node</h3>
    <p class="text-center">Express - MongoDB</p>
    <br /><br />
    <div v-for="item in data" :key="item.id" class="blog-display">
      <p><strong>{{ item.username }}</strong> - {{ timeAgo(item.updatedAt) }}</p>
      <p><strong>{{ item.title }}</strong></p>
      <p>{{ item.body }}</p>
      <br />
    </div>
  </div>
</template>
