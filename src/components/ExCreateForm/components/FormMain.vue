<template>
  <div class="form-main">
    <ExForm v-model:formConfig="formCfg"></ExForm>
  </div>
</template>
<script name="FormMain" setup lang="ts">
import { PropType, ref } from "vue";
import { DiyContainerType } from "@/types/components";
const props = defineProps({
  formConfig: {
    type: Array as PropType<DiyContainerType[]>,
    required: true,
  },
});
// const emits = defineEmits<{
//   (e: "update:formConfig"): void;
// }>();
// const formCfg = useVModel(props, "formConfig", emits);
const formCfg = ref<DiyContainerType[]>(props.formConfig);
</script>
<style lang="scss" scoped>
.form-main {
  padding: 10px;
  background-color: var(--ex-main-bg-color);
  border-radius: 5px;
  overflow: auto;
}
.main-comp {
  display: grid;
  border: 1px solid red;
  grid-template-columns: 2 1fr;
  height: 100%;
  .base-form-item {
    margin: 10px 5px;
  }
}
</style>
