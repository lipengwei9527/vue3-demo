<template>
  <div class="ex-form-item" ref="exFormItem">
    <div v-for="(item, index) in formConfig" :key="index">
      <ExFormItem></ExFormItem>
    </div>
  </div>
</template>
<script name="ExFormItem" setup lang="ts">
import { ref, defineProps, PropType, defineEmits } from "vue";
import { useDraggable } from "vue-draggable-plus";
import { useVModel, useVModels } from "@vueuse/core";
import {} from "@/types/components";
// import formConfig from "./config";
const props = defineProps({
  // dragList: {
  //   type: Array as PropType<ExFormDragType[]>,
  // },
  formConfig: {
    type: Array,
    // required: true,
  },
  formData: {
    type: Object,
    // required: true,
  },
});
const emits = defineEmits<{
  (e: "update:list", value: A[]): void;
}>();
const formConfig = useVModel(props, "formConfig", emits);
// const dragList = useVModel(props, "dragList", emits);
const exFormItem = ref();
useDraggable(exFormItem, formConfig, {
  group: "ai",
  ghostClass: "ghost",
  dragClass: "drag",
  animation: 100,
});
</script>
<style lang="scss" scoped></style>
