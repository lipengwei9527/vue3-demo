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

<style lang="scss" scoped></style>
