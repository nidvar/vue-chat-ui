<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { timeAgo, auth } from '../tools/tools.ts'
import { type Blog, type Reply, type User } from '../interfaces/interface.ts'
import { loggedIn } from '../globalState/state.ts'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const route = useRoute()
const router = useRouter()
const error = ref<null | string>(null)
const delay = ref('');

const blog = ref<Blog | null>(null)
const replies = ref<Reply[]>([])

const replyTo = ref('')
const comment = ref('')

const deletePopup = ref(false);

const ableToDelete = ref(false);

const userEmail = ref('');
const editBlog = ref(false);

const clearError = function () {
    error.value = ''
}

const title = ref('');
const body = ref('');

const users = ref<User[]>([]);

const grabBlog = async function () {
    const response = await fetch(baseUrl + '/blog/' + route.params.id)
    const result = await response.json();
    users.value = result.allUsers;
    const data = result.blogPost;
    replies.value = result.replies;
    replies.value = replies.value.sort(function(a, b){
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    const userData = await auth(router, 'email');
    userEmail.value = userData.email;
    if(userData && userData.email == data.email){
        ableToDelete.value = true;
    }else{
        ableToDelete.value = false;
    }
    if (data.title != null && data.body != null) {
        error.value = null
        blog.value = {
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        }
        replyTo.value = ''
        comment.value = '';
        title.value = data.title;
        body.value = data.body;
    } else {
        error.value = 'Error!'
    }
}

const addComment = async function () {
    if (!loggedIn.value) {
        error.value = 'please login to add a comment'
        return
    }
    if (comment.value.trim() == '') {
        error.value = 'comment cannot be empty'
        return
    }
    replyTo.value = route.params.id as string
    const payload = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify({
            replyTo: replyTo.value,
            comment: comment.value,
        }),
    }
    await fetch(baseUrl + '/comment', payload)
    grabBlog()
}

const deleteComment = async function (arg?: number | string) {
    const body = {
        blogId: route.params.id,
        comment: false
    };
    if(arg){
        body.blogId = arg as string;
        body.comment = true;
    };
    const payload = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify(body),
    }
    await fetch(baseUrl + '/delete', payload)
    if(!arg){
        router.push('/');
    }else{
        grabBlog();
    }
}

const submitEdit = async function(){
    const payloadBody = {
        blogTitle: title.value,
        blogBody: body.value,
        id: route.params.id
    }
    const payload = {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include' as RequestCredentials,
        body:JSON.stringify(payloadBody)
    };
    const response = await fetch(baseUrl + '/update', payload);
    const result = await response.json();
    if(result.message == 'updated'){
        grabBlog();
        ableToDelete.value = false
        editBlog.value = false;
        title.value = '';
        body.value = '';
    };
}

const delayedWarning = function(){
    setTimeout(()=>{
        delay.value = 'Maybe 50 seconds...'
    }, 10000)
}

delayedWarning();
grabBlog();


</script>
<template>
    <div class="container-sm mt-3" v-if="!deletePopup">
        <br />
        <div v-if="blog" class="blog-page">
            <div v-if="!editBlog">
                <div v-for="user in users" :key="user.email">
                    <div v-if="user.username == blog.username">
                        <img :src="user.profilePic" class="profile-mini me-2"/>
                        <strong>{{ blog.username }}</strong> - {{ timeAgo(blog.updatedAt) }}
                    </div>
                </div>
                <h3>{{ blog.title }}</h3>
                <p>{{ blog.body }}</p>
                <div class="text-end mt-3" v-if="ableToDelete">
                    <button @click="editBlog = true" class="btn btn-success btn-sm me-2">EDIT</button>
                    <button @click="deletePopup = true" class="btn btn-danger btn-sm">DELETE</button>
                </div>
                <hr />
            </div>
            <br />
            <div v-if="editBlog">
                <form @submit.prevent="submitEdit" method="PUT">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            v-model="title"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="body" class="form-label">Body</label>
                        <textarea
                            type="text"
                            class="form-control"
                            id="body"
                            v-model="body"
                        ></textarea>
                    </div>
                    <div class="text-end" v-if="ableToDelete">
                        <button @click="editBlog = false" class="btn btn-danger btn-sm me-2">CANCEL</button>
                        <button @submit="submitEdit" class="btn btn-primary btn-sm">EDIT</button>
                    </div>
                </form>
            </div>

            <form @submit.prevent="addComment" method="POST">
                <div class="mb-3">
                    <label for="comment" class="form-label">Add a comment</label>
                    <textarea
                        type="text"
                        class="form-control reply"
                        id="comment"
                        v-model="comment"
                        @input="clearError"
                    ></textarea>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary btn-sm" @submit="addComment">
                        Add Comment
                    </button>
                </div>
                <p class="error">{{ error }}</p>
            </form>

            <br />
            <hr />

            <div v-for="item in replies" :key="item._id" class="comment-display">
                <div v-for="user in users" :key="user.email">
                    <div v-if="user.username == item.username">
                        <img :src="user.profilePic" class="profile-mini me-2"/>
                        <strong>{{ item.username }}</strong> - {{ timeAgo(item.updatedAt) }}
                    </div>
                </div>
                <p>{{ item.comment }}</p>
                <div class="text-end" v-if="userEmail == item.email">
                    <button
                        type="submit"
                        class="btn btn-danger btn-sm"
                        @click="deleteComment(item._id)"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <h3>Loading...</h3>
            <p>Could take a while...</p>
            <br /><br />
            <p>{{delay}}</p>
        </div>
    </div>
    <div class="container-sm mt-3" v-else>
        <div v-if="blog" class="blog-page">
            <p>Are you sure you want to delete comment?</p>
            <p>This cannot be undone.</p>
            <br />
            <div class="text-center">
                <button @click="deletePopup = false" class="btn btn-success me-2">CANCEL</button>
                <button @click="deleteComment()" class="btn btn-danger">DELETE</button>
            </div>
            <br />
        </div>
    </div>
</template>
