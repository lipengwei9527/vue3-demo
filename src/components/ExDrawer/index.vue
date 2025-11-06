<template>
  <div class="ex-drawer">
    <el-drawer v-model="modelValue" :direction="direction"> </el-drawer>
  </div>
</template>
<script name="ExDrawer" setup lang="ts">
import { useVModel } from "@vueuse/core";
import { PropType } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<"rtl" | "ltr" | "ttb" | "btt">,
    default: () => "rtl",
  },
});
const emits = defineEmits<{
  (e: "update:value"): void;
}>();
const modelValue = useVModel(props, "modelValue", emits);
</script>
<style lang="scss" scoped></style>
