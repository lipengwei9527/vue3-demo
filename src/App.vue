<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 切换主题
import useTheme from "@/hooks/useTheme";
useTheme();
</script>
<style lang="scss" scoped></style>
