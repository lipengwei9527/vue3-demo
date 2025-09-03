<template>
  <div class="form-top-bar">
    <h3 style="padding-right: 10px">表单名称:</h3>
    <h3><el-input size="large" v-model="modelForm.name"></el-input></h3>
  </div>
</template>
<script name="FormTopBar" setup lang="ts">
import { PropType } from "vue";
import { ExFormConfigType } from "@/types/components";
import { useVModel } from "@vueuse/core";
const props = defineProps({
  form: {
    type: Object as PropType<ExFormConfigType>,
    default: () => ({}),
  },
});
const emits = defineEmits<{
  (e: "update:form", value: ExFormConfigType): void;
}>();
const modelForm = useVModel(props, "form", emits);
</script>
<style lang="scss" scoped>
.form-top-bar {
  grid-area: form-top-bar;
  padding: 15px 10px;
  background-color: var(--ex-main-bg-color);
  border-bottom: 1px solid var(--ex-menu-border-color);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  h3 {
    span {
      width: 120px;
    }
  }
}
</style>
