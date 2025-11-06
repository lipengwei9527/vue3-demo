<template>
  <div class="ex-menu">
    <el-menu
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
      :collapse="collapse"
      :mode="mode"
      :unique-opened="true"
      @select="selectFn"
      @open="openFn"
      @close="closeFn"
    >
      <template v-for="item in data" :key="item.index + item.title">
        <ExSubMenu
          v-if="item.children && item.children.length != 0"
          :data="item"
        >
        </ExSubMenu>
        <el-menu-item v-else :index="item.index">{{ item.title }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script name="ExMenu" setup lang="ts">
import { PropType } from "vue";
import ExSubMenu from "./components/ExSubMenu.vue";
import type { ExMenuItemType } from "@/types/store";
defineProps({
  data: {
    type: Array as PropType<ExMenuItemType[]>,
    required: true,
    default: () => [],
  },
  defaultActive: {
    type: String,
    default: "",
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => [] as string[],
  },
  mode: {
    type: String as PropType<"horizontal" | "vertical">,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  (e: "select", index: string, indexPaths: string[]): void;
  (e: "open", index: string, indexPaths: string[]): void;
  (e: "close", index: string, indexPaths: string[]): void;
}>();
/**
 * 选择函数
 *
 * @param index 当前选中的索引值
 * @param indexPaths 索引路径数组
 * @returns 无返回值
 */
const selectFn = (index: string, indexPaths: string[]) => {
  emit("select", index, indexPaths);
};
const openFn = (index: string, indexPaths: string[]) => {
  emit("open", index, indexPaths);
};
const closeFn = (index: string, indexPaths: string[]) => {
  emit("close", index, indexPaths);
};
</script>
<style lang="scss" scoped>
.ex-menu {
  overflow-y: auto;
  user-select: none;
  .el-menu {
    height: 100%;
  }
}
</style>
