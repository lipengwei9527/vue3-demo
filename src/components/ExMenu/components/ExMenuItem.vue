<template>
  <el-menu-item ref="elMenuItemRef" :index="props.index">
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </el-menu-item>
</template>
<script name="ExMenuItem" setup lang="ts">
import { useSlots } from "vue";
const props = defineProps({
  index: {
    type: String,
  },
});
const slots = useSlots();
</script>
<style lang="scss" scoped></style>
