<template>
  <div class="form-side-bar">
    <div class="ctrls-container" v-for="item in ctrlList">
      <h4 class="title">{{ item.title }}</h4>
      <BaseCtrls v-model:ctrls="item.ctrls"></BaseCtrls>
    </div>
  </div>
</template>
<script name="FormSideBar" setup lang="ts">
import { ref } from "vue";
import BaseCtrls from "./BaseCtrls.vue";
import { baseCtrls } from "../ctrlsData";
const ctrlList = ref(baseCtrls);
// const
</script>
<style lang="scss" scoped>
.form-side-bar {
  padding: 10px;
  .title {
    margin: 10px;
  }
}
</style>
