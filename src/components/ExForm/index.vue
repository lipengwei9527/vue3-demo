<template>
  <div class="ex-form">
    <!-- :model="formData" -->
    <el-form disabled class="form-container" ref="formContainer">
      <!-- @submit.prevent="submitFn" -->
      <DiyContainer
        v-model:config="formCfg"
        @click="clickFn"
        @select="selectFn"
      ></DiyContainer>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { PropType } from "vue";
import type { DiyContainerType, DiyFormItemType } from "@/types/components";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  formConfig: Object as PropType<DiyContainerType[]>,
  default: () => [{ config: [] }],
});
const emits = defineEmits<{
  (e: "update:formConfig"): void;
  (e: "click", value: DiyContainerType | DiyFormItemType): void;
  (e: "select", value: DiyContainerType | DiyFormItemType): void;
}>();
const formCfg = useVModel(props, "formConfig", emits);
const clickFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("click", item);
};
const selectFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("select", item);
};
</script>
<style lang="scss" scoped>
.ex-form {
  // height: 100%;
  overflow: auto;
}
</style>
