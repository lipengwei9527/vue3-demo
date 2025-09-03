<template>
  <div class="cfg-context">
    <div class="label">ID:</div>
    <div class="context unchange">{{ modelCfg.id }}</div>
    <div class="label">字段:</div>
    <div class="context">
      <el-input v-model="modelCfg.compCfg.value"></el-input>
    </div>
    <div class="label">标签名:</div>
    <div class="context"><el-input v-model="modelCfg.label"></el-input></div>
  </div>
</template>
<script name="DiyInputCfg" setup lang="ts">
import { PropType } from "vue";
import { useVModel } from "@vueuse/core";
import { DiyFormItemType } from "@/types/components";
const props = defineProps({
  compConfig: {
    type: Object as PropType<DiyFormItemType>,
    default: () => ({}),
  },
});
const emits = defineEmits<{
  (e: "update:compConfig", value: DiyFormItemType): void;
}>();
const modelCfg = useVModel(props, "compConfig", emits);
</script>
<style lang="scss" scoped></style>
