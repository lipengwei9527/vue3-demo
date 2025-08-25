<template>
  <div class="diy-container">
    <h3>
      {{ config?.title }}
    </h3>
  </div>
</template>
<script name="ExContainer" setup lang="ts">
import { defineProps, PropType } from "vue";
import { DiyContainerType } from "@/types/components";
const props = defineProps({
  config: {
    type: Object as PropType<DiyContainerType>,
  },
});
</script>
<style lang="scss" scoped>
.drag-handler {
  cursor: move;
}
</style>
