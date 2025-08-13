<template>
  <div class="ex-form">
    <el-form class="form-container" @submit.prevent="submitFn">
      <template v-for="item in formConfig">
        <el-form-item
          :prop="item.id"
          :rules="item.rules"
          class="ex-form-item"
          :class="{ 'full-line': item.fullLine }"
          :label="`${item.label}:`"
        >
          <component
            class="ex-form-content"
            :is="item.name"
            v-model="formData[item.field]"
            v-bind="{ config: item }"
            @change="emitChangeFn($event)"
          />
        </el-form-item>
      </template>
    </el-form>
    <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div>
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { reactive } from "vue";
import cfg from "./config";
type DefaultFormData = Record<
  (typeof cfg.formConfig)[number]["field"], //key
  (typeof cfg.formConfig)[number]["defaultValue"] //value
>;
const formConfig = reactive(cfg.formConfig);
const formData = reactive(
  cfg.formConfig.reduce((pre, cur) => {
    pre[cur.field] = cur.defaultValue;
    return pre;
  }, {} as DefaultFormData)
);
const emitChangeFn = (e: any) => {
  console.log(`output->change`, e);
};
const submitFn = () => {
  console.log(`output->提交`, formData);
};
</script>
<style lang="scss" scoped>
@use "./scss/index.scss";
</style>
