<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();


const title = ref('');
const body = ref('');

const handleSubmit = async function(){

  console.log(1)

  const payload = {
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      body: body.value
    })
  }

  console.log(2)

  const response = await fetch('http://localhost:8080/create', payload);

  console.log('response', response);

  title.value = '';
  body.value = '';

  router.push('/');
  console.log(3)
}

</script>
<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Create new Blog</h3>
    <form @submit.prevent="handleSubmit" method="POST">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="title"/>
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <textarea type="text" class="form-control" id="body" v-model="body"></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleSubmit">Create</button>
    </form>
  </div>
</template>
