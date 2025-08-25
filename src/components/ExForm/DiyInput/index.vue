<template>
  <div class="diy-input">
    <el-input v-model="modelValue"></el-input>
  </div>
</template>
<script name="DiyInput" setup lang="ts">
import { useVModel } from "@vueuse/core";
import { ExInputType } from "@/types/components";
import { PropType } from "vue";
const props = defineProps({
  value: {
    type: [String, Number],
  },
});
const emits = defineEmits<(e: "update:value") => void>();
const modelValue = useVModel(props, "value", emits);
</script>
<style lang="scss" scoped></style>
