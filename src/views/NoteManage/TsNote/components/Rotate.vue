<template>
  <h3>旋转</h3>
  <el-button @click="rotateFn">旋转</el-button>
  <i ref="icon" class="iconfont icon-left"></i>
</template>
<script name="Rotate" setup lang="ts">
import { ref } from "vue";
const rotateDeg = ref(0);
const icon = ref();
const rotateFn = () => {
  if (rotateDeg.value > 0) {
    rotateDeg.value = 0;
  } else {
    rotateDeg.value = 180;
  }
  icon.value.style.setProperty("--deg", rotateDeg.value + "deg");
};
</script>
<style lang="scss" scoped>
.icon-left {
  position: relative;
}
.icon-left::before {
  transition: 0.4s;
  position: absolute;
  transform: rotate(var(--deg, 0deg));
}
</style>
