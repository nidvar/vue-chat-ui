<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { timeAgo } from '../tools/tools.ts'
import { type Data } from '../interfaces/interface.ts'

const data = ref<Data[]>([])

const grabData = async () => {
    const blogs = localStorage.getItem('blogs')
    if (blogs != null && blogs.length > 0) {
        data.value = JSON.parse(blogs)
    } else {
        const result = await fetch('http://localhost:8080/')
        const response = await result.json()
        localStorage.setItem('blogs', JSON.stringify(response))
        data.value = response
    }
}

grabData()

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
                        <strong>{{ item.username }}</strong> - {{ timeAgo(item.updatedAt) }}
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
