<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { loggedIn } from './globalState/state.ts'

const router = useRouter()

const auth = async function () {
    const result = await fetch('http://localhost:8080/auth', {
        credentials: 'include' as RequestCredentials,
    })
    const response = await result.json()
    console.log(response)
    if (!response.authenticated) {
        router.push('/login')
    } else {
        loggedIn.value = response.authenticated
    }
}

onMounted(() => {
    auth()
})
</script>
<template>
    <div class="myNav">
        <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
        <RouterLink class="nav-link" to="/create">CREATE</RouterLink>
        <RouterLink class="nav-link" to="/dashboard" v-if="loggedIn">ACCOUNT</RouterLink>
        <RouterLink class="nav-link" to="/login" v-if="!loggedIn">LOGIN</RouterLink>
    </div>

    <br />
    <RouterView />
</template>
