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
  queryConfig: [
    { label: "label1", defaultValue: "value1", compsName: "ExInput" },
    { label: "label2", defaultValue: "value2", compsName: "ExInput" },
    { label: "label3", defaultValue: "value3", compsName: "ExInput" },
    // { label: "label4", value: "value4", compsName: "ExInput" },
    // { label: "label5", value: "value5", compsName: "ExInput" },
  ],
  maxHeight: 500,
  columns: [
    { prop: "name", label: "姓名" },
    { prop: "age", label: "年龄" },
  ],
});
const handleClick = () => {
  tabPage.openTab({
    path: "/CreateFormPage/123",
    params: { a: 1, b: 2 },
  });
};
</script>
<style lang="scss" scoped></style>
