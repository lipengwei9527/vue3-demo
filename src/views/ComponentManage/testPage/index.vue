<template>
  <div class="page">
    <el-button @click="num++">测试</el-button>
    <div class="container">
      <div class="box box1" v-contextMenu="list[0]"></div>
      <div class="box box2" v-contextMenu="list[1]"></div>
      <div class="box box3" v-contextMenu="list[2]"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { ExContextMenuItem } from "@/types/components";
let num = ref(0);
let list: ExContextMenuItem[][] = [];
for (let key = 0; key < 3; key++) {
  list[key] = [];
  for (let i = 0; i < 10; i++) {
    // list[key][i] = {};
    list[key][i] = {
      label: "菜单" + (String(key) + i),
      value: String(key) + i,
    };
    if (i == 4) {
      list[key][i].disabled = true;
    }
    if (i == 5) {
      list[key][i].bottomBorder = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
.box {
  width: 200px;
  height: 200px;
  margin: 10px;
}
@for $i from 1 through 3 {
  .box#{$i} {
    @if $i == 1 {
      width: 400px;
      height: 400px;
    }
    background-color: rgb(random(255), random(255), random(255));
  }
}
</style>
