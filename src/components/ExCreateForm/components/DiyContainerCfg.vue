<template>
  <div class="cfg-context">
    <div class="label">ID:</div>
    <div class="context unchange">{{ modelCfg.id }}</div>
    <div class="label">标题:</div>
    <div class="context">{{ modelCfg.label }}</div>
  </div>
</template>
<script name="DiyContainerCfg" setup lang="ts">
import { PropType } from "vue";
import { useVModel } from "@vueuse/core";
import { DiyContainerType } from "@/types/components";
const props = defineProps({
  compConfig: {
    type: Object as PropType<DiyContainerType>,
    required: true,
  },
});
const emits = defineEmits<{
  (e: "update:compConfig", value: DiyContainerType): void;
}>();
const modelCfg = useVModel(props, "compConfig", emits);
</script>
<style lang="scss" scoped></style>
