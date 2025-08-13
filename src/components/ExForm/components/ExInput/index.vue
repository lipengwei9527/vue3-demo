<template>
  <div class="ex-input">
    <el-input v-model="modelValue"></el-input>
  </div>
</template>
<script name="ExInput" setup lang="ts">
import { useVModel } from "@vueuse/core";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  config: { type: Object, default: () => ({}) },
});
const modelValue = useVModel(props, "modelValue", emits);
</script>
<style lang="scss" scoped></style>
