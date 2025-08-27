<template>
  <div class="ctrls" ref="ctrlsRef">
    <div class="ctrl-item" v-for="item in ctrls" :key="item.id">
      {{ item.label }}
    </div>
  </div>
</template>
<script name="BaseCtrls" setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import {
  BaseCtrlsType,
  CtrlType,
  DiyContainerType,
  DiyFormItemType,
} from "@/types/components";
import { getInitCompData, CompsCfg } from "../compsData";

const props = defineProps({
  ctrls: {
    type: Array as PropType<CtrlType[]>,
  },
});
const emits = defineEmits<{
  (e: "update:ctrls", value: CtrlType[]): void;
}>();
const list = useVModel(props, "ctrls", emits);
const ctrlsRef = ref(null);
const allInitCompData = getInitCompData() as CompsCfg;
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
    return allInitCompData[type]() as unknown as CtrlType;
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
