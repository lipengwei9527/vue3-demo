<template>
  <div class="main-comp-item" ref="mainCompItem">
    <div v-for="item in list" class="base-form-item">
      <div>{{ item.label }}</div>
      <MainCompItem v-model:list="item.children"></MainCompItem>
    </div>
  </div>
</template>
<script name="MainCompItem" setup lang="ts">
import { computed, PropType, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import { useVModel } from "@vueuse/core";
const mainCompItem = ref();
type A = {
  label: string;
  type: string;
  children?: A[];
};
const props = defineProps({
  list: {
    type: Array as PropType<A[]>,
  },
});
const emits = defineEmits<{
  (e: "update:list", value: A[]): void;
}>();
const list = useVModel(props, "list", emits);
useDraggable(mainCompItem, list, {
  group: "ai",
  ghostClass: "ghost",
  dragClass: "drag",
  animation: 100,
});
</script>
<style lang="scss" scoped></style>
