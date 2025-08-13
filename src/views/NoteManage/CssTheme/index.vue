<template>
  <div class="css-theme">
    <el-select v-model="theme">
      <el-option
        :value="item.value"
        v-for="item in options"
        :label="item.label"
      ></el-option>
    </el-select>
    <div>主题：</div>
    <div>亮色主题：yellow</div>
    <i class="iconfont icon-a-068_baojianpin"></i>
    <div>暗色主题：blue</div>
    <img :src="login_img" alt="" />
    <el-button @click="fun1(1)">你好</el-button>
  </div>
</template>
<script name="CssTheme" setup lang="ts">
// 切换主题
import useTheme from "@/hooks/useTheme";
import { reactive } from "vue";
import login_img from "@/imgs/login_background.png";
import { throttle } from "@/utils/general";
const options = reactive([
  { label: "跟随系统主题", value: "os" },
  { label: "亮色主题", value: "light" },
  { label: "暗色主题", value: "dark" },
]);
const theme = useTheme();
const fun1 = throttle(function func(value?: any) {
  console.log("value:" + value);
});
</script>
<style lang="scss" scoped></style>
