<template>
  <div class="form-side-bar">
    <BaseCtrls :ctrls="ctrlList"></BaseCtrls>
  </div>
</template>
<script name="FormSideBar" setup lang="ts">
import BaseCtrls from "./BaseCtrls.vue";
import { baseCtrls } from "../data";
import { ref } from "vue";
const ctrlList = ref(baseCtrls);
// const
</script>
<style lang="scss" scoped>
.form-side-bar {
  padding: 10px;
}
</style>
