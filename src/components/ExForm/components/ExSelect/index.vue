<template>
  <div class="ex-select">
    <el-select v-model="modelValue">
      <el-option
        v-for="item in config.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </div>
</template>
<script name="ExSelect" setup lang="ts">
import { useVModel } from "@vueuse/core";
const emits = defineEmits(["update:modelValue", "update:config"]);
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: "",
  },
  config: { type: Object, default: () => ({}) },
});
const modelValue = useVModel(props, "modelValue", emits);
const config = useVModel(props, "config", emits);
</script>
<style lang="scss" scoped></style>
