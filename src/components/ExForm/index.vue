<template>
  <div class="ex-form">
    <!-- :model="formData" -->
    <el-form class="form-container" ref="formContainer">
      <!-- @submit.prevent="submitFn" -->
      <DiyContainer v-model:config="containerCfg"></DiyContainer>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { reactive, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import type {
  DiyFormItemType,
  DiyContainerType,
  ExFormConfigType,
} from "@/types/components";
import { getInitCompData } from "../ExCreateForm/compsData";
type FormData = Record<string, any>;
import cfg from "./config";
const conCfg = getInitCompData("DiyContainer");
const containerCfg = ref<DiyContainerType[]>([conCfg as DiyContainerType]);

const emitChangeFn = (e: any) => {
  console.log(`output->change`, e);
};
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
