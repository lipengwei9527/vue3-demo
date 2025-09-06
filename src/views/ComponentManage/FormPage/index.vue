<template>
  <div class="page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <ExTable v-model="tableConfig"></ExTable>
  </div>
</template>
<script name="FormPage" setup lang="ts">
import { CreateTabPage } from "@/utils/dealRoute";
import { createTableConfig } from "@/components/ExTable/tableConfig";
const tabPage = new CreateTabPage("formConfig");
const tableConfig = createTableConfig({
  height: 550,
});
const handleClick = () => {
  tabPage.openTab({
    path: "/CreateFormPage/123",
    params: { a: 1, b: 2 },
  });
};
</script>
<style lang="scss" scoped></style>
