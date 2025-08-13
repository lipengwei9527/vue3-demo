import { useRouter } from "vue-router";

export function useCustomRouter() {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
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
