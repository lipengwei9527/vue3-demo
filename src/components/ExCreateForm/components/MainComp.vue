<template>
  <div class="main-comp"></div>
</template>
<script name="MainComp" setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
// useDraggable()
const list = ref([{ title: "标题1", type: "container" }]);
</script>
<style lang="scss" scoped></style>
