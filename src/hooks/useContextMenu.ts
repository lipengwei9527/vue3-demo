/**
 * @description 获取鼠标点击的位置，及是否显示
 */
import { ref, onMounted, onBeforeUnmount, Ref } from "vue";
/**
 *
 * @param containerRef ref绑定的dom
 * @returns { showMenu, x, y }
 * showMenu-是否显示菜单
 * x-鼠标点击的ClientX(鼠标距离视口左边的距离)
 * y-鼠标点击的clientY(鼠标距离视口顶部的距离)
 */
export default function useContextMenu(containerRef: Ref) {
  // showMenu-是否显示菜单:true-是,false-否
  const showMenu = ref(false);
  // 鼠标点击位置距离窗口左边的距离
  const x = ref(0);
  // 鼠标点击位置距离窗口顶部的距离
  const y = ref(0);
  // 打开右键菜单
  const handleContextMenu = (e: MouseEvent) => {
    showMenu.value = true;
    e.preventDefault();
    e.stopPropagation();
    x.value = e.clientX;
    y.value = e.clientY;
  };
  //   关闭左键菜单
  function closeContextMenu() {
    showMenu.value = false;
  }
  onMounted(() => {
    const div = containerRef.value;
    div.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", closeContextMenu, true);
    window.addEventListener("contextmenu", closeContextMenu, true);
  });
  onBeforeUnmount(() => {
    const div = containerRef.value;
    div.removeEventListener("contextmenu", handleContextMenu);
    window.removeEventListener("click", closeContextMenu, true);
    window.removeEventListener("contextmenu", closeContextMenu, true);
  });
  return { showMenu, x, y };
}
