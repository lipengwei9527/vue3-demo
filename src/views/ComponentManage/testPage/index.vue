<template>
  <div class="page">
    <ExDialog
      v-model:visiable="visiable"
      @beforeClose="dialogBeforeCloseFn"
    ></ExDialog>
    <el-button @click="visiable = true">打开弹窗</el-button>
    <el-button @click="visiable = false">关闭弹窗</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const visiable = ref(false);
const dialogBeforeCloseFn = () => {};
</script>

<!-- <template>
  <div class=""></div>
</template>
<script name="" setup lang="ts"></script>
<style lang="scss" scoped></style> -->
