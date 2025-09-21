<template>
  <div class="page">
    <el-button type="primary" @click="show = !show">
      {{ disabled ? "禁用" : "启用" }}</el-button
    >
    <ExContextMenu :disabled="disabled" :list="list[0]" @select="selectFn">
      <div class="box box1">
        <ExContextMenu @select="selectFn" :list="list[1]">
          <div class="box box2"></div>
        </ExContextMenu>
      </div>
    </ExContextMenu>
    <ExContextMenu @beforeClose="beforeCloseFn" :list="list[2]">
      <div class="box box3"></div>
    </ExContextMenu>
  </div>
</template>

<script setup name="ContextMenuPage" lang="ts">
import { ExContextMenuItem } from "@/types/components";
import { ref } from "vue";
const show = ref(false);
const disabled = ref(false);
const beforeCloseFn = (item: any, fn: () => void) => {
  console.log("beforeCloseFn", item, fn);
  fn();
};
const selectFn = (item: any) => {
  menu.value = item;
  console.log("选择了菜单", item);
};
let list: ExContextMenuItem[][] = [];
let menu = ref([]);
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
.page {
  display: flex;
  justify-content: flex-end;
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
