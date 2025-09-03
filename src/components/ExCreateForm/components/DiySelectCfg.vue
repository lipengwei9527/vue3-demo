<template>
  <div class="cfg-context">
    <div class="label">ID:</div>
    <div class="context unchange">{{ modelCfg?.id }}</div>
    <div class="label">标题:</div>
    <div class="context">{{ modelCfg?.label }}</div>
    <div class="label">字段名:</div>
    <div class="context">{{ modelCfg?.label }}</div>
  </div>
</template>
<script name="DiySelectCfg" setup lang="ts">
import { PropType } from "vue";
import { useVModel } from "@vueuse/core";
import { DiyFormItemType } from "@/types/components";
const props = defineProps({
  compConfig: {
    type: Object as PropType<DiyFormItemType>,
    required: true,
  },
});
const emits = defineEmits<{
  (e: "update:compConfig", value: DiyFormItemType): void;
}>();
const modelCfg = useVModel(props, "compConfig", emits);
</script>
<style lang="scss" scoped></style>
