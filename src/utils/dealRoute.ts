import { useRouter, RouteLocationRaw } from "vue-router";
type CustomRouter = {
  navigateTo: (to: RouteLocationRaw) => void;
  goBack: () => void;
  refresh: () => void;
};
export function CreateCustomRouter(): CustomRouter {
  const router = useRouter();
  console.log(`output->router`, router);
  const navigateTo = (to: RouteLocationRaw) => {
    router.push(to);
  };

  const goBack = () => {
    router.back();
  };
  const refresh = () => {};
  return {
    navigateTo,
    goBack,
    refresh,
  };
}
// 打开一个标签页
export function CreateTab() {
  const { navigateTo } = CreateCustomRouter();
  const openTab = (path: string) => {
    window.open(path, "aaa");
  };
  return { openTab };
  // navigateTo();
}
