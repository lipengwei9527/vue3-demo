<template>
  <div
    class="base-ctrls"
    :class="{ floor: ctrls && ctrls[0].type != 'ctrlContainer' }"
    ref="baseCtrlsRef"
  >
    <div class="ctrl-container" v-for="item in ctrls" :key="item.id">
      <h4 v-if="item.type == 'ctrlContainer'" class="title">
        {{ item.title }}
      </h4>
      <div v-if="item.type != 'ctrlContainer'" class="ctrl-item">
        {{ item.label }}
      </div>
      <BaseCtrls
        v-if="item.type == 'ctrlContainer'"
        v-model:ctrls="item.ctrls"
      ></BaseCtrls>
    </div>
  </div>
</template>
<script name="BaseCtrls" setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import { BaseCtrlsType, CtrlsType } from "@/types/components";
const props = defineProps({
  ctrls: {
    type: Array as PropType<(BaseCtrlsType | CtrlsType)[]>,
  },
});
const emits = defineEmits<{
  (e: "update:ctrls", value: BaseCtrlsType[]): void;
}>();
const list = useVModel(props, "ctrls", emits);
const baseCtrlsRef = ref(null);
useDraggable(baseCtrlsRef, list, {
  animation: 200,
  group: "aaaa",
  // group: {
  //   name: "main",
  //   pull: "clone",
  //   put: false,
  // },
});
</script>
<style lang="scss" scoped>
// 所有递归组件的样式
.title {
  margin: 10px 0;
}
// 递归组件最底层的组件的样式
.floor {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  .ctrl-container {
    .ctrl-item {
      // grid-column: 1 / -1;
      cursor: move;
      user-select: none;
      text-align: center;
      padding: 3px;
      border: 1px solid red;
    }
  }
}
</style>
