<template>
  <div class="list">
    <PostItem
        v-if="posts.length !== 0"
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :search="search"
    />
    <h1 v-else>Нет постов</h1>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    },
    search: String
  }
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>