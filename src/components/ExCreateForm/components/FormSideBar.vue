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
  grid-area: form-side-bar;
  border-right: 1px solid var(--ex-menu-border-color);
  background-color: var(--ex-side-bar-bg-color);
  padding: 10px;
  .title {
    margin: 10px;
  }
}
</style>
