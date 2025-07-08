<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { timeAgo } from '../tools/tools.ts'
import { type Data, type User } from '../interfaces/interface.ts'

const data = ref<Data[]>([]);
const users = ref<User[]>([]);

const grabData = async () => {
    const blogs = localStorage.getItem('blogs');
    const usersFromLS = localStorage.getItem('users');

    if (blogs != null && blogs.length > 0 && usersFromLS != null) {
        data.value = JSON.parse(blogs);
        users.value = JSON.parse(usersFromLS);
        data.value = data.value.sort(function(a, b){
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    } else {
        const result = await fetch('http://localhost:8080/')
        const response = await result.json();
        const posts = response.posts;
        users.value = response.users;
        localStorage.setItem('blogs', JSON.stringify(posts));
        localStorage.setItem('users', JSON.stringify(response.users));
        data.value = posts;
        data.value = data.value.sort(function(a, b){
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }
}

grabData();

</script>

<template>
    <div class="container-md mt-3">
        <h3 class="text-center">VueJS - Node</h3>
        <p class="text-center">Express - MongoDB</p>
        <br /><br />
        <div v-for="item in data" :key="item._id" class="blog-display">
            <div class="link">
                <RouterLink :to="'blog/' + item._id">
                    <p class="user-details">
                        <div v-for="user in users" :key="user.email">
                            <div v-if="user.email == item.email">
                                <img :src="user.profilePic" class="profile-mini"/> <strong>{{ item.username }}</strong> - {{ timeAgo(item.updatedAt) }}
                            </div>
                        </div>
                    </p>
                    <p>
                        <strong>{{ item.title }}</strong>
                    </p>
                    <p>{{ item.body }}</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
