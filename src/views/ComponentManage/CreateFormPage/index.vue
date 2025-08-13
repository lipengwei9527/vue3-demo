<template>
  <div class="create-form-page">
    <el-button @click="handleCreateForm" type="primary">创建表单</el-button>
    <!-- <ex-create-form></ex-create-form> -->
  </div>
</template>
<script name="CreateFormPage" setup lang="ts">
2;
import { useCustomRouter } from "@/utils/dealRoute";
const { goBack } = useCustomRouter();
const handleCreateForm = () => {
  goBack();
};
</script>
<style lang="scss" scoped></style>
