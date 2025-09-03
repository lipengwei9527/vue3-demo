<template>
  <div class="form-config">
    <h4>配置</h4>
    <!-- 容器组件 -->
    <component
      :is="comps[compConfig.type]"
      v-bind="{ compConfig:
      compConfig.type == 'DiyContainer' 
        ? compConfig as DiyContainerType 
        : compConfig as DiyFormItemType}"
    ></component>
    <!-- 其他组件配置 -->
    <!-- <component
      v-if="compConfig.type != 'DiyContainer'"
      :is="comps[compConfig.type]"
      v-bind="{ compConfig: compConfig as DiyFormItemType}"
    ></component> -->
  </div>
</template>
<script name="FormConfig" setup lang="ts">
import { PropType } from "vue";
import { useVModel } from "@vueuse/core";
import DiyContainerCfg from "./DiyContainerCfg.vue";
import DiyInputCfg from "./DiyInputCfg.vue";
import DiySelectCfg from "./DiySelectCfg.vue";
import DiyDatePickerCfg from "./DiyDatePickerCfg.vue";
import {
  DiyContainerType,
  DiyFormItemType,
  UnionCtrlType,
} from "@/types/components";
const comps: { [P in UnionCtrlType]: any } = {
  DiyContainer: DiyContainerCfg,
  DiyInput: DiyInputCfg,
  DiySelect: DiySelectCfg,
  DiyDatePicker: DiyDatePickerCfg,
};

const props = defineProps({
  compConfig: {
    type: Object as PropType<DiyContainerType | DiyFormItemType>,
    default: () => ({}),
  },
});
// const emits = defineEmits<{
//   (e: "update:compConfig", value: DiyContainerType | DiyFormItemType): void;
// }>();
// const modelCfg = useVModel(props, "compConfig", emits);
</script>
<style lang="scss" scoped>
.form-config {
  grid-area: form-config;
  border-left: 1px solid var(--ex-menu-border-color);
  background-color: var(--ex-side-bar-bg-color);
  padding: 10px;
  h4 {
    margin-bottom: 10px;
  }
  :deep(.cfg-context) {
    display: grid;
    grid-template-columns: 4fr 7fr;
    gap: 5px 5px;
    .label {
      user-select: none;
      text-align: right;
      padding-right: 10px;
      border: 1px solid var(--ex-menu-border-color);
      box-shadow: 1px 2px 3px -2px rgb(163, 164, 167);
    }
    .context {
      box-shadow: 1px 2px 3px -2px rgb(163, 164, 167);
    }
    .unchange {
      cursor: not-allowed;
      background-color: var(--ex-bgc-un-allow);
      color: #7f8c8d;
    }
  }
}
</style>
