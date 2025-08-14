export default {
  path: "/comp",
  name: "组件",
  children: [
    {
      path: "/ContextMenuPage",
      name: "左键菜单",
      component: () =>
        import("@/views/ComponentManage/ContextMenuPage/index.vue"),
    },
    {
      path: "/CalendarPage",
      name: "日历",
      component: () => import("@/views/ComponentManage/CalendarPage/index.vue"),
    },
    {
      path: "/TablePage",
      name: "表格组件",
      component: () => import("@/views/ComponentManage/TablePage/index.vue"),
    },
    {
      path: "/FilePage",
      name: "文件上传",
      component: () => import("@/views/ComponentManage/FilePage/index.vue"),
    },
    {
      path: "/FormPage",
      name: "表单",
      component: () => import("@/views/ComponentManage/FormPage/index.vue"),
    },
    {
      path: "/CreateFormPage",
      name: "创建表单",
      component: () =>
        import("@/views/ComponentManage/CreateFormPage/index.vue"),
      meta: {
        disabled: true,
      },
    },
  ],
};
