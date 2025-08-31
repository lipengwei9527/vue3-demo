<template>
  <div class="ex-form">
    <!-- :model="formData" -->
    <el-form class="form-container" ref="formContainer">
      <!-- @submit.prevent="submitFn" -->
      <DiyContainer v-model:config="formCfg"></DiyContainer>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { PropType } from "vue";
import type { DiyContainerType } from "@/types/components";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  formConfig: Object as PropType<DiyContainerType[]>,
  default: () => [{ config: [] }],
});
const emits = defineEmits<{
  (e: "update:formConfig"): void;
}>();
const formCfg = useVModel(props, "formConfig", emits);
// type FormData = Record<string, any>;

// const emitChangeFn = (e: any) => {
//   console.log(`output->change`, e);
// };
// const submitFn = () => {
//   console.log(`output->提交`, formData);
// };
</script>
<style lang="scss" scoped>
.ex-form {
  height: 100%;
  overflow: auto;
}
</style>
