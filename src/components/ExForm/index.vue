<template>
  <div class="ex-form">
    <el-form
      class="form-container"
      :model="formData"
      scroll-to-error
      @submit.prevent="submitFn"
    >
      <div class="form-item-container" v-for="item in formConfig">
        <DiyContainer
          v-if="item.type == 'DiyContainer'"
          :config="item"
        ></DiyContainer>
        <el-form-item
          v-for="formItem in item.config"
          class="ex-form-item"
          :prop="formItem.field"
          :class="{ 'full-line': formItem.isFullLine }"
          :label="`${formItem.label}:`"
        >
          <component
            class="ex-form-comp"
            :is="formItem.type"
            v-bind="{ config: formItem, formData }"
            @change="emitChangeFn($event)"
          ></component>
        </el-form-item>
      </div>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { reactive } from "vue";
import { DiyConfigType, DiyContainerType } from "@/types/components";
type FormData = Record<string, any>;
import cfg from "./config";
const formConfig = reactive<DiyContainerType[]>(cfg.config);
// 获取表单配置项中的formDate及其默认值
const configToFormData = (
  configData: (DiyContainerType | DiyConfigType)[]
): FormData => {
  let obj: FormData = {};
  configData.forEach((item) => {
    if (item.type != "DiyContainer") {
      obj[item.field] = item.value;
    } else if (item.config) {
      obj = Object.assign(obj, configToFormData(item.config));
    } else {
      return obj;
    }
  });
  return obj;
};
const formData = reactive(configToFormData(formConfig));

const emitChangeFn = (e: any) => {
  console.log(`output->change`, e);
};
const submitFn = () => {
  console.log(`output->提交`, formData);
};
</script>
<style lang="scss" scoped></style>
