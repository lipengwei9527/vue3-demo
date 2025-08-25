<template>
  <div class="diy-container" ref="diyContainer">
    <div class="container-item" v-for="item in config" :key="item.id">
      <div v-if="item.type == 'DiyContainer'">{{ item.title }}</div>
      <DiyContainer
        v-if="item.type == 'DiyContainer'"
        v-model:config="item.config"
      >
      </DiyContainer>
      <!-- <DiyFormItem></DiyFormItem> -->
    </div>
  </div>
</template>
<script name="DiyContainer" setup lang="ts">
import { defineProps, defineOptions, defineEmits, PropType, ref } from "vue";
import { useVModel, useVModels } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import { DiyContainerType, DiyConfigType } from "@/types/components";
const props = defineProps({
  config: {
    type: Array as PropType<(DiyContainerType | DiyConfigType)[]>,
  },
  formData: Object,
});
const emits = defineEmits<{
  (e: "update:config", value: DiyContainerType): void;
}>();
const config = useVModel(props, "config", emits);
const diyContainer = ref();
useDraggable(diyContainer, config, {
  // animation: 200,
  group: "diyContainerGroup",
});
</script>
<style lang="scss" scoped>
.diy-container {
  border: 1px dashed red;
  padding: 20px;
  margin: 10px;
}
</style>
