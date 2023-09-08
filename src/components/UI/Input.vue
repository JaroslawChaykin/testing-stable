<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input" :placeholder="placeholder">
</template>

<script>
export default {
  name: "Input",
  props: {
    modelValue: [String, Number],
    placeholder: String
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  background: #F3F6F9;
  border: 1px solid #DAE2ED;
  border-radius: 2px;
  padding: 4px 25px;
  color: #303740;
}
</style>