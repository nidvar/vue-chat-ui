<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { loggedIn } from '../globalState/state.ts'
import { useRouter } from 'vue-router'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const clearError = function () {
    error.value = ''
}

const handleLogin = async function () {
    if (password.value.length < 3) {
        error.value = 'password must be longer than 3 characters'
        return
    }
    loading.value = true
    const payload = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        }),
    }
    const result = await fetch(baseUrl + '/login', payload);
    console.log(result);
    const response = await result.json();
    if (response && response.loggedIn == true) {
        email.value = ''
        password.value = ''
        loggedIn.value = true
        router.push('/dashboard')
    } else {
        console.log('no login');
        error.value = response.error
    }
    loading.value = false
}
</script>
<template>
    <div class="form-width mt-3">
        <div v-if="!loading">
            <h3 class="text-center">Login</h3>
            <form @submit.prevent="handleLogin" method="POST">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        @input="clearError"
                        v-model="email"
                    />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="password"
                        @input="clearError"
                    />
                    <p class="error">{{ error }}</p>
                </div>
                <button type="submit" class="btn btn-primary w-100 mt-3" @submit="handleLogin">
                    Login
                </button>
            </form>

            <p class="text-center mt-3 d-flex">
                Don't have an account?
                <RouterLink class="text-primary ms-1" to="/register">Register</RouterLink>
            </p>
        </div>
        <div v-else>
            <h1 class="text-center">Loading....</h1>
        </div>
    </div>
</template>
