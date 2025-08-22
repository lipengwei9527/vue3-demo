<template>
  <div class="ex-create-form">
    <div class="top-container"></div>
    <ExSideBar></ExSideBar>
    <div class="main"></div>
    <div class="foot"></div>
  </div>
</template>
<script name="ExCreateForm" setup lang="ts">
import { CreateTabPage } from "@/utils/dealRoute";
import ExSideBar from "./components/ExSideBar.vue";
const tabPage = new CreateTabPage("formConfig");
const params = tabPage.getParams();
console.log(`output->params`, params);
const getParams = () => {
  const p = tabPage.getParams();
  console.log(`output->p`, p);
};
const closeFn = () => {
  tabPage.closeTab();
};
</script>
<style lang="scss" scoped>
@use "./scss/index.scss";
</style>
