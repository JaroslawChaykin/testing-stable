<template>
  <span>{{ text}}</span>
</template>

<script>
export default {
  name: "SearchSlice",
  props: {
    text: String,
    separatorStart: String,
    separatorEnd: String,
  },
  computed: {
    searchSplitter() {
      return this.text.split()
    }
  }
}
</script>

<style scoped>

</style>