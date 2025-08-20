<template>
  <div class="form-page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <!-- <ExForm></ExForm> -->
  </div>
</template>
<script name="FormPage" setup lang="ts">
import { CreateTabPage } from "@/utils/dealRoute";
const tabPage = new CreateTabPage("formConfig");
const handleClick = () => {
  tabPage.openTab({
    url: "/CreateFormPage/123",
    params: { a: 1, b: 2 },
  });
};
</script>
<style lang="scss" scoped></style>
