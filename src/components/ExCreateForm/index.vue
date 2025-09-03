<template>
  <div class="ex-create-form">
    <FormTopBar @click="clickFn" v-model:form="form"></FormTopBar>
    <FormSideBar :ctrls="ctrls"></FormSideBar>
    <FormMain :formConfig="cfg" @click="clickFn" @select="selectFn"></FormMain>
    <FormConfig v-model:compConfig="compConfig"></FormConfig>
    <FormFooter></FormFooter>
  </div>
</template>
<script name="ExCreateForm" setup lang="ts">
import { ref } from "vue";
import FormSideBar from "./components/FormSideBar.vue";
import FormTopBar from "./components/FormTopBar.vue";
import FormMain from "./components/FormMain.vue";
import FormFooter from "./components/FormFooter.vue";
import FormConfig from "./components/FormConfig.vue";
import { Ctrls, allCtrls, getInitCompData, autoId } from "./compsData";
import {
  ExFormConfigType,
  DiyContainerType,
  DiyFormItemType,
} from "@/types/components";
const ctrls = ref<Ctrls>(allCtrls);
// 侧边栏中控件初始化时使用了id，将id重置为0
autoId.cur = 0;
// 获取的表单全部信息
const form = ref<ExFormConfigType>({
  id: autoId.cur,
  name: "表单名称" + autoId.cur,
  type: "DiyForm",
  mode: "create",
  containerCfg: [], //表单的全部配置结果:cfg
});
// 表单的全部配置结果
const cfg = [getInitCompData("DiyContainer") as DiyContainerType];
// 默认显示的配置项
const compConfig = ref<DiyContainerType | DiyFormItemType>(cfg[0]);
const clickFn = (item: DiyContainerType | DiyFormItemType) => {
  compConfig.value = item;
};
const selectFn = (item: DiyContainerType | DiyFormItemType) => {
  console.log("selectFn:item", item);
};
</script>

<style lang="scss" scoped>
.ex-create-form {
  height: 100vh;
  background-color: var(--ex-layout-bgc);
  color: var(--ex-color-text);
  display: grid;
  grid-template-areas:
    "form-top-bar  form-top-bar form-top-bar"
    "form-side-bar form-main    form-config"
    "form-footer   form-footer  form-footer";
  grid-template-columns:
    minmax(250px, 2fr)
    minmax(300px, 7fr)
    minmax(300px, 2fr);
  grid-template-rows: auto 1fr auto;
}
.ghost {
  background-color: #eff1f3;
}
.drag {
  background-color: #def1f9;
}
</style>
