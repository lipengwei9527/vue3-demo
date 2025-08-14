export default {
  path: "/note",
  name: "笔记",
  children: [
    {
      path: "/TsNotePage",
      name: "ts笔记",
      component: () => import("@/views/NoteManage/TsNotePage/index.vue"),
    },
    {
      path: "/CssThemePage",
      name: "主题切换",
      component: () => import("@/views/NoteManage/CssThemePage/index.vue"),
    },
  ],
};
