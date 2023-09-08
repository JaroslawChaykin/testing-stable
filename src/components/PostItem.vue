<template>
  <div class="item">
    <div>
      {{ title }}
      {{category}}
    </div>
    <div class="btns-item">
      <Button @click="$emit('deletePost', post.id)">Редактировать</Button>
      <Button @click="$emit('deletePost', post.id)" danger>Удалить</Button>
    </div>
  </div>
</template>

<script>

export default {
  name: "PostItem",
  props: {
    post: {
      id: Number,
      title: String,
      category: String
    },
    search: String
  },
  data() {
    return {
      title: this.post.title,
      category: this.post.category
    }
  },
}
</script>

<style scoped>
.btns-item {
  display: flex;
  gap: 10px;
}
.item {
  box-sizing: border-box;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #DAE2ED;
  border-radius: 4px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
}

span {
  background: red;
}
</style>