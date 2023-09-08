<template>
  <select :value="active" class="select" @change="changeCategory">
    <option selected disabled value="">Выбирите категорию</option>
    <option v-for="option in options" :value="option">{{ option }}</option>
  </select>
</template>

<script>
export default {
  name: "Select",
  props: {
    active: String,
    options: [String]
  },
  methods: {
    changeCategory(e) {
      this.$emit('changeCategory', e.target.value)
    }
  }
}
</script>

<style scoped>
.select {
  background: #F3F6F9;
  border: 1px solid #DAE2ED;
  border-radius: 2px;
  padding: 4px 25px;
  color: #303740;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;
}
</style>