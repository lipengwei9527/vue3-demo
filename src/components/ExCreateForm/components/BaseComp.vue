<template>
  <div class="base-comp" ref="baseComp">
    <BaseCompItem
      v-for="(item, index) in list"
      :index="index"
      :data="item"
    ></BaseCompItem>
  </div>
</template>
<script name="BaseComp" setup lang="ts">
import useExCreateFormStore from "@/store/exCreateForm";
import BaseCompItem from "./BaseCompItem.vue";
import { computed } from "vue";
const store = useExCreateFormStore();
const list = computed(() => {
  return store.compList;
});
</script>
<style lang="scss" scoped></style>
