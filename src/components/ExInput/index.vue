<template>
  <div class="ex-input">
    <el-input v-model="model" v-bind="props.config"></el-input>
    <label class="label">{{ props.config.label }}</label>
  </div>
</template>
<script name="ExInput" setup lang="ts">
import { useVModel } from "@vueuse/core";
import { type QueryConfigType } from "@/components/ExTable/tableConfig";
import { type PropType } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  config: {
    type: Object as PropType<QueryConfigType>,
    default: () => ({}),
  },
});
const emits = defineEmits<{
  (e: "update:modelValue", value: QueryConfigType): void;
}>();
const model = useVModel(props, "modelValue", emits);
</script>
<style lang="scss" scoped>
.label {
  color: #999;
  position: absolute;
  pointer-events: none;
  height: 18px;
  line-height: 18px;
  left: 0;
  top: 0;
  background-color: #fff;
  translate: 0 -50%;
}
</style>
