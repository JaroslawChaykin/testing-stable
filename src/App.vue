<script>
import Form from "@/components/Form.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {PostList, Form},
  data() {
    return {
      visibleDialogCreate: false,
      value: '',
      search: '',
      categoryFilter: '',
      posts: [],
      createFormSelectOptions: [],
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.visibleDialogCreate = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id)
    },
    showDialogCreatePost() {
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
    setCategory(categoryName) {
      this.createFormSelectOptions.push(categoryName)
    },
    setCategoryFilter(value) {
      if (this.categoryFilter === value) {
        this.categoryFilter = ''
      } else {
        this.categoryFilter = value;
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortBySearch() {
      return this.posts.filter(post => post.title.includes(this.search))
    },
    sortByCategory() {
      return this.sortBySearch.filter(post => {
        if(!this.categoryFilter) {
          return post
        }
        return post.category === this.categoryFilter
      })
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="btns">
      <Button @click="showDialogCreatePost">Создать пост</Button>
      <Button @click="fetchPosts">Загрузить посты</Button>
      <Input v-model="search"/>
    </div>
    <div class="categories">
      <span
          v-for="category in createFormSelectOptions"
          class="category"
          :class="{
            active: categoryFilter === category
          }"
          @click="setCategoryFilter(category)">{{ category }}</span>
    </div>
    <Dialog v-model:show="visibleDialogCreate" title="Создание поста">
      <Form @createPost="createPost" :selectOptions="createFormSelectOptions" @createCategory="setCategory"/>
    </Dialog>
    <main>
      <div class="posts">
        <PostList :posts="sortByCategory" @deletePost="deletePost" :search="search"/>
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
  padding: 4px;
}
.active {
  background: red;
}
</style>
