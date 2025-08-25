<template>
  <div class="ex-form">
    <el-form
      class="form-container"
      ref="formContainer"
      :model="formData"
      scroll-to-error
      @submit.prevent="submitFn"
    >
      <div class="form-item-container" v-for="(item, index) in formConfig">
        <DiyContainer
          v-if="item.type == 'DiyContainer'"
          :config="item"
        ></DiyContainer>
        <div :class="['drag-form-item-' + (index + 1)]">
          <el-form-item
            v-for="formItem in item.config"
            class="ex-form-item"
            :prop="formItem.field"
            :class="[formItem.isFullLine && 'full-line']"
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
      </div>
    </el-form>
    <!-- <div class="ex-form-btn">
      <el-button @click="submitFn" type="primary">提交</el-button>
    </div> -->
  </div>
</template>
<script name="ExForm" setup lang="ts">
import { reactive, ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
import type { DiyConfigType, DiyContainerType } from "@/types/components";
// import { setExFormItemClass, addSelf } from "./util";
type FormData = Record<string, any>;
import cfg from "./config";
const formConfig = ref<DiyContainerType[]>(cfg.config);
const formContainer = ref(null);
// 容器拖拽功能
useDraggable(formContainer, formConfig, {
  animation: 200,
  handle: ".diy-container",
});
// 容器中的表单项相互之间的拖拽，不同容器之间也可以拖拽
for (let index = 0; index < formConfig.value.length; index++) {
  useDraggable(
    `.drag-form-item-${index + 1}`,
    ref(formConfig.value[index].config),
    {
      animation: 200,
      group: "form-item",
      // 拖拽结束时触发的事件
      onEnd: (ev) => {
        console.log(`拖拽结束`, ev);
      },
    }
  );
}
// const
// useDraggable(`.form-container`, formConfig.value[0].config, {
//   animation: 200,
// });
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
const formData = reactive(configToFormData(cfg.config));
const emitChangeFn = (e: any) => {
  console.log(`output->change`, e);
};
const submitFn = () => {
  console.log(`output->提交`, formData);
};
</script>
<style lang="scss" scoped></style>
