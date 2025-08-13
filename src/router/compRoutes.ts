export default [
  {
    path: "/context_menu",
    name: "左键菜单",
    component: () => import("@/views/ComponentManage/ContextMenu/index.vue"),
  },
  {
    path: "/calendar",
    name: "日历",
    component: () => import("@/views/ComponentManage/CalendarPage/index.vue"),
  },
  {
    path: "/table_page",
    name: "表格组件",
    component: () => import("@/views/ComponentManage/TablePage/index.vue"),
  },
  {
    path: "/file_page",
    name: "文件上传",
    component: () => import("@/views/ComponentManage/FilePage/index.vue"),
  },
  {
    path: "/form_page",
    name: "表单",
    component: () => import("@/views/ComponentManage/FormPage/index.vue"),
  },
  {
    path: "/create_form_page",
    name: "创造表单",
    component: () => import("@/views/ComponentManage/CreateFormPage/index.vue"),
  },
];
