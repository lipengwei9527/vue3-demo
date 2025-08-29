<template>
  <div class="ctrls" ref="ctrlsRef">
    <div class="ctrl-item" v-for="item in ctrls" :key="item.id">
      {{ item.typeName }}
      <slot></slot>
    </div>
  </div>
</template>
<script name="BaseCtrls" setup lang="ts">
import { defineProps, defineEmits, defineSlots, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import type {
  CtrlType,
  DiyContainerType,
  DiyFormItemType,
} from "@/types/components";
import { getInitCompData } from "../compsData";
// const slots = defineSlots();
// console.log("slots", Object.keys(slots));
const props = defineProps({
  ctrls: {
    type: Array as PropType<(DiyContainerType | DiyFormItemType)[]>,
  },
});
const emits = defineEmits<{
  (e: "update:ctrls", value: (DiyContainerType | DiyFormItemType)[]): void;
}>();
const list = useVModel(props, "ctrls", emits);
const ctrlsRef = ref(null);
useDraggable(ctrlsRef, list, {
  animation: 200,
  group: {
    name: "main",
    pull: "clone",
    put: false,
  },
  sort: false,
  clone(ctrl) {
    const type = ctrl.type;
    return getInitCompData(type);
  },
});
</script>
<style lang="scss" scoped>
// 递归组件最底层的组件的样式
.ctrls {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  .ctrl-item {
    // grid-column: 1 / -1;
    cursor: move;
    user-select: none;
    text-align: center;
    padding: 3px;
    border: 1px solid red;
  }
}
</style>
