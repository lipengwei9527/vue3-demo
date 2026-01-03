<template>
  <div class="page">
    <el-button type="primary" @click="show = !show">
      {{ disabled ? "禁用" : "启用" }}</el-button
    >
    <ExContextMenu :disabled="disabled" :list="list[0]" @select="selectFn">
      <template #default="{ open }">
        <div @contextmenu="open" class="box box1">
          <ExContextMenu @select="selectFn" :list="list[1]">
            <template #default="{ open }">
              <div @contextmenu="open" class="box box2"></div>
            </template>
          </ExContextMenu>
        </div>
      </template>
    </ExContextMenu>
    <ExContextMenu @beforeClose="beforeCloseFn" :list="list[2]">
      <template #default="{ open }">
        <div @contextmenu="open" class="box box3"></div>
      </template>
    </ExContextMenu>

    <!-- 新左键菜单 -->
    <div class="container">
      <div class="box box1" v-contextMenu="newList[0]"></div>
      <div class="box box2" v-contextMenu="newList[1]"></div>
      <div class="box box3" v-contextMenu="newList[2]"></div>
    </div>
  </div>
</template>

<script setup name="ContextMenuPage" lang="ts">
import { ExContextMenuItem } from "@/types/components";
import { ref } from "vue";
let newList: ExContextMenuItem[][] = [];
for (let key = 0; key < 3; key++) {
  newList[key] = [];
  for (let i = 0; i < 10; i++) {
    // newList[key][i] = {};
    newList[key][i] = {
      label: "菜单" + (String(key) + i),
      value: String(key) + i,
    };
    if (i == 4) {
      newList[key][i].disabled = true;
    }
    if (i == 5) {
      newList[key][i].bottomBorder = true;
    }
  }
}
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
  // justify-content: flex-end;
  flex-direction: column;
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
.container {
  display: flex;
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
}
</style>
