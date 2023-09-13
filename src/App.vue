<script>
import Form from "@/components/CreatePostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import {usePostsStore} from "@/store/PostsStore";
import CreatePostForm from "@/components/CreatePostForm.vue";
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
    }
  },
  methods: {
    hideCreatePostFormDialog() {
      this.visibleDialogCreate = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
    },
    showCreatePostDialog() {
      this.visibleDialogCreate = true;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')

        if (response.status === 200) {
          this.posts.push(...response.data)
        }
      } catch (e) {

      }
    },
    setCategoryFilter(value) {
      if (this.categoryFilter === value) {
        this.categoryFilter = ''
      } else {
        this.categoryFilter = value;
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
}
</script>

<template>
  <div class="container">
    <div class="btns">
      <Button @click="showCreatePostDialog">Создать пост</Button>
      <Button @click="fetchPosts">Загрузить посты</Button>
      <Input v-model="filterStore.search" placeholder="Поиск"/>
    </div>
    <div class="categories">
      <span
          v-for="category in categoryStore.categories"
          class="category"
          :class="{
            active: filterStore.category === category
          }"
          @click="() => 'Добавить функцию фильтра по категориям'">{{ category }}</span>
    </div>
    <Dialog v-model:show="visibleDialogCreate" title="Создание поста">
      <CreatePostForm @hideCreatePostFormDialog="hideCreatePostFormDialog"/>
    </Dialog>
    <main>
      <div class="posts">
        <PostList :posts="postsStore.getFilterByCategoryPosts" @deletePost="deletePost" :search="filterStore.search"/>
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
</style>
