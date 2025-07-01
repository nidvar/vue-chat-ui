<script lang="ts" setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {timeAgo} from '../tools/tools.ts';

const route = useRoute();
const error = ref<null | string>(null);

interface Blog{
  _id:number
  title: string
  body: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
};

interface Reply{
  _id: number
  comment: string
  replyTo: string
  email: string
  username: string
  createdAt: Date
  updatedAt: Date
}

const blog = ref<Blog | null>(null);
const replies = ref<Reply[]>([]);

const replyTo = ref('');
const comment = ref('');

const grabBlog = async function(){
  const response = await fetch('http://localhost:8080/blog/' + route.params.id);
  const result = await response.json();

  const data = result.blogPost[0];
  replies.value = result.replies;

  if(data.title != null && data.body != null){
    error.value = null;
    blog.value = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
    replyTo.value = '';
    comment.value = '';
  }else{
    error.value = 'Error!';
  }
};

const addComment = async function(){
  replyTo.value = route.params.id as string;
  const payload = {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body:JSON.stringify({
      replyTo: replyTo.value,
      comment: comment.value
    })
  };
  const response = await fetch('http://localhost:8080/comment', payload);
  const result = await response.json();
  console.log(result);
  grabBlog();
};

grabBlog();

</script>
<template>
  <div class="container-sm mt-3">
    <br />
    <div v-if="blog" class="blog-page">
      <p><strong>{{ blog.username }}</strong> - {{ timeAgo(blog.updatedAt) }}</p>
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.body }}</p>
      <hr >
      <br />

      <form @submit.prevent="addComment" method="POST">
        <div class="mb-3">
          <label for="comment" class="form-label">Add a comment</label>
          <textarea type="text" class="form-control reply" id="comment" v-model="comment"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary" @submit="addComment">Add Comment</button>
        </div>
      </form>

      <div v-for="item in replies" :key="item._id" class="comment-display">
        <p><strong>{{item.username}}</strong> - {{ timeAgo(item.updatedAt) }}</p>
        <p>{{ item.comment }}</p>
      </div>

    </div>
    <div v-else>
      <h3 class="text-center">Error...</h3>
    </div>
  </div>
</template>
