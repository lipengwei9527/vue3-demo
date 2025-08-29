<template>
  <div class="context-container" ref="targetRef">
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
          v-if="isShow"
          class="menu"
          :style="{
            width: pos.width,
            left: pos.posX,
            top: pos.posY,
          }"
        >
          <div class="item" v-for="item in list" @click="select(item)">
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
  Ref,
  onMounted,
} from "vue";
import useViewPort from "@/hooks/useViewPort";
import { useVModel } from "@vueuse/core";
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
  (e: "select", value: List[0]): void;
  (e: "close", value: boolean): void;
}>();
const modelShow = useVModel(props, "isShow", emits);
const select = (item: List[0]) => {
  emits("select", item);
};
let mouseX = ref(0);
let mouseY = ref(0);
const openContextMenu = (e: PointerEvent) => {
  e.preventDefault();
  // e.stopPropagation();
  // console.log("e", e);
  // return;
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
  modelShow.value = true;
};

// 浏览器可视区域的宽和高
let { vw, vh } = useViewPort();

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
const close = () => {
  modelShow.value = false;
};
onMounted(() => {
  targetRef.value.addEventListener("contextmenu", openContextMenu);
  addEventListener("click", close, true);
  addEventListener("contextmenu", close, true);
});

onBeforeUnmount(() => {
  targetRef.value.removeEventListener("contextmenu", openContextMenu);
  removeEventListener("click", close, true);
  removeEventListener("contextmenu", close, true);
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
.context-container {
  padding: 20px;
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
