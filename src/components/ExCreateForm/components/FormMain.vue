<template>
  <div class="form-main">
    <ExForm
      v-model:formConfig="formCfg"
      @select="selectFn"
      @click="clickFn"
    ></ExForm>
  </div>
</template>
<script name="FormMain" setup lang="ts">
import { PropType, ref } from "vue";
import { DiyContainerType, DiyFormItemType } from "@/types/components";
const props = defineProps({
  formConfig: {
    type: Array as PropType<DiyContainerType[]>,
    required: true,
  },
});
const emits = defineEmits<{
  (e: "update:formConfig"): void;
  (e: "click", value: DiyContainerType | DiyFormItemType): void;
  (e: "select", value: DiyContainerType | DiyFormItemType): void;
}>();
// const formCfg = useVModel(props, "formConfig", emits);
const formCfg = ref<DiyContainerType[]>(props.formConfig);
const clickFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("click", item);
};
const selectFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("click", item);
};
</script>
<style lang="scss" scoped>
.form-main {
  grid-area: form-main;
  padding: 10px;
  background-color: var(--ex-main-bg-color);
  border-radius: 5px;
  overflow: auto;
  .ex-form {
    height: 100%;
    overflow: auto;
  }
}
</style>
