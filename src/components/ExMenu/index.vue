<template>
  <div class="ex-menu">
    <el-menu
      :default-openeds="defaultOpeneds"
      :default-active="defaultActive"
      :collapse="collapse"
      :mode="mode"
      @select="selectFn"
      @open="openFn"
      @close="closeFn"
    >
      <template v-for="item in data">
        <ExSubMenu
          v-if="
            item.children &&
            Array.isArray(item.children) &&
            item.children.length != 0
          "
          :data="item"
        >
        </ExSubMenu>
        <ExMenuItem v-else :index="item.index">
          {{ item.title }}
        </ExMenuItem>
      </template>
    </el-menu>
  </div>
</template>
<script name="ExMenu" setup lang="ts">
import { PropType } from "vue";
import ExSubMenu from "./components/ExSubMenu.vue";
import ExMenuItem from "./components/ExMenuItem.vue";
import { useAppStore } from "@/store/app";
const props = defineProps({
  data: {
    type: Array as PropType<any>,
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
  type: {
    type: String as PropType<MenuType>,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["select"]);
const appStore = useAppStore();
const selectFn = (index: string, indexPaths: string[]) => {
  if (props.type) appStore.setActive(props.type, index);
  emit("select", index, indexPaths);
};
const openFn = (index: string) => {
  if (props.type) appStore.addOpeneds(props.type, index);
};
const closeFn = (index: string) => {
  if (props.type) appStore.removeOpeneds(props.type, index);
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
