<template>
  <div class="diy-container" ref="diyContainer">
    <div class="container-item" v-for="(item, _index) in config" :key="item.id">
      <ExContextMenu @select="selectContext" :list="contextList">
        <h3 v-if="item.type == 'DiyContainer'" class="title full-line">
          {{ item.label }}
        </h3>
        <el-form-item
          :class="{ 'full-line': item.isFullLine }"
          v-if="item.type != 'DiyContainer'"
          :label="item.label"
          :prop="item.prop"
        >
          <component :is="item.type" :config="item.compCfg"></component>
        </el-form-item>
        <DiyContainer
          v-if="item.type == 'DiyContainer'"
          v-model:config="item.config"
        >
        </DiyContainer>
      </ExContextMenu>
    </div>
  </div>
</template>
<script name="DiyContainer" setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import { DiyContainerType, DiyFormItemType } from "@/types/components";
const contextList = [
  { label: "菜单1", value: "1" },
  { label: "菜单2", value: "2" },
];
/**
 * 左键点击容器或表单组件
 */
const selectContext = (item: any) => {
  console.log("带年纪", item);
};
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
  onStart(value) {
    console.log("diyContainer:start", value);
  },
  onEnd(value) {
    console.log("diyContainer:end", value);
  },
});
</script>
<style lang="scss" scoped>
.diy-container {
  //容器交换需要鼠标在容器上，padding扩大容器让鼠标能够放到容器上
  padding: 20px 0; //必须的属性
  // border: 1px dashed red;
  grid-column: 1 / -1;
  margin: 10px;
  .container-item {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 1 / -1;
    border: 1px dashed blue;
    // margin: 10px;
  }
  .title {
    user-select: none;
    cursor: move;
  }
  .full-line {
    grid-column: 1 / -1;
  }
}
</style>
