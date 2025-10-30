<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { loggedIn } from './globalState/state.ts'

</script>
<template>
    <header class="my-header">
        <div class="my-inner-header">
            <div class="my-logo">
                <RouterLink class="active" aria-current="page" to="/">HOME</RouterLink>
            </div>
            <nav class="my-nav">
                <ul>
                    <li><RouterLink to="/create">CREATE</RouterLink></li>
                    <li><RouterLink to="/dashboard" v-if="loggedIn">ACCOUNT</RouterLink></li>
                    <li><RouterLink to="/login" v-if="!loggedIn">LOGIN</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>
    <div class="router-body">
        <RouterView />
    </div>
</template>
