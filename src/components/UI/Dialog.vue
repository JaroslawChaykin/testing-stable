<template>
  <div v-if="show" class="dialog" @click="hideDialog">
    <div class="dialog-content" @click.stop>
      <div class="header" v-if="title">
        <span>{{title}}</span>
        <span class="close">X</span>
      </div>

      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>

.header {
  border-bottom: 1px solid #DAE2ED;
  color: #303740;
  padding: 5px;
  font-family: sans-serif;
  display: flex;
  justify-content: space-between;
}

.close {
  transform: rotateX(45deg);
}

.content {
  padding: 20px;
}

.dialog {
  margin: 0;
  padding: 0;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog-content {
  margin: auto;
  background: #ffffff;
  border-radius: 4px;
  min-height: 50px;
  min-width: 50px;
}

</style>