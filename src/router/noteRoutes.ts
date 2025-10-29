import { CustomRouteRecordRaw } from "@/types/router";
const noteRoutes: CustomRouteRecordRaw = {
  path: "/note",
  name: "note",
  labelName: "笔记管理",
  children: [
    {
      name: "TsNotePage",
      path: "/TsNotePage",
      labelName: "笔记页",
      component: () => import("@/views/NoteManage/TsNotePage/index.vue"),
      children: [
        {
          name: "canvas",
          path: "/canvas",
          labelName: "canvas",
          component: () =>
            import("@/views/NoteManage/TsNotePage/pages/canvas.vue"),
        },
      ],
    },
    {
      name: "CssThemePage",
      path: "/CssThemePage",
      labelName: "主题页",
      component: () => import("@/views/NoteManage/CssThemePage/index.vue"),
    },
  ],
};
export default noteRoutes;
