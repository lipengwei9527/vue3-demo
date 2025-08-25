<template>
  <div class="main-comp" ref="mainComp">
    <MainCompItem v-model:list="list"></MainCompItem>
  </div>
</template>
<script name="MainComp" setup lang="ts">
import { computed, PropType, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import MainCompItem from "./MainCompItem.vue";
const list = ref([
  {
    label: "标题1",
    type: "container",
    children: [
      { label: "标题3", type: "container" },
      { label: "标题4", type: "container" },
    ],
  },
  { label: "标题2", type: "container" },
]);
</script>
<style lang="scss" scoped></style>
