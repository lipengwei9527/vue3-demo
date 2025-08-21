import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
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
    // redirect: "layout",
    // compRoutes.children
    //   ? compRoutes.children[0].path
    //   : "/ContextMenuPage",
    // children: [],
    children: [compRoutes, noteRoutes],
  },
  formRoutes,
];
const env = import.meta.env;
const router = createRouter({
  // history: createWebHistory(env.VITE_BASE_PATH),
  history:
    env.VITE_ROUTER_MODEL == "hash"
      ? createWebHashHistory(env.VITE_ROUTER_BASE)
      : createWebHistory(env.VITE_ROUTER_BASE),
  routes: routes,
});
// console.log(`
// /***************************************************************************************************/
//   src/router/index.ts
//     路由配置:
//       base:${JSON.stringify(env)}
// /***************************************************************************************************/
//   `);
// router.beforeEach((to, from, next) => {
//   console.log(`output->to, from`, to, from);
//   next();
//   // if (from.path === "/") {
//   // } else {
//   //   next(to.path);
//   // }
// });
export default router;
