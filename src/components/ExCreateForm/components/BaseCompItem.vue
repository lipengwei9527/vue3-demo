<template>
  <div class="base-comp-item">
    <h4>{{ data.title }}</h4>
    <div class="label-box" :class="containerName">
      <div class="label-item" v-for="item in data.ctrls">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script name="BaseCompItem" setup lang="ts">
import { ref, PropType, watch } from "vue";
import { useDraggable } from "vue-draggable-plus";
import useExCreateFormStore from "@/store/exCreateForm";
import type { BaseCompCtrls } from "@/types/components";
const props = defineProps({
  data: {
    type: Object as PropType<BaseCompCtrls>,
    default: () => ({}),
  },
  index: {
    type: Number,
    required: true,
  },
});
const store = useExCreateFormStore();
// 拖拽容器名字
const containerName = "container" + props.index;
// pinia控件列表
const ctrls = ref(store.compList[props.index].ctrls);
watch(ctrls, () => {
  store.updateCtrls(props.index, ctrls.value);
});
useDraggable(`.${containerName}`, ctrls, {
  animation: 200,
  group: {
    name: "ai",
    pull: "clone",
    put: false,
  },
  sort: false,
  onStart() {
    console.log("start");
  },
  onUpdate() {
    console.log("update");
  },
});
</script>
<style lang="scss" scoped></style>
