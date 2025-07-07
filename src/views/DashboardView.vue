<script lang="ts" setup>
import { loggedIn } from '../globalState/state.ts'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fileHandler } from '../tools/tools.ts'

const router = useRouter()
const username = ref('')
const email = ref('')
const dateCreated = ref('')
const noOfPosts = ref('');

const previewUrl = ref('');
const editProfilePicture = ref(false);

const deleteCookie = async function () {
    await fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    })
    loggedIn.value = false;
    router.push('/');
};

const onFileChange = async (event: Event) => {
    const imageData = await fileHandler(event);
    console.log(imageData);
};

const grabUserData = async function () {
    const data = await fetch('http://localhost:8080/dashboard', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    })
    const response = await data.json()
    if (response.posts) {
        noOfPosts.value = response.posts.length
    }
    if (response.user) {
        username.value = response.user.username
        dateCreated.value = response.user.createdAt
        email.value = response.user.email
    }
};
onMounted(() => {
    localStorage.setItem('blogs', '');
    grabUserData();
})
</script>

<template>
    <div class="container-sm mt-3">
        <h3 class="text-center">Dashboard</h3>
        <br />
        <img src="" class="image-preview"><br /><br />
        <div class="text-center" v-if="editProfilePicture">
            <img :src="previewUrl" class="image-preview"><br /><br />
            <input
                v-if="previewUrl == ''"
                type="file"
                @change="onFileChange"
            />
            <button
                v-else
                @click="previewUrl = ''"
                class="btn btn-danger btn-sm"
                >Remove
            </button>
        </div>
        <br />
        <button @click="editProfilePicture = true" v-if="!editProfilePicture">Edit Profile Picture</button>
        <button @click="editProfilePicture = true" v-else>Cancel</button>
        <div>

        </div>
        <br />
        <div>
            <p><strong>Username:</strong> {{ username }}</p>
            <p><strong>Email:</strong> {{ email }}</p>
            <p><strong>Account Created:</strong> {{ dateCreated }}</p>
            <p><strong>Number of posts:</strong> {{ noOfPosts }}</p>
        </div>

        <br />
        <div class="text-end">
            <button type="submit" class="btn btn-primary" @click="deleteCookie">LOGOUT</button>
        </div>
    </div>
</template>
