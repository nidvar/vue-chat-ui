<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { fileHandler } from '../tools/tools';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const error = ref('');
const errorImage = ref('');

const imagePreview = ref('');

const onFileChange = async function(event: Event){
    errorImage.value = '';
    const fileURL = await fileHandler(event);
    imagePreview.value = fileURL.payload;
    if(fileURL.error != ''){
        errorImage.value = fileURL.error;
    };
}

const clearError = function(){
    error.value = '';
}

const handleSubmit = async function () {
    if(password.value != confirm.value){
        error.value = 'passwords do not match';
        return
    };
    if(username.value.trim() == '' || email.value.trim() == '' || password.value.trim() == ''){
        error.value = 'missing fields';
        return
    }
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
    const response = await fetch(baseUrl + '/register', payload)
    const result = await response.json()
    console.log(result);
    if(result.message = 'user created'){
        router.push('/login');
    }
}
</script>
<template>
    <div class="container-sm mt-3">
        <h3 class="text-center">Register</h3>
        <form @submit.prevent="handleSubmit" method="POST">
            <div class="text-center">
                <img :src="imagePreview" class="image-preview"/>
                <p class="error">{{ errorImage }}</p>
            </div>
            <br />
            <div class="text-center">
                <input type="file" @change="onFileChange" />
            </div>
            <br /><br />
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" @input="clearError"/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    v-model="email"
                    @input="clearError"
                />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" @input="clearError"/>
            </div>
            <div class="mb-3">
                <label for="confirm" class="form-label">Confirm password</label>
                <input type="confirm" class="form-control" id="confirm" v-model="confirm" @input="clearError"/>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleSubmit">
                Register
            </button>
            <p v-if="error != ''" class="error">{{ error }}</p>
        </form>
    </div>
</template>
