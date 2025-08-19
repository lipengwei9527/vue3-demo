<template>
  <div class="ex-sub-menu">
    <el-sub-menu :index="data.index" v-if="Object.keys(data).length != 0">
      <template #title>{{ data.title }}</template>
      <template v-for="item in data.children">
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
          <template #title> {{ item.title }} </template>
        </ExMenuItem>
      </template>
    </el-sub-menu>
  </div>
</template>
<script name="ExSubMenu" setup lang="ts">
import { PropType } from "vue";
import ExMenuItem from "@/components/ExMenu/components/ExMenuItem.vue";
import type { ExMenuItemType } from "@/types/store";
defineProps({
  data: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped></style>
