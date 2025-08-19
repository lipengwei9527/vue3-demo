<template>
  <div class="form-page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <!-- <ExForm></ExForm> -->
  </div>
</template>
<script name="FormPage" setup lang="ts">
import { CreateTab } from "@/utils/dealRoute";
const { openTab } = CreateTab();
const handleClick = () => {
  openTab({
    name: "CreateFormPage",
    path: "/form/CreateFormPage",
    params: { a: 1342 },
  });
};
</script>
<style lang="scss" scoped></style>
