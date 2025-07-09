<script lang="ts" setup>
import { loggedIn } from '../globalState/state.ts'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fileHandler } from '../tools/tools.ts'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const router = useRouter()
const username = ref('')
const email = ref('')
const dateCreated = ref('')
const noOfPosts = ref('');
const error = ref('');
const previewUrl = ref('');
const setProfilePic = ref('');

const editProfilePicture = ref(false);

const deleteCookie = async function () {
    await fetch(baseUrl + '/logout', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    })
    loggedIn.value = false;
    router.push('/');
};

const onFileChange = async (event: Event) => {
    const imageData = await fileHandler(event);
    previewUrl.value = imageData.payload;
};

const readableDate = function(userInput:string){
    const date = new Date(userInput);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const grabUserData = async function () {
    const data = await fetch(baseUrl + '/dashboard', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
    })
    const response = await data.json();

    if (response.posts) {
        noOfPosts.value = response.posts.length
    }
    if (response.user) {
        username.value = response.user.username
        dateCreated.value = readableDate(response.user.createdAt)
        email.value = response.user.email
        setProfilePic.value = response.user.profilePic
    };
};

const updateProfilePic = async function(){
    if(previewUrl.value.trim() == ''){
        error.value = 'Upload picture';
        return
    };
    editProfilePicture.value = false;
    const payload = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify({
            profilePic: previewUrl.value
        })
    }
    await fetch(baseUrl + '/picture', payload);
    error.value = '';
    grabUserData();
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
        <div class="text-center image-preview">
            <img :src="setProfilePic" v-if="!editProfilePicture">
        </div>
        <div class="text-center" v-if="editProfilePicture">
            <img :src="previewUrl" class="image-preview"><br /><br />
            <input
                v-if="previewUrl == ''"
                type="file"
                @change="onFileChange"
            />
        </div>
        <br />
        <div class="text-center">
            <button class="btn btn-primary btn-sm" @click="editProfilePicture = true" v-if="!editProfilePicture">Edit Profile Picture</button>
            <div v-else>
                <button class="btn btn-danger btn-sm" @click="editProfilePicture = false; previewUrl = ''; error = ''">Cancel</button>
                <button class="btn btn-primary btn-sm ms-2" @click="updateProfilePic" v-if="previewUrl != ''">Upload</button>
            </div>
            <p class="error">{{ error }}</p>
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
