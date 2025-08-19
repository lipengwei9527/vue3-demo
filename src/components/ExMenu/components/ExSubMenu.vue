<template>
  <div class="ex-sub-menu">
    <el-sub-menu :index="data.index">
      <template #title>{{ data.title }}</template>
      <template v-for="item in data.children" :key="item.index + item.title">
        <ExSubMenu
          v-if="
            item.children &&
            Array.isArray(item.children) &&
            item.children.length != 0
          "
          :data="item"
        >
        </ExSubMenu>
        <el-menu-item v-else :index="item.index">{{ item.title }}</el-menu-item>
      </template>
    </el-sub-menu>
  </div>
</template>
<script name="ExSubMenu" setup lang="ts">
import { PropType } from "vue";
import type { ExMenuItemType } from "@/types/store";
defineProps({
  data: {
    type: Object as PropType<ExMenuItemType>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped></style>
