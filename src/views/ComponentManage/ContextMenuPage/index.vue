<template>
  <div class="context-menu-page">
    <ExContextMenu :list="list[0]" @select="selectFn">
      <div class="box box1">
        <ExContextMenu @select="selectFn" :list="list[1]">
          <div class="box box2"></div>
        </ExContextMenu>
      </div>
    </ExContextMenu>
    <ExContextMenu @beforeClose="beforeCloseFn" :list="list[2]">
      <div class="box box3"></div>
    </ExContextMenu>
    <ExDialog
      v-model:visiable="visiable"
      @beforeClose="dialogBeforeCloseFn"
    ></ExDialog>
  </div>
  <el-button @click="visiable = true">打开弹窗</el-button>
  <el-button @click="visiable = false">关闭弹窗</el-button>
</template>

<script setup name="ContextMenuPage" lang="ts">
import { ref } from "vue";
const visiable = ref(false);
const beforeCloseFn = (item: any, fn: () => void) => {
  console.log("beforeCloseFn", item, fn);
  fn();
};
const dialogBeforeCloseFn = () => {};
const selectFn = (item: any) => {
  menu.value = item;
  console.log("选择了菜单", item);
};
type Value = { label: string; value: string };
let list: Value[][] = [];
let menu = ref([]);
for (let key = 0; key < 3; key++) {
  list[key] = [];
  for (let i = 0; i < 10; i++) {
    // list[key][i] = {};
    list[key][i] = {
      label: "菜单" + (String(key) + i),
      value: String(key) + i,
    };
  }
}
</script>

<style lang="scss" scoped>
.context-menu-page {
  display: flex;
  justify-content: flex-end;
}
.box {
  width: 200px;
  height: 200px;
  margin: 10px;
}
.box1 {
  width: 400px;
  height: 400px;
  background-color: rgb(random(255), random(255), random(255));
}
.box2 {
  background-color: rgb(random(255), random(255), random(255));
}
.box3 {
  background-color: rgb(random(255), random(255), random(255));
}
</style>
