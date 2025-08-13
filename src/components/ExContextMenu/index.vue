<template>
  <div ref="containerRef" class="ex-context-menu">
    <slot></slot>
    <Teleport to="body">
      <Transition
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
      >
        <div>
          <div
            v-size-ob="handleSizeChange"
            class="menu-list"
            v-if="showMenu"
            :style="{
              left: pos.posX + 'px',
              top: pos.posY + 'px',
            }"
          >
            <div
              class="menu-item"
              @click="handleMenuItem(item)"
              v-for="item in menu"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup name="ExContextMenu" lang="ts">
/**
 * 鼠标左键菜单组件
 * @param menu 参列表
 * @event select(item) 返回menu的item
 */
import { ref, computed, PropType } from "vue";
import useContextMenu from "@/hooks/useContextMenu";
import useViewPort from "@/hooks/useViewPort";
defineProps({
  menu: {
    type: Array as PropType<{ label: string }[]>,
    default: () => [],
  },
});
// 视口的宽和高
const { vw, vh } = useViewPort();
const containerRef = ref();
// x-鼠标点击位置距离视口左边的距离,y-鼠标点击位置距离视口顶部的距离,showMenu-是否显示菜单
const { x, y, showMenu } = useContextMenu(containerRef);
const emit = defineEmits(["select"]);
// 或者
// true-类型验证通过，false-类型验证失败
// const emit = defineEmits({
//   "select": (item: object) => {
//     if (Object.prototype.toString.call(item) === '[object Object]') {
//       return true
//     }
//     return false
//   }
// });
// 或者 有返回值
// const emit = defineEmits<{
//   (item: object): void
// }>();
// 或者 无返回值
// const emit = defineEmits<{ (item: object): void }>();

// 菜单的宽和高
const w = ref(0);
const h = ref(0);
function handleSizeChange(rect: Parameters<Rect>[0]) {
  const { width, height } = rect;
  w.value = width;
  h.value = height;
}
// 菜单最终显示位置
const pos = computed(() => {
  // posX,posY-菜单最终显示的x,y坐标
  let posX = x.value;
  let posY = y.value;
  // 视口宽度-鼠标位置>菜单宽度:菜单需要显示在鼠标左边
  if (posX > vw.value - w.value) {
    posX -= w.value;
  }
  // 视口高度-鼠标位置<菜单高度:菜单需要往上移
  if (vh.value - posY < h.value) {
    posY = vh.value - h.value;
  }
  return {
    posX,
    posY,
  };
});

// 点击菜单item
function handleMenuItem<T>(item: T) {
  showMenu.value = false;
  emit("select", item);
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
  const h = el.clientHeight;
  el.style.height = "0";
  requestAnimationFrame(() => {
    el.style.height = h + "px";
    el.style.transition = "0.5s";
  });
}
// 离开之后
function handleAfterEnter(el: any) {
  el.style.transition = "none";
}
</script>

<style lang="scss" scoped>
.menu-list {
  position: fixed;
  background-color: #eee;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  border-radius: 5px;
  font-size: 12px;
  color: #1d1d1f;
  overflow: hidden;
  cursor: pointer;
  padding: 5px;
}

.menu-item {
  border-radius: 5px;
  padding: 3px 5px;
}

.menu-item:hover {
  background-color: #a0cfff;
}

// .v-enter-from {
//   opacity: 1;
// }

// .v-enter-to {
//   transition: 0.5;
//   opacity: 0;
// }
</style>
