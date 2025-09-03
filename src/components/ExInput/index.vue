<template>
  <div class="ex-input">
    <el-input v-model="model"></el-input>
  </div>
</template>
<script name="ExInput" setup lang="ts">
import { useVModel } from "@vueuse/core";
import { QueryConfigType } from "@/components/ExTable/tableConfig";
import { PropType, ref } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  config: {
    type: Object as PropType<QueryConfigType>,
    default: () => ({}),
  },
});
const cfg = ref({ ...props.config });
const emits = defineEmits<{
  (e: "update:modelValue", value: QueryConfigType): void;
}>();
const model = useVModel(props, "modelValue", emits);
</script>
<style lang="scss" scoped></style>
