<template>
  <div class="form">
    <div class="form-name">
      <Input type="text" v-model="value" placeholder="Название поста"/>
      <Button @click="createPost" :disabled="buttonValidate">Добавить</Button>
    </div>
    <div class="warning" v-if="newCategoryValue && valueSelect">
      У прописанной категории приоритет выше чем у выбранной.
    </div>
    <div class="category">
      <Input type="text" v-model="newCategoryValue" placeholder="Создать категорию"/>
      или
      <Select :value="valueSelect" :options="categoryStore.categories" @changeCategory="takeCategory"/>
    </div>
  </div>
</template>

<script>
import Select from "@/components/UI/Select.vue";
import {usePostsStore} from "@/store/PostsStore";
import {useCategoryStore} from "@/store/CategoryStore";

export default {
  name: "CreatePostForm",
  components: {Select},
  data() {
    return {
      value: '',
      valueSelect: '',
      newCategoryValue: '',
      categoryStore: useCategoryStore()
    }
  },
  methods: {
    createPost() {
      if (this.value.length >= 5 && (this.valueSelect.length || this.newCategoryValue)) {
        const category = this.newCategoryValue ? this.newCategoryValue : this.valueSelect;

        if (this.newCategoryValue) {
          this.categoryStore.createCategory(category)
        }

        usePostsStore().createPost({
          id: new Date(),
          title: this.value,
          category,
        })

        this.$emit('hideCreatePostFormDialog', true)
        this.clearForm()
      }
    },
    takeCategory(value) {
      this.valueSelect = value;
    },
    clearForm() {
      this.value = '';
      this.valueSelect = '';
      this.newCategoryValue = '';
    }
  },
  computed: {
    buttonValidate() {
      return this.value.length < 5 || !(this.valueSelect || this.newCategoryValue)
    }
  }
}
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .form-name {
    display: flex;
    gap: 10px;
  }
  .form-name button {
    width: 100%;
  }
  .category {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .warning {
    margin-top: 15px;
    font-size: 12px;
    color: red;
  }
</style>