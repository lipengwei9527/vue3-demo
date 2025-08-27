<template>
  <div class="diy-container" ref="diyContainer">
    <div class="container-item" v-for="(item, _index) in config" :key="item.id">
      <h3 v-if="item.type == 'DiyContainer'" class="title">{{ item.title }}</h3>
      <el-form-item
        v-if="item.type == 'DiyFormItem'"
        :label="item.label"
        :prop="item.prop"
      >
        <component :is="item.compCfg.type" :config="item.compCfg"></component>
      </el-form-item>
      <DiyContainer
        v-if="item.type == 'DiyContainer'"
        v-model:config="item.config"
      >
      </DiyContainer>
    </div>
  </div>
</template>
<script name="DiyContainer" setup lang="ts">
import { defineProps, computed, defineEmits, PropType, ref } from "vue";
import { useVModel, useVModels } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import { DiyContainerType, DiyFormItemType } from "@/types/components";
import { ElForm, FormItemProps } from "element-plus";
const props = defineProps({
  config: {
    type: Array as PropType<(DiyContainerType | DiyFormItemType)[]>,
    // required: true,
  },
  formData: Object,
});
const emits = defineEmits<{
  (e: "update:config", value: DiyContainerType[]): void;
}>();
const conCfg = useVModel(props, "config", emits);
const diyContainer = ref();
useDraggable(diyContainer, conCfg, {
  animation: 200,
  group: "main",
  // handle: ".title",
  onStart(value) {
    // console.log("diyContainer:start", value);
  },
  onEnd(value) {
    // console.log("diyContainer:end", value);
  },
});
</script>
<style lang="scss" scoped>
.diy-container {
  //容器交换需要鼠标在容器上，padding扩大容器让鼠标能够放到容器上
  padding: 20px 0; //必须的属性
  // border: 1px dashed red;
  margin: 10px;
  .container-item {
    border: 1px dashed blue;
    // margin: 10px;
  }
  .title {
    user-select: none;
    cursor: move;
  }
}
</style>
