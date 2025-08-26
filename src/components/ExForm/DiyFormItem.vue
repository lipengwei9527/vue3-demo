<template>
  <div class="diy-form-item" ref="diyFormItem">
    <el-form-item v-if="config" :prop="config.prop" :label="config.label">
      <component
        :is="config.compCfg.type"
        :compCfg="config.compCfg"
      ></component>
    </el-form-item>
  </div>
</template>
<script name="DiyFormItem" setup lang="ts">
import { defineProps, defineEmits, ref, PropType } from "vue";
import { DiyFormItemType } from "@/types/components";
import { useVModels } from "@vueuse/core";
const props = defineProps({
  config: {
    type: Object as PropType<DiyFormItemType>,
    // required: true,
  },
});
// const emits = defineEmits<{
//   (e: "update:config", value: DiyFormItemType): void;
// }>();
// const { config } = useVModels(props, emits);
// const diyFormItem = ref();
</script>
<style lang="scss" scoped>
.diy-form-item {
  border: 1px dashed blue;
}
</style>
