// const bc = new BroadcastChannel("");
import { useRouter } from "vue-router";
export function openTab(url: string) {
  const newTab = window.open(url, "_blank");
  console.log(`output->newTab`, newTab);
  const router = useRouter();
  router.push(url);
  return;
}
