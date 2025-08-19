<template>
  <div class="form-page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <!-- <ExForm></ExForm> -->
  </div>
</template>
<script name="FormPage" setup lang="ts">
import { CreateCustomRouter, CreateTab } from "@/utils/dealRoute";
// router.push()
const { navigateTo } = CreateCustomRouter();
const { openTab } = CreateTab();
const handleClick = () => {
  // navigateTo("/form/CreateFormPage");c
  openTab("CreateFormPage");
};
</script>
<style lang="scss" scoped></style>
