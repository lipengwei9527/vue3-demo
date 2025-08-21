import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
} from "vue-router";
import compRoutes from "./compRoutes";
import noteRoutes from "./noteRoutes";
import formRoutes from "./formRoutes";
import type { CustomRouteRecordRaw } from "@/types/router";
const routes: CustomRouteRecordRaw[] = [
  // 该路由下的路由作为菜单处理
  {
    path: "/",
    name: "layout",
    labelName: "布局",
    component: () => import("@/views/Layout/index.vue"),
    // redirect: compRoutes.children
    //   ? compRoutes.children[0].path
    //   : "/ContextMenuPage",

    children: [compRoutes, noteRoutes],
  },
  formRoutes,
];
const env = import.meta.env;
const router = createRouter({
  history: createWebHistory(env.VITE_BASE_PATH),
  // history: createWebHashHistory(env.VITE_BASE_PATH),
  routes: routes,
});
// router.beforeEach((to, from, next) => {
//   console.log(`output->to, from`, to, from);
//   next();
//   // if (from.path === "/") {
//   // } else {
//   //   next(to.path);
//   // }
// });
export default router;
