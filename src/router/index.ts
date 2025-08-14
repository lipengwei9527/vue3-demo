import { createRouter, createWebHistory } from "vue-router";
import compRoutes from "./compRoutes";
import noteRoutes from "./noteRoutes";
import formRoutes from "./formRoutes";
const routes = [
  // 该路由下的路由作为菜单处理
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/Layout/index.vue"),
    redirect: compRoutes.children[0].path,

    children: [compRoutes, noteRoutes],
  },
  formRoutes,
];
const env = import.meta.env;
const router = createRouter({
  history: createWebHistory(env.VITE_BASE_PATH),
  routes,
});
export default router;
