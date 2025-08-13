/**
 * @description: 获取主题
 */
import { ref, watch } from "vue";
type Theme = "light" | "dark" | "os";
// localStorage中主题的key
const themeKey = "__theme__";
let theme = ref<Theme>((localStorage.getItem(themeKey) as Theme) || "light");
// 获取系统的主题
const match = window.matchMedia("(prefers-color-scheme: dark)");
const ele = document.documentElement;
// 跟随系统主题
function followSystem() {
  console.log("系统主题发生改变", match);
  let theme;
  let unTheme;
  if (match.matches) {
    theme = "dark";
    unTheme = "light";
  } else {
    theme = "light";
    unTheme = "dark";
  }
  ele.classList.remove(unTheme);
  ele.classList.add(theme);
  ele.dataset.theme = theme;
}

watch(
  theme,
  (newValue, oldValue) => {
    localStorage.setItem(themeKey, newValue);
    if (theme.value == "os") {
      // 跟随系统主题
      console.log(`output->监听系统主题`);
      match.addEventListener("change", followSystem);
      followSystem();
    } else {
      // 自定义主题
      match.removeEventListener("change", followSystem);
      if (oldValue) ele.classList.remove(oldValue);
      ele.classList.add(newValue);
      ele.dataset.theme = newValue;
    }
  },
  {
    immediate: true,
  }
);
export default function () {
  return theme;
}
