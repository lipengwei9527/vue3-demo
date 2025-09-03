<template>
  <div class="diy-input">
    <el-input v-model="props.value"></el-input>
  </div>
</template>
<script name="DiyInput" setup lang="ts">
// import { useVModel } from "@vueuse/core";
import { DiyInputType } from "@/types/components";
import { PropType } from "vue";
const props = defineProps({
  value: {
    type: [String, Number],
  },
  compCfg: {
    type: Object as PropType<DiyInputType>,
  },
});
</script>
<style lang="scss" scoped></style>
