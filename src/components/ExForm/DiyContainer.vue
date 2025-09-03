<template>
  <div class="diy-container" ref="diyContainer">
    <div
      class="container-item"
      v-for="(item, _index) in config"
      :key="item.id"
      @click.stop="clickContainerFn(item)"
    >
      <ExContextMenu
        class="full-line"
        @select="selectContextFn(item)"
        :list="[{ label: item.typeName + item.id, value: item.type }]"
      >
        <template v-if="item.type == 'DiyContainer'">
          <h3 class="title">{{ item.label }}</h3>
        </template>
        <template v-if="item.type != 'DiyContainer'">
          <el-form-item
            :class="{ 'full-line': item.isFullLine }"
            :label="item.label"
            :prop="item.prop"
          >
            <component :is="item.type" :config="item.compCfg"></component>
          </el-form-item>
        </template>
        <template v-if="item.type == 'DiyContainer'">
          <DiyContainer
            v-model:config="item.config"
            @click="clickContainerFn"
            @select="selectContextFn"
          >
          </DiyContainer>
        </template>
      </ExContextMenu>
    </div>
  </div>
</template>
<script name="DiyContainer" setup lang="ts">
import { PropType, ref } from "vue";
import { useVModel } from "@vueuse/core";
import { useDraggable } from "vue-draggable-plus";
import { DiyContainerType, DiyFormItemType } from "@/types/components";
/**
 * @description 点击一个容器或者表单项
 */
const clickContainerFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("click", item);
};
/**
 * 左键点击容器或表单组件
 */
const selectContextFn = (item: DiyContainerType | DiyFormItemType) => {
  emits("select", item);
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
  (e: "click", value: DiyContainerType | DiyFormItemType): void;
  (e: "select", value: DiyContainerType | DiyFormItemType): void;
}>();
const conCfg = useVModel(props, "config", emits);
const diyContainer = ref();
useDraggable(diyContainer, conCfg, {
  animation: 200,
  group: "main",
});
</script>
<style lang="scss" scoped>
.ex-context-menu {
  display: block;
}
.diy-container {
  //容器交换需要鼠标在容器上，padding扩大容器让鼠标能够放到容器上
  // padding: 20px 0; //必须的属性
  padding-bottom: 20px;
  grid-column: 1 / -1;

  .container-item {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 1 / -1;
    border: 1px dashed blue;
    :deep(.el-form-item) {
      .el-form-item__content {
        * {
          width: 100%;
        }
      }
    }
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
