<template>
  <div class="ex-context-menu" ref="targetRef">
    <slot></slot>
    <Teleport to="body">
      <Transition
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
        name="fade"
        mode="out-in"
      >
        <div
          v-size-ob="handleSizeChange"
          v-if="modelShow"
          class="menu"
          :style="{
            width: pos.width,
            left: pos.posX,
            top: pos.posY,
          }"
        >
          <div class="item" v-for="item in list" @click="selectFn(item)">
            {{ item.label }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<script name="ExContentMenu" setup lang="ts">
import {
  defineProps,
  PropType,
  ref,
  computed,
  onBeforeUnmount,
  onMounted,
} from "vue";
import useViewPort from "@/hooks/useViewPort";
import { useVModel } from "@vueuse/core";
import { DoneFn } from "@/types/elementPlus";
import { allProps } from "@/utils/guard";
type List = ({ label: string; value: any } & Record<string, any>)[];
const props = defineProps({
  isShow: {
    type: Boolean,
  },
  list: {
    type: Array as PropType<List>,
  },

  width: {
    type: Number,
    default: 200,
  },
});
const emits = defineEmits<{
  (e: "update:isShow", value: boolean): void;
  (e: "select", value: List[number]): void;
  (e: "close", value: boolean): void;
  (e: "beforeClose", item: List[number], value: DoneFn): void;
}>();
const modelShow = props.isShow ? useVModel(props, "isShow", emits) : ref(false);

const eventRes = allProps(["onBeforeClose", "onSelect"]);
// 触发一次beforeClose事件flag置为true，调用一次beforeFn置为false
let isHidden = ref<boolean | undefined>(false);
/**
 * @description beforeClose事件传递的函数
 * @param cancel
 */
const beforeFn = (hidden?: boolean) => {
  isHidden.value = hidden;
  closeFn();
};
/**
 * @description 被菜单项、window的click和contextMenu事件监听
 */
const selectFn = (item: List[number]) => {
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
  // 选中菜单并立即关闭
  // if (eventRes.find((item) => item.name == "onSelect")) {
  //   emits("select", item);
  //   closeFn();
  //   return;
  // }
};
/**
 * 关闭菜单
 */
const closeFn = () => {
  if (isHidden.value) return;
  removeEventListener("click", closeFn, true);
  removeEventListener("contextmenu", closeFn, true);
  modelShow.value = false;
};
let mouseX = ref(0);
let mouseY = ref(0);
/**
 * @description 打开菜单
 * @param
 */
const openContextMenu = (e: PointerEvent) => {
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
const targetRef = ref();

onMounted(() => {
  targetRef.value?.addEventListener("contextmenu", openContextMenu);
});

onBeforeUnmount(() => {
  targetRef.value?.removeEventListener("contextmenu", openContextMenu);
  closeFn();
});
// 菜单高度
let h = ref(0);
let w = ref(0);
function handleSizeChange(rect: Parameters<Rect>[0]) {
  const { width, height } = rect;
  w.value = width;
  h.value = height;
}
// 元素加入到页面之前
function handleBeforeEnter(el: Element) {
  if (!(el instanceof HTMLElement)) return;
  el.style.height = "0";
}
// 元素加入到页面之后
function handleEnter(el: Element) {
  if (!(el instanceof HTMLElement)) return;
  el.style.height = "auto";
  const height = el.clientHeight;
  h.value = height;
  // el.style.height = "0";
  // requestAnimationFrame(() => {
  //   el.style.height = height + "px";
  //   el.style.transition = "0.3s";
  // });
}
// 离开之后
function handleAfterEnter(el: any) {
  el.style.transition = "none";
}
</script>
<style lang="scss" scoped>
.ex-context-menu {
  display: inline-block;
}
.menu {
  position: fixed;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #c9c6c6;
  padding: 5px;
  border-radius: 7px;
  box-shadow: 1px 3px 10px -2px rgb(163, 164, 167);
  overflow: hidden;
  box-sizing: border-box;
  .item {
    cursor: pointer;
    padding: 3px;
    border-radius: 3px;
    user-select: none;
    &:hover {
      background-color: #c9ccd0;
      opacity: 0.8;
    }
  }
}
</style>
