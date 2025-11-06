<template>
  <ElConfigProvider :locale="zhCn">
    <router-view></router-view>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { watch } from "vue";
import { useMagicKeys } from "@vueuse/core";

// 切换主题
import useTheme from "@/hooks/useTheme";
const { ctrl_k } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key.toLowerCase() == "k" && e.type == "keydown") {
      e.preventDefault();
    }
  },
});

watch(ctrl_k, (v) => {
  if (!v) return;
  console.log("搜索");
});
useTheme();
</script>
<style lang="scss" scoped></style>
