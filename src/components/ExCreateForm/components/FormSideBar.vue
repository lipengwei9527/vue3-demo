<template>
  <div class="form-side-bar">
    <div class="ctrls-container" v-for="item in ctrls">
      <h4 class="title">{{ item.title }}</h4>
      <BaseCtrls v-model:ctrls="item.ctrls"></BaseCtrls>
    </div>
  </div>
</template>
<script name="FormSideBar" setup lang="ts">
import { PropType } from "vue";
import BaseCtrls from "./BaseCtrls.vue";
import { Ctrls } from "../compsData";
defineProps({
  ctrls: {
    type: Array as PropType<Ctrls>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.form-side-bar {
  padding: 10px;
  .title {
    margin: 10px;
  }
}
// .base-comp-item {
//   user-select: none;
//   h4 {
//     margin: 10px 0;
//   }
//   .label-box {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     grid-auto-rows: min-content;
//     gap: 5px;
//     padding: 0 5px;
//     .label-item {
//       border: 1px solid var(--ex-border-color);
//       text-align: center;
//       cursor: move;
//       padding: 3px 5px;
//     }
//   }
// }
</style>
