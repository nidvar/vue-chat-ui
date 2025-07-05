<script lang="ts" setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {loggedIn} from '../globalState/state.ts';

const router = useRouter();

const title = ref('');
const body = ref('');
const error = ref('');

const clearError = function(){
  error.value = '';
}

const handleSubmit = async function(){
  if(body.value.trim() == '' || title.value.trim() == ''){
    error.value = 'Content is blank';
    return
  };
  if(loggedIn.value == false){
    error.value = 'Please login to continue';
    return;
  };
  const payload = {
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    credentials: 'include' as RequestCredentials,
    body: JSON.stringify({
      title: title.value,
      body: body.value
    })
  };
  try{
    const response = await fetch('http://localhost:8080/create', payload);
    const result = await response.json();
    if(result.message == 'blog created'){
      title.value = '';
      body.value = '';
      localStorage.setItem('blogs', '');
      router.push('/');
    }else{
      error.value = 'Please login to continue';
    }
  }catch(error){
    console.log('error ==== ',error);
  };
}

</script>
<template>
  <div class="container-sm mt-3">
    <h3 class="text-center">Create new Blog</h3>
    <form @submit.prevent="handleSubmit" method="POST">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="title" @input="clearError"/>
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Body</label>
        <textarea type="text" class="form-control" id="body" v-model="body" @input="clearError"></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleSubmit">Create</button>
    </form>
    <p class="error">{{ error }}</p>
  </div>
</template>
