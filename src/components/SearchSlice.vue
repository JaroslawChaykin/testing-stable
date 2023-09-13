<template>
  <span v-for="slice in searchSplitter">
    <span class="highlight" v-if="slice.includes(separatorStart) && slice.includes(separatorEnd)">
      {{slice.slice(separatorStartLength).slice(0, -separatorEndLength)}}
    </span>
    <span v-else>{{slice}}</span>
  </span>
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
      const reg = new RegExp(`${this.separatorStart}+[^.]+${this.separatorEnd}`, 'g')
      const separator = '=+* *+='

      const replaced = this.text.replaceAll(reg, (textS) => {
        return separator + textS + separator
      })

      return replaced.split(separator)
    },
    separatorStartLength() {
      return this.separatorStart.length
    },
    separatorEndLength() {
      return this.separatorEnd.length
    },
  }
}
</script>

<style scoped>
.highlight {
  background: #6e8ab6;
  border-radius: 2px;
  padding: 1px 2px;
}
</style>