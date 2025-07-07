<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { loggedIn } from './globalState/state.ts'
import { auth } from './tools/tools.ts'

const router = useRouter();

onMounted(() => {
    auth(router);
});

</script>
<template>
    <div class="myNav">
        <RouterLink class="nav-link active" aria-current="page" to="/">HOME</RouterLink>
        <RouterLink class="nav-link" to="/create">NEW BLOG</RouterLink>
        <RouterLink class="nav-link" to="/dashboard" v-if="loggedIn">ACCOUNT</RouterLink>
        <RouterLink class="nav-link" to="/login" v-if="!loggedIn">LOGIN</RouterLink>
    </div>

    <br />
    <RouterView />
</template>
