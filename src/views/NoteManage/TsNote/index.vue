<template>
  <div class="ts-note">
    ts笔记
    <div class="round round-one"></div>
    <div class="round round-two"></div>
    <div class="round round-three"></div>
    <div>v-for循环对象：(value,key,index) in obj</div>
    <div v-for="(value, key, index) in obj">
      {{ value }}-{{ key }}-index{{ index }}
    </div>
    <div>v-for循环数组：(value, key) in arr</div>
    <div v-for="(value, key) in arr">value{{ value }}-key{{ key }}</div>
    <Rotate />
  </div>
</template>
<script name="TsNote" setup lang="ts">
import Rotate from "./components/Rotate.vue";
const obj = {
  key1: "value1",
  key2: "value2",
};
const arr = ["a", "b"];
</script>
<style lang="scss" scoped>
.round {
  width: 200px;
  height: 200px;
  margin: 20px;
  border-radius: 50%;
  background: #00b4c8;
}

.round-one {
  clip-path: polygon(0% 0%, 25% 0%, 50% 50%, 0% 25%);
}

.round-two {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%, 0% 25%);
}
</style>
