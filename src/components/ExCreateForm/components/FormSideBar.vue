<template>
  <div class="form-side-bar">
    <div class="ctrls-container" v-for="item in ctrls">
      <h4 class="title">{{ item.title }}</h4>
      <BaseCtrls v-model:ctrls="item.ctrls"></BaseCtrls>
    </div>
  </div>
</template>
<script name="FormSideBar" setup lang="ts">
import { defineProps, PropType } from "vue";
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
</style>
