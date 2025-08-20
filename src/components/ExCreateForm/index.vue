<template>
  <div class="ex-create-form">
    <el-button @click="getP">获取参数</el-button>
    <el-button @click="closeFn">关闭页面</el-button>
  </div>
</template>
<script name="ExCreateForm" setup lang="ts">
import { CreateTabPage } from "@/utils/dealRoute";
const tabPage = new CreateTabPage("formConfig");
const params = tabPage.getParams();
console.log(`output->params`, params);
const getP = () => {
  const p = tabPage.getParams();
  console.log(`output->p`, p);
};
const closeFn = () => {
  tabPage.closeTab();
};
// addEventListener("unload", () => {
//   tabPage.closeTab();
// });
</script>
<style lang="scss" scoped>
@use "./scss";
</style>
