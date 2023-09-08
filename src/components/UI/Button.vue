<template>
  <button :class="{
    'btn': true,
    'danger': danger
  }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    danger: Boolean
  }
}
</script>

<style scoped>
  .btn {
    background: #F3F6F9;
    border: 1px solid #DAE2ED;
    border-radius: 2px;
    padding: 4px 25px;
    color: #303740;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .btn.danger:hover {
    color: white;
    background: #d99494;
    border: 1px solid #b66e6e;
  }
  .btn[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .btn:hover {
    color: white;
    background: #94b6d9;
    border: 1px solid #6e8ab6;
  }
</style>