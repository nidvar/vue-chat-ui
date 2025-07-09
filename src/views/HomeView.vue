<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { timeAgo } from '../tools/tools.ts'
import { type Data, type User } from '../interfaces/interface.ts'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
        const result = await fetch(baseUrl)
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

const trimBody = function(body: string){
    const myArray: string[] = [];

    if(body.length > 14){
        const shorter = body.split(' ');
        shorter.forEach((item:string, index)=>{
            if(index < 14){
                myArray.push(item);
            }
        });
        let preview = myArray.join(' ');
        preview = preview + '...';
        return preview
    }else{
        return body;
    }
}

grabData();

</script>

<template>
    <div class="container-md mt-3">
        <h3 class="text-center">VueJS - Node</h3>
        <p class="text-center">Login / Authentication & Database</p>
        <br /><br />
        <div v-for="item in data" :key="item._id" class="blog-display">
            <div class="link">
                <RouterLink :to="'blog/' + item._id">
                    <div class="user-details">
                        <div v-for="user in users" :key="user.email">
                            <div v-if="user.email == item.email">
                                <img :src="user.profilePic" class="profile-mini"/> <strong>{{ item.username }}</strong> - {{ timeAgo(item.updatedAt) }}
                            </div>
                        </div>
                    </div>
                    <p>
                        <strong>{{ item.title }}</strong>
                    </p>
                    <p>{{ trimBody(item.body) }}</p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
