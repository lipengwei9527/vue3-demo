<template>
  <div class="form-page">
    <el-button type="primary" @click="handleClick">新增</el-button>
    <ExForm></ExForm>
  </div>
</template>
<script name="FormPage" setup lang="ts">
import { getEgg } from "@/axios/egg";
const handleClick = () => {
  getEgg();
};
</script>
<style lang="scss" scoped></style>
