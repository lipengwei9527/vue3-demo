<template>
  <slot></slot>
  <teleport to="body" v-if="modelShow">
    <div
      v-if="modelShow"
      class="menu"
      :style="{
        width: pos.width,
        top: pos.posY,
        left: pos.posX,
      }"
      v-size-ob="handleSizeChange"
    >
      <div v-for="item in list">
        <div class="menu-item" @click="selectFn(item)">
          {{ item.label }}
        </div>
      </div>
    </div>
  </teleport>
</template>
<script name="contextMenu" setup lang="ts">
import { PropType, ref, computed, onBeforeUnmount, onMounted } from "vue";
import useViewPort from "@/hooks/useViewPort";
import { DoneFn } from "@/types/elementPlus";
import { allProps } from "@/utils/guard";
import { ExContextMenuItem } from "@/types/components";
// 自定义指令
import vSizeOb from "../sizeOb";
const props = defineProps({
  // 挂载左键菜单的dom
  el: {
    type: HTMLElement as PropType<HTMLElement>,
  },
  // 是否禁用菜单
  disabled: {
    type: Boolean,
  },
  num: {
    // type: Number,
  },
  // 菜单数据
  list: {
    type: Array as PropType<ExContextMenuItem[]>,
  },
  // 菜单宽度
  width: {
    type: Number,
    default: 200,
  },
});
const emits = defineEmits<{
  (e: "select", value: ExContextMenuItem): void;
  (e: "close", value: boolean): void;
  (e: "beforeClose", item: ExContextMenuItem, value: DoneFn): void;
}>();
// 绑定左键菜单的dom
const targetRef = ref(props.el);
// 原dom上绑定的左键菜单事件
// let oldContextMenu = null;
const modelShow = ref(false);
const eventRes = allProps(["onBeforeClose", "onSelect"]);
// 触发一次beforeClose事件flag置为true，调用一次beforeFn置为false
let isHidden = ref<boolean | undefined>(false);
let mouseX = ref(0);
let mouseY = ref(0);
// 菜单宽高
let w = ref(0);
let h = ref(0);
/**
 * @description beforeClose事件传递的函数
 * @param hidden
 */
const beforeFn = (hidden?: boolean) => {
  if (props.disabled) return;
  isHidden.value = hidden;
  closeFn();
};
/**
 * @description 点击菜单项
 * @param item 菜单项数据
 */
const selectFn = (item: ExContextMenuItem) => {
  if (item.disabled) return;
  // 点击左键菜单外的其他部分
  if (!item) {
    closeFn();
    return;
  }
  // 是否有关闭前的其他操作
  if (eventRes.find((item) => item.name == "onBeforeClose")?.result) {
    isHidden.value = true;
    emits("beforeClose", item, beforeFn);
    return;
  }
  emits("select", item);
  closeFn();
};
/**
 * @description 关闭菜单
 */
const closeFn = () => {
  if (isHidden.value || props.disabled) return;
  removeEventListener("click", closeFn, true);
  removeEventListener("contextmenu", closeFn, true);
  modelShow.value = false;
};

/**
 * @description 打开菜单
 * @param
 */
const openContextMenu = (e: MouseEvent) => {
  // oldContextMenu && oldContextMenu();
  // 禁用左键菜单
  if (props.disabled) return;
  e.preventDefault();
  e.stopPropagation();
  // 同步监听全局click和contextMenu事件
  // 除本身外的其他菜单全部关闭
  addEventListener("click", closeFn);
  addEventListener("contextmenu", closeFn, true);
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  modelShow.value = true;
};

// 浏览器可视区域的宽和高
let { vw, vh } = useViewPort();
/**
 *@description 确定菜单在可视区域的什么位置渲染
 */
const pos = computed(() => {
  // 菜单左上角所处位置
  let posX = mouseX.value;
  let posY = mouseY.value;
  let width = props.width > w.value ? props.width : w.value;
  let height = h.value;
  // 视口宽度-鼠标位置>菜单宽度，菜单位置左移
  if (vw.value - mouseX.value < width) {
    posX = mouseX.value - width;
  }
  // 视口高度-鼠标高度<菜单高度，菜单上移
  if (vh.value - mouseY.value < height) {
    posY = mouseY.value - height;
  }
  return {
    width: width + "px",
    height: height + "px",
    posX: posX + "px",
    posY: posY + "px",
  };
});

onMounted(() => {
  // oldContextMenu = targetRef.value?.oncontextmenu;
  targetRef.value?.addEventListener("contextmenu", openContextMenu);
});
onBeforeUnmount(() => {
  closeFn();
});

function handleSizeChange(rect: Rect) {
  const { offsetWidth, offsetHeight } = rect;
  w.value = offsetWidth;
  h.value = offsetHeight;
}
</script>
<style lang="scss" scoped>
$bgColor: #f1f1f1;
.menu {
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #c9c6c6;
  padding: 5px 0;
  border-radius: 7px;
  box-shadow: 1px 3px 10px -2px rgb(163, 164, 167);
  overflow: hidden;
  box-sizing: border-box;
  .menu-item {
    cursor: pointer;
    padding: 3px 5px;
    user-select: none;
    overflow: hidden;
    margin: 3px 0;
    &:hover {
      background-color: $bgColor;
      opacity: 0.8;
    }
  }
  .ban {
    background-color: $bgColor;
    opacity: 0.8;
    cursor: not-allowed;
  }
  .item-border {
    margin: 5px 0;
    border-bottom: 1px solid #74b9ff;
  }
}
</style>
