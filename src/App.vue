<script>
import Form from "@/components/CreatePostForm.vue";
import PostList from "@/components/PostList.vue";
import CreatePostForm from "@/components/CreatePostForm.vue";
import {storeToRefs} from "pinia";

import {usePostsStore} from "@/store/PostsStore";
import {useCategoryStore} from "@/store/CategoryStore";
import {useFilterStore} from "@/store/FilterStore";

export default {
  components: {CreatePostForm, PostList, Form},
  data() {
    return {
      visibleDialogCreate: false,
      value: '',
      postsStore: usePostsStore(),
      categoryStore: useCategoryStore(),
      filterStore: useFilterStore(),
      postsByCount: null
    }
  },
  methods: {
    hideCreatePostFormDialog() {
      this.visibleDialogCreate = false;
    },
    showCreatePostFormDialog() {
      this.visibleDialogCreate = true;
    },
  },
  mounted() {
    this.postsStore.fetchPosts()
    this.postsByCount = storeToRefs(this.postsStore)
  },
}
</script>

<template>
  <div class="container">
    <div class="btns">
      <Button @click="showCreatePostFormDialog">Создать пост</Button>
      <Button @click="postsStore.fetchPosts()">Загрузить посты</Button>
      <Input v-model="filterStore.search" placeholder="Поиск"/>
    </div>
    <div class="categories">
      <span
          v-for="category in categoryStore.categories"
          class="category"
          :class="{
            active: filterStore.category === category
          }"
          @click="filterStore.setCategory(category)"
      >
        {{ category }}
        <span class="posts-count" v-if="postsByCount?.getCountPostsByCategory(category)">{{postsByCount.getCountPostsByCategory(category) || ''}}</span>
      </span>
    </div>
    <Dialog v-model:show="visibleDialogCreate" title="Создание поста">
      <CreatePostForm @hideCreatePostFormDialog="hideCreatePostFormDialog"/>
    </Dialog>
    <main>
      <div class="posts">
        <PostList :posts="postsStore.getFilterByCategoryPosts" :search="filterStore.search"/>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
}

.btns {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 50px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category {
  display: flex;
  align-items: center;
  gap: 5px;
  background: black;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}
.active {
  background: #6e8ab6;
}
.posts-count {
  background: #6e8ab6;
  border-radius: 2px;
  font-size: 10px;
  padding: 2px;
}
</style>
