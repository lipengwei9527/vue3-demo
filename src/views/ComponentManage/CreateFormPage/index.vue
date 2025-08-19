<template>
  <div class="create-form-page">
    <el-button type="primary" @click="handleClick">新增表单</el-button>
    <!-- <ExCreateForm></ExCreateForm>
    <ExForm></ExForm> -->
  </div>
</template>
<script name="CreateFormPage" setup lang="ts">
const handleClick = () => {
  console.log("新增按钮被点击");
  // 这里可以添加逻辑，比如打开一个新页面或弹出一个表单
};
</script>
<style lang="scss" scoped></style>
