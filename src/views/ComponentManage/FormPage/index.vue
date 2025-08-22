<template>
  <div class="form-page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <ExSideBar></ExSideBar>
  </div>
</template>
<script name="FormPage" setup lang="ts">
import ExSideBar from "@/components/ExCreateForm/components/ExSideBar.vue";
import { CreateTabPage } from "@/utils/dealRoute";
const tabPage = new CreateTabPage("formConfig");
const handleClick = () => {
  tabPage.openTab({
    path: "/CreateFormPage/123",
    params: { a: 1, b: 2 },
  });
};
</script>
<style lang="scss" scoped></style>
