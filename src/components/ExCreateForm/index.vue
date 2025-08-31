<template>
  <div class="ex-create-form">
    <FormTopBar></FormTopBar>
    <FormSideBar :ctrls="ctrls"></FormSideBar>
    <!-- <FormMain></FormMain> -->
    <FormMain :formConfig="cfg"></FormMain>
    <FormFooter></FormFooter>
  </div>
</template>
<script name="ExCreateForm" setup lang="ts">
import { ref } from "vue";
import FormSideBar from "./components/FormSideBar.vue";
import FormTopBar from "./components/FormTopBar.vue";
import FormMain from "./components/FormMain.vue";
import FormFooter from "./components/FormFooter.vue";
import { Ctrls, allCtrls, getInitCompData, autoId } from "./compsData";
import { DiyContainerType } from "@/types/components";
const ctrls = ref<Ctrls>(allCtrls);
autoId.cur = 0;
const cfg = [getInitCompData("DiyContainer") as DiyContainerType];
</script>

<style lang="scss" scoped>
.ex-create-form {
  height: 100vh;
  background-color: var(--ex-layout-bgc);
  color: var(--ex-color-text);
  display: grid;
  grid-template-areas:
    "form-top-bar form-top-bar"
    "form-side-bar form-main"
    "form-side-bar form-footer";
  grid-template-columns: minmax(180px, var(--ex-side-bar-width)) 1fr;
  grid-template-rows: auto 1fr auto;
  .form-top-bar {
    grid-area: form-top-bar;
  }
  .form-side-bar {
    grid-area: form-side-bar;
    border-right: 1px solid var(--ex-menu-border-color);
    background-color: var(--ex-side-bar-bg-color);
  }
  .form-main {
    grid-area: form-main;
  }
  .form-footer {
    grid-area: form-footer;
  }
}
.ghost {
  background-color: #eff1f3;
}
.drag {
  background-color: #def1f9;
}
.base-form-item {
  border: 2px solid var(--ex-menu-border-color);
}
</style>
